<?php
$bdd_host = "mysql-epoka.alwaysdata.net";
$bdd_name = "epoka_db";
$bdd_username = "epoka";
$bdd_userpwd = "Epoka2022*";
try {
    $pdo = new PDO("mysql:host=$bdd_host;dbname=$bdd_name;charset=utf8", $bdd_username, $bdd_userpwd, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
} catch (Exception $e) {
    die("erreur : " . $e->getMessage());
}
?>