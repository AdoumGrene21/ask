// const qteApp = document.getElementById('qte_approvisionner').value;
// const qteTotal = document.getElementById('qte_total').value;

// const submitApprovision = document.getElementById('submit')

const tableOutout = document.querySelector('.table-output'); 
const appTable = document.querySelector('.app-table'); 
const tBody = document.querySelector('.table-body'); 


$(document).ready(function(){
    // pour la Approvisionnement
    search_medicament()
    reloadMedSelectionner()
    submitData()
    reloadSommeQte()

    // pour la Caisse
    search_med_caisse()
    reloadSommeTotalApayer()
    
   // plus_com()
    facturer()
});

// recherche medicament pour approvisionnement
function search_medicament() {
    $("#search_text").keyup(function () {
    
    var search = $(this).val();
    if (search.trim().length > 0) {
        tBody.innerHTML = ""
        fetch("get-search-med-json", {
            body: JSON.stringify({search_med: search}),
            method: "POST",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);

            tableOutout.style.display = 'block';
            appTable.style.display = 'none';

            if (data.length===0) {
                tableOutout.innerHTML = 'Not found response!';
            }else{
                data.forEach((item) => {
                    tBody.innerHTML += `
                    
                        <button class = 'list-group-item list-group-item-action' value = '${item.id}' >
                            
                            ${item.nom_commercial} 
                            
                        </button>
                    `
                });
            }
        })
        
    }else{
        appTable.style.display = 'block';
        tableOutout.style.display = 'none';
    }
    });
}

function reloadSommeQte(){
   
    $("#qte_approvisionner").keyup(function () {
        Qte1 = parseInt(quantite.value)
        Qte2 = parseInt(qte_approvisionner.value)
        document.getElementById('qte_total').value = Qte1 + Qte2;
    });
}

function reloadSommeTotalApayer(){
   
    $("#qte_commande").keyup(function () {
        Qte1 = parseInt(prix_unitaire.value)
        Qte2 = parseInt(qte_commande.value)
        document.getElementById('total_commande').value = Qte1 * Qte2;
    });
}

// reloadMedSelectionner sans recherche
function reloadMedSelectionner() {
            tBody.addEventListener('click', e=>{
                const selectedMed = e.target.value
            //console.log(selectedMed)
            $.ajax({
                type: 'GET',
                url: `get-med-detail-json/${selectedMed}/`,
                success: function (response) {
                    dict = response.data[0]
                    document.getElementById('id_produit').value = dict["id"]
                    document.getElementById('date_peremption').value = dict["date_peremption"]
                    document.getElementById('nom_commercial').value = dict["nom_commercial"]
                    document.getElementById('prix_unitaire').value = dict["prix_unitaire"]
                    document.getElementById('quantite').value = dict["quantite"] 

                    document.getElementById('qte_total').value = ''   
                    document.getElementById('qte_approvisionner').value = ''
                    document.getElementById('prix_unitaire2').value = ''
                    
                }
            })
        })
   
}
    // reloadMedSelectionner avec recherche
    appTable.addEventListener('click', e=>{
        const selectedMed = e.target.value
         // console.log(selectedMed)
        $.ajax({
            type: 'GET',
            url: `get-med-detail-json/${selectedMed}/`,
            success: function (response) {
                dict = response.data[0]
                document.getElementById('id_produit').value = dict["id"]
                document.getElementById('date_peremption').value = dict["date_peremption"]
                document.getElementById('nom_commercial').value = dict["nom_commercial"]
                document.getElementById('prix_unitaire').value = dict["prix_unitaire"]
                document.getElementById('quantite').value = dict["quantite"] 

                document.getElementById('qte_total').value = ''   
                document.getElementById('qte_approvisionner').value = ''
                document.getElementById('prix_unitaire2').value = ''

            }
        })
    })

    function submitData(){
       // submitApprovision.addEventListener('click', e=>{
        $("#submit").click(function () {
            $id_produit = $('#id_produit').val()
            $dateperemption = $('#date_peremption').val()
            $prixunitaire = $('#prix_unitaire2').val()
            $qte = $('#qte_total').val()
    
            const id = $id_produit
            
            if ($dateperemption == "" || $prixunitaire == "" || $qte == "") {
                alert("Please check your fields before continuing!")
            }else {
                $.ajax({
                    type: "POST",
                    url: "approvision-medicament",
                    data: {
                        idproduit : $id_produit,
                        dateperemption : $dateperemption,
                        prixunitaire : $prixunitaire,
                        qte : $qte,
                    },
                    success: function(){
                        alert("save success!");
                        $('#prix_unitaire2').val('');
                        window.location = `/medicament/detail/${id}`
                    }
                })
            }
        })

    }


