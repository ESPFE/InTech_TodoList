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

$id = trim($_POST['id']);
$id = htmlspecialchars($id);
$id = SQLITE3::escapeString($id);

$queryStr = 'DELETE FROM todo WHERE id = ' . $id;
$ret = $db->exec($queryStr);

print(json_encode(array('dbRet' => $ret)));
ob_flush();
ob_end_clean();