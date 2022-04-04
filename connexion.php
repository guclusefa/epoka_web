<?php
require("config.php");
try {
    if (!empty($_GET['id']) and !empty($_GET['mdp'])) {
        $id = htmlentities($_GET['id']);
        $mdp = htmlentities($_GET['mdp']);

        // recupere data user
        $requete = $pdo->prepare("SELECT * FROM salaries WHERE sal_id = ? AND sal_mdp = ?");
        $requete->execute(array($id, $mdp));
        $userexist = $requete->rowCount();

        // si user existe
        if ($userexist) {
            $user_info = $requete->fetchAll(PDO::FETCH_ASSOC);
            print(json_encode($user_info));
        } else {
            print("Mauvais identifiant ou mot de passe !");
        }
    } else {
        print("Veuillez entrez un identifiant et un mdp");
    }
} catch (Exception $e) {
    die("erreur : " . $e->getMessage());
}
?>