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

$queryStr = 'SELECT MAX(id) FROM todo';
$query = $db->query($queryStr);

print($query);
ob_flush();
ob_end_clean();