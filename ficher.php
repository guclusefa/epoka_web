<?php
require("config.php");
try {
    if (!empty($_GET['id'])) {
        $id = htmlentities($_GET['id']);

        // recupere data user
        $requete = $pdo->prepare("SELECT * FROM salaries WHERE sal_id = ?");
        $requete->execute(array($id));
        $userexist = $requete->rowCount();

        // si user existe
        if ($userexist) {
            $user_info = $requete->fetchAll(PDO::FETCH_ASSOC);
            print(json_encode($user_info));
        } else {
            print("Salarié n'existe pas");
        }
    } else {
        print("Entrez un id de salarie");
    }
} catch (Exception $e) {
    die("erreur : " . $e->getMessage());
}
?>