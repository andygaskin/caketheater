<?php

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_json.php';

const CATEGORY_LIMIT = 12;

try {
    $db = ct_db();

    $slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';

    if ($slug === '' || strlen($slug) > 100) {
        ct_json(['cakes' => [], 'error' => 'Missing or invalid category slug.'], 400);
        exit;
    }

    $sql = "
        SELECT
            c.slug          AS slug,
            c.title         AS title,
            a.display_name  AS baker,
            ci.filename     AS cover_filename
        FROM categories cat
        JOIN cake_category cc
            ON cc.category_id = cat.id
        JOIN cakes c
            ON c.ID = cc.cake_id
        JOIN accounts a
            ON a.ID = c.user_id
        JOIN cake_images ci
            ON ci.ID = c.cover_image_id
        WHERE cat.slug = ?
          AND cat.active = ?
          AND c.active = ?
          AND a.active = ?
        ORDER BY c.cake_score DESC
        LIMIT " . CATEGORY_LIMIT . "
    ";
    echo $slug;

    $active = 1;

    $result = $db->execute_query($sql, [$slug, $active, $active, $active]);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    $cakes = array_map(static fn(array $r) => [
        'slug' => (string)$r['slug'],
        'title' => (string)$r['title'],
        'baker' => (string)$r['baker'],
        'cover_filename' => (string)$r['cover_filename'],
    ], $rows);

    ct_json($cakes);
} catch (mysqli_sql_exception $e) {
    ct_json(['cakes' => [], 'error' => 'Unable to load category cakes.'], 500);
}
