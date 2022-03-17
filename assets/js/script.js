// datable en francais
$(document).ready(function () {
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
});

/* select2 */
$('.select2').select2({
    theme: 'bootstrap',
    pagination: {
        more: true
    }
});


/* $(document).on('keydown', '.select2-search__field', function (event) {
    value = $(".select2-search__field").val();

    let url = (window.location.href.split(window.location.pathname))[0] + "/chercher/" + value
    let option = `<option value="" disabled selected>Choisir une commune</option>`
    // Populate dropdown with list of provinces
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            entry.forEach(element => {
                option += `<option value="${element.com_id}">${element.com_nom} (${element.com_cp}) </option>`
            });
        })
        console.log(option)
        document.getElementById("com_a").innerHTML = option
    });
}) */

$(".js-example-data-ajax").select2({
    ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                q: params.term, // search term
            };
        },
        processResults: function (data, params) {
            return {
                results: data.items,
            };
        },
    },
    placeholder: 'TEST',
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
});

function formatRepo(repo) {
    if (repo.loading) {
        return repo.text;
    }
    console.log(repo)

    var $container = $(
        "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__description'></div>" +
        "</div>"
    );

    $container.find(".select2-result-repository__description").text(repo.full_name);
    return $container;
}

function formatRepoSelection(repo) {
    return repo.full_name;
}


