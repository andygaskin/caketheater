<?php

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_json.php';

const CATEGORY_LIMIT = 24;

try {
    $db = ct_db();

    $slug = isset($_GET['slug']) ? trim((string)$_GET['slug']) : '';

    if ($slug === '' || strlen($slug) > 100) {
        ct_json(['cakes' => [], 'error' => 'Missing or invalid category slug.'], 400);
        exit;
    }

    $page = filter_var($_GET['page'] ?? '1', FILTER_VALIDATE_INT, [
        'options' => ['min_range' => 1, 'max_range' => 1000000],
    ]);
    $sort = $_GET['sort'] ?? 'popular';
    if ($page === false || !in_array($sort, ['popular', 'latest'], true)) {
        ct_json(['error' => 'Invalid page or sort.'], 400);
        exit;
    }
    $offset = ($page - 1) * CATEGORY_LIMIT;
    $order = $sort === 'latest' ? 'c.created_at DESC, c.ID DESC' : 'c.cake_score DESC, c.ID DESC';

    $from = "
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
    ";


    $active = 1;

    $params = [$slug, $active, $active, $active];
    $count = $db->execute_query('SELECT COUNT(*) AS total ' . $from, $params);
    $total = (int)$count->fetch_assoc()['total'];
    $sql = 'SELECT c.slug, c.title, a.display_name AS baker, ci.filename AS cover_filename '
        . $from . ' ORDER BY ' . $order . ' LIMIT ? OFFSET ?';
    $result = $db->execute_query($sql, [...$params, CATEGORY_LIMIT, $offset]);
    $rows = $result->fetch_all(MYSQLI_ASSOC);

    $cakes = array_map(static fn(array $r) => [
        'slug' => (string)$r['slug'],
        'title' => (string)$r['title'],
        'baker' => (string)$r['baker'],
        'cover_filename' => (string)$r['cover_filename'],
    ], $rows);

    ct_json(['cakes' => $cakes, 'total' => $total, 'page' => $page, 'pageSize' => CATEGORY_LIMIT]);
} catch (mysqli_sql_exception $e) {
    ct_json(['cakes' => [], 'error' => 'Unable to load category cakes.'], 500);
}
