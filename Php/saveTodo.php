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
$plattform = trim($_POST['plattform']);
$iStufe = trim($_POST['iStufe']);
$auslesestatus = trim($_POST['auslesestatus']);
$flashNoetig = trim($_POST['flashNoetig']);
$todo = trim($_POST['todo']);

$id = htmlspecialchars($id);
$id = SQLITE3::escapeString($id);
$plattform = htmlspecialchars($plattform);
$plattform = SQLITE3::escapeString($plattform);
$iStufe = htmlspecialchars($iStufe);
$iStufe = SQLITE3::escapeString($iStufe);
$auslesestatus = htmlspecialchars($auslesestatus);
$auslesestatus = SQLITE3::escapeString($auslesestatus);
$flashNoetig = htmlspecialchars($flashNoetig);
$flashNoetig = SQLITE3::escapeString($flashNoetig);
$todo = htmlspecialchars($todo);
$todo = SQLITE3::escapeString($todo);

$queryStr = 'UPDATE todo SET '
        . 'plattform = \'' . $plattform . '\', '
        . 'iStufe = \'' . $iStufe . '\', '
        . 'auslesestatus = \'' . $auslesestatus . '\', '
        . 'flashnoetig = \'' . $flashNoetig . '\', '
        . 'todo = \'' . $todo . '\' '
        . 'WHERE id = ' . $id;

$ret = $db->exec($queryStr);

print(json_encode(array('dbRet' => $ret)));
ob_flush();
ob_end_clean();