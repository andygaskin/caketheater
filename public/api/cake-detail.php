<?php

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_json.php';

try {
    $db = ct_db();

    // Validate/normalize slug input
    $slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';
    if ($slug === '' || strlen($slug) > 255) {
        ct_json(['cake' => null, 'error' => 'Missing or invalid slug.'], 400);
        exit;
    }

    //  returns 1 row per image (or a single row with NULL image fields if none)
    // Cover image is forced to be first via ORDER BY expression.
    $sql = "
        SELECT
            c.ID                AS cake_id,
            c.slug              AS cake_slug,
            c.title             AS cake_title,
            c.description       AS cake_description,
            c.created_at        AS cake_created_at,
            c.cover_image_id    AS cake_cover_image_id,

            a.display_name      AS baker_display_name,
            a.country           AS baker_country,

            ci.ID               AS image_id,
            ci.filename         AS image_filename,
            ci.description      AS image_description,
            ci.sort_order       AS image_sort_order
        FROM cakes c
        JOIN accounts a
            ON a.ID = c.user_id
        LEFT JOIN cake_images ci
            ON ci.cake_id = c.ID
           AND ci.active = ?
        WHERE c.slug = ?
          AND c.active = ?
          AND a.active = ?
        ORDER BY
            (ci.ID = c.cover_image_id) DESC,
            ci.sort_order ASC,
            ci.ID ASC
        LIMIT 500
    ";

    $active = 1;
    $result = $db->execute_query($sql, [$active, $slug, $active, $active]);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    if (!$rows) {
        ct_json(['cake' => null, 'error' => 'Cake not found.'], 404);
        exit;
    }

    // Base cake/baker details come from first row
    $first = $rows[0];

    //normalize
    $cake = [
        'id' => (int)$first['cake_id'],
        'slug' => (string)$first['cake_slug'],
        'title' => (string)$first['cake_title'],
        'description' => $first['cake_description'] !== null ? (string)$first['cake_description'] : '',
        'created_at' => (string)$first['cake_created_at'],
        'cover_image_id' => (int)$first['cake_cover_image_id'],
        'baker' => [
            'display_name' => (string)$first['baker_display_name'],
            'country' => (string)$first['baker_country'],
        ],
        'images' => [],
        'categories' => [],
    ];

    // Collect images 
    foreach ($rows as $r) {
        if ($r['image_id'] === null) {
            continue; // cake exists but has no active images
        }


        $cake['images'][] = [
            'id' => (int)$r['image_id'],
            'filename' => (string)$r['image_filename'],
            'description' => $r['image_description'] !== null ? (string)$r['image_description'] : '',
            'sort_order' => (int)$r['image_sort_order'],
            'is_cover' => ((int)$r['image_id'] === (int)$cake['cover_image_id']),
        ];
    }


    // Collect categories (group + category) for this cake
    $sqlCats = "
  SELECT
    g.slug AS group_slug,
    c.slug AS category_slug,
    c.name AS category_name
  FROM cake_category cc
  JOIN categories c
    ON c.id = cc.category_id
   AND c.active = 1
  JOIN category_groups g
    ON g.id = c.group_id
   AND g.active = 1
  WHERE cc.cake_id = ?
  ORDER BY g.sort_order ASC, c.sort_order ASC, c.name ASC
";

    $catResult = $db->execute_query($sqlCats, [$cake['id']]);
    $catRows = $catResult->fetch_all(MYSQLI_ASSOC);

    $cake['categories'] = array_map(static fn(array $row) => [
        'group' => (string)$row['group_slug'],   // 'occasion'
        'slug'  => (string)$row['category_slug'], // 'birthday'
        'name'  => (string)$row['category_name'] // 'Birthday'
    ], $catRows);


    ct_json(['cake' => $cake]);
} catch (mysqli_sql_exception $e) {
    ct_json(['cake' => null, 'error' => 'Unable to load cake.'], 500);
}
