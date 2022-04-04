<?php
require("config.php");
try {
    if (!empty($_GET['id']) and !empty($_GET['lieu']) and !empty($_GET['debut']) and !empty($_GET['fin']) ) {
        $id = htmlentities($_GET['id']);
        $lieu = htmlentities($_GET['lieu']);
        $debut = htmlentities($_GET['debut']);
        $fin = htmlentities($_GET['fin']);

        // recuperer responsable de salarie
        $requete = $pdo->prepare("SELECT age_idCom FROM agences, salaries WHERE sal_idAgence = age_id AND sal_id = ?");
        $requete->execute(array($id));
        $age_idCom = $requete->fetch(PDO::FETCH_ASSOC);
        $age_idCom = $age_idCom['age_idCom'];

        // recuperer id de commune
        // utilisé pour verif car lieu = id deja nrm
        $requete = $pdo->prepare("SELECT com_id FROM communes WHERE com_id = ?");
        $requete->execute(array($lieu));
        $com_id = $requete->fetch(PDO::FETCH_ASSOC);
        $com_id = $com_id['com_id'];

        // conversion string date en date
        $date_debut = DateTime::createFromFormat('d/m/Y', $debut);
        $date_fin = DateTime::createFromFormat('d/m/Y', $fin);

        // si responsable existe (donc si  salarie existe aussi) et si commun trouvé
        // si date valide
        if (!empty($age_idCom) && !empty($com_id) && !empty($date_debut) && !empty($date_fin)){
            // conversion en format mySQL
            $date_debut = $date_debut->format('Y-m-d');
            $date_fin = $date_fin->format('Y-m-d');
            if ($date_fin >= $date_debut) {
                $requete = $pdo->prepare("INSERT INTO missions (mis_idSal, mis_idSalCom, mis_idCom, mis_debut, mis_fin) VALUES (?, ?, ?, ?, ?)");
                $requete->execute(array($id, $age_idCom, $com_id, $date_debut, $date_fin));
                print("1");
            } else {
                print("Date de fin supérieur à la date de début !");
            }
        } else {
            print("Une erreur est survenue !");
        }
    } else {
        print("Veuillez entrez toutes les valeurs");
    }
} catch (Exception $e) {
    die("erreur : " . $e->getMessage());
}
?>