////////////// LA Caisse ///////////:

function search_med_caisse() {
    $("#recherche_medicament").keyup(function () {
        var search = $(this).val();
        if (search.trim().length > 0) {
            tBody.innerHTML = ""
            fetch("get-search-med-json", {
                body: JSON.stringify({search_med: search}),
                method: "POST",
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("data", data);
    
                tableOutout.style.display = 'block';
                appTable.style.display = 'none';
    
                if (data.length===0) {
                    tableOutout.innerHTML = 'Not found response!';
                }else{
                    data.forEach((item) => {
                        tBody.innerHTML += `
                        
                            <button class = 'list-group-item list-group-item-action' value = '${item.id}' >
                                
                                ${item.nom_commercial} 
                                
                            </button>
                        `
                    });
                }
            })
            
            
        }else{
            appTable.style.display = 'block';
            tableOutout.style.display = 'none';
        }
    })
}


var tot_com = 0;

function plus_com(){
    if (qte_commande.value != "") {
        if (parseInt(quantite.value) < parseInt(qte_commande.value)) {
            alert(" votre demande est supperieur a stock qui est de :" + quantite.value + "unités");
        }else{
            ref_p = id_produit.value;
            des_p = nom_commercial.value;
            qte_p = qte_commande.value;
            pht_p = prix_unitaire.value;
            
            tot_com = tot_com + qte_p*pht_p;
            
            total_commande.value = tot_com.toFixed(2);
            //alert(id+" "+produit+" "+qte+" "+prix)
           
            tot_com.value = total_commande.value;
            // document.getElementById('chaine_com').value += "|" + ref_p + ";" + qte_p + ";" + des_p + ";" + pht_p;	
            chaine_com.value += "|" + ref_p + ";" + qte_p + ";" + des_p + ";" + pht_p;	
            facture();
            
        }
    }else{
        alert("passer votre commande d'abord !")
        //alert("|" + ref_p + ";" + qte_p + ";" + des_p + ";" + pht_p)

    }
}


function facture()
{		
    var tab_com = chaine_com.value.split('|');
    var nb_lignes = tab_com.length;
    document.getElementById("det_com").innerHTML = "";
    for (ligne=0; ligne<nb_lignes; ligne++)
    {
        if(tab_com[ligne]!="")
        {
            var ligne_com = tab_com[ligne].split(';');
            document.getElementById("det_com").innerHTML += "<div class='bord'></div>";
            document.getElementById("det_com").innerHTML += "<div class='suite'> "+ ligne_com[0] +"</div>";
            document.getElementById("det_com").innerHTML += "<div class='suite'> "+ ligne_com[1] +"</div>";
            document.getElementById("det_com").innerHTML += "<div class='des'> "+ ligne_com[2] +"</div>";
            document.getElementById("det_com").innerHTML += "<div class='prix'> "+ ligne_com[3] +"</div>";
            document.getElementById("det_com").innerHTML += "<div class='prix'> "+  (ligne_com[1]*ligne_com[3]).toFixed(2) +"</div>";
            document.getElementById("det_com").innerHTML += "<div class='bord'></div>";

        }
    }		
}

function facturer()
{
    // const chaine = chaine_com.value
    // const maDate = new Date()
     
    // $DateToDay = maDate.toLocaleDateString("fr")  // 20/10/2021 
    $chaineCom = $('#chaine_com').val()
    $totalCommande = $('#total_commande').val()

    // client
    $nomClient = $('#nom_client').val()
    $ageClient = $('#age_client').val()
    $sexeClient = $('#sexe_client').val()

    $.ajax({
        type: 'POST',
        url: 'facture-json',  
        data: {
            chainecom : $chaineCom,
            totalcom :$totalCommande,

            nomclient : $nomClient,
            ageclient : $ageClient,
            sexeclient : $sexeClient,
        },
        success: function (response) {
            resetCaise()
            window.location = `/caise/`
        }, error: function(error) {
            console.log(error)
        }
    })
}

function resetCaise() {
    $('#chaine_com').val('')

    $('#nom_client').val('')
    $('#age_client').val(0)
    $('#sexe_client').val('')


    $('#chaine_com').val('')
    $('#total_com').val(0)
    $('#total_commande').val(0)


}