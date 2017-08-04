<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$db = new SQLite3(__DIR__ . '/../DB/todo.db');
if(!$db)
{
    die('Can\'t open database');
}


$queryStr = 'SELECT * FROM todo';

$result = $db->query($queryStr);
while($resultArr = $result->fetchArray( SQLITE3_ASSOC ))
{
    $dataArr[] = $resultArr;
}



print(json_encode($dataArr));
ob_flush();
ob_end_clean();