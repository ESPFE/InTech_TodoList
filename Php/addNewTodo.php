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

$queryStr = 'INSERT INTO todo (plattform) VALUES ("")';
$db->exec($queryStr);

$queryStr = 'SELECT MAX(id) FROM todo';
$result = $db->query($queryStr);
$resultArr = $result->fetchArray( SQLITE3_ASSOC );

print(json_encode(array('id' => $resultArr['MAX(id)'])));
ob_flush();
ob_end_clean();