// datable en francais
$('table').DataTable({
    "language": {
        "sProcessing": "Traitement en cours...",
        "sSearch": "Rechercher&nbsp;:",
        "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
        "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoPostFix": "",
        "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
        "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
        "oPaginate": {
            "sFirst": "Premier",
            "sPrevious": "Pr&eacute;c&eacute;dent",
            "sNext": "Suivant",
            "sLast": "Dernier"
        },
        "oAria": {
            "sSortAscending": ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
        },
        "select": {
            "rows": {
                "_": "%d lignes sélectionnées",
                "0": "Aucune ligne sélectionnée",
                "1": "1 ligne sélectionnée"
            }
        }
    }
});


$(".select2").select2({
    ajax: {
        url: "/data/communes.json",
        dataType: 'json',
        delay: 50,
        data: function (params) {
            return {
                q: params.term // la recherche
            };
        },
        processResults: function (data, params) {
            var resData = [];
            // ici qu'on cherche
            data.forEach(function (value) {
                if (value.com_nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(params.term.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) != -1) resData.push(value)
                if (value.com_cp.toLowerCase().indexOf(params.term) != -1) resData.push(value)
            })
            return {
                results: $.map(resData, function (item) {
                    return {
                        text: item.com_nom + " - " + item.com_cp,
                        id: item.com_id
                    }
                })
            };
        },
        cache: true
    },
    minimumInputLength: 2,
    theme: 'bootstrap',
    language: "fr"
})

