<?php

declare(strict_types=1);

// error_reporting(E_ALL);
// ini_set('display_errors', '1');
// ini_set('display_startup_errors', '1');

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_json.php';

const FEATURED_LIMIT = 9;

try {
  $db = ct_db();

  $sql = "
    SELECT
      c.slug          AS slug,
      c.title         AS title,
      a.display_name  AS baker,
      ci.filename     AS cover_filename
    FROM featured_cakes f
    JOIN cakes c ON c.ID = f.cake_id
    JOIN accounts a ON a.ID = c.user_id
    JOIN cake_images ci ON ci.ID = c.cover_image_id
    WHERE f.active = ? AND c.active = ?
    ORDER BY f.ID DESC
    LIMIT " . FEATURED_LIMIT . "
  ";

  $result = $db->execute_query($sql, [1, 1]);
  $rows = $result->fetch_all(MYSQLI_ASSOC);

  // Normalize keys/strings 
  $featured = array_map(static fn(array $r) => [
    'slug' => (string)$r['slug'],
    'title' => (string)$r['title'],
    'baker' => (string)$r['baker'],
    'cover_filename' => (string)$r['cover_filename'],
  ], $rows);

  ct_json($featured); //from _json.php

} catch (mysqli_sql_exception $e) {
  // consider logging $e->getMessage() somewhere secure
  ct_json(['featured' => [], 'error' => 'Unable to load featured cakes.'], 500);
}
