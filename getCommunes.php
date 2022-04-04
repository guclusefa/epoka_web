<?php
require("config.php");
try {
    // recupere les communes
    $requete = $pdo->prepare("SELECT * FROM `communes`");
    $requete->execute();
    $communes = $requete->fetchAll(PDO::FETCH_ASSOC);
    print(json_encode($communes));
} catch (Exception $e) {
    die("erreur : " . $e->getMessage());
}
?>