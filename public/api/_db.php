<?php

declare(strict_types=1);

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

function ct_db(): mysqli
{
  $mysqli = new mysqli(
    'localhost',
    '1017860_56_w',
    'saGnZGi5',
    'gaskinmedia_caketheater1'
  );


  $mysqli->set_charset('utf8mb4');

  return $mysqli;
}
