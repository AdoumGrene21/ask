
$('.ui.dropdown').dropdown(
    {
        forceSelection: false
    }
);


$(document).ready(function(){
    //your script here.

    const Category = document.getElementById("c")
    const CategoriesI = document.getElementById("categories")

    const sousCategory = document.getElementById("s")
    const sousCategorieI = document.getElementById("souscategories")
    const souscategorieText = document.getElementById("souscategorie-text")
    
    const Dci = document.getElementById("d")
    const DciI = document.getElementById("dcis")

    const Medicament = document.getElementById("medicament")
    const MedicamentI = document.getElementById("medicaments")


    /// constantes de la partie detail medicament
    const PrixUnitaire = document.getElementById("prix_unitaire")
    const NomCommercial = document.getElementById("nom_commercial")
    const DatePeremption = document.getElementById("date_peremption")


    $.ajax({
        type: 'GET',
        url: 'cat-json',
        success: function (response) {
            const catData = response.data
            catData.map(item =>{
                const option = document.createElement('option')
                option.textContent = item.nom
                option.setAttribute('class', 'item')
                option.setAttribute('value', item.id)
                Category.appendChild(option)    
            })
        },
        error: function(error) {
            console.log(error)
        }
    })


    CategoriesI.addEventListener('change', e=>{
        
        const selectedCat = e.target.value
        // console.log(selectedCat)
        sousCategory.innerHTML = ""
        souscategorieText.textContent = "All sous categories"
        souscategorieText.classList.add("default") 

        $.ajax({
            type: 'GET',
            url: `sous-cat-json/${selectedCat}/`,
            success: function (response) {
                //console.log(response.data)
                const souscatData = response.data
                souscatData.map(item =>{
                    const option = document.createElement('option')
                    option.textContent = item.nom
                    option.setAttribute('class', 'item')
                    option.setAttribute('value', item.nom)
                    sousCategory.appendChild(option)
                }) 
            },
            error: function(error) {
                console.log(error)
            }
        })
    })

    sousCategorieI.addEventListener('change', e=>{
        const selectedSousCat = e.target.value
        //console.log(selectedSousCat)
        $.ajax({
            type: 'GET',
            url: `sous-dci-json/${selectedSousCat}/`,
            success: function (response) {
                //console.log(response.data)
                const dciData = response.data
                dciData.map(item =>{
                    const option = document.createElement('option')
                    option.textContent = item.nom
                    option.setAttribute('class', 'item')
                    option.setAttribute('value', item.nom)
                    Dci.appendChild(option)
                })
            }, error: function(error) {
                console.log(error)
            }
        })
    })

    DciI.addEventListener('change', e=>{
        const selectedDci = e.target.value
        //console.log(selectedDci)
        $.ajax({
            type: 'GET',
            url: `sous-med-json/${selectedDci}/`,
            success: function (response) {
                // console.log(response.data)
                const medData = response.data
                medData.map(item =>{
                    const button = document.createElement('button')
                    button.textContent = item.nom_commercial
                    button.setAttribute('class', 'list-group-item list-group-item-action')
                    button.setAttribute('value', item.id)
                   
                    button.setAttribute('id', 'medoc')
                    Medicament.appendChild(button)

                })
            }})   
        })

        MedicamentI.addEventListener('click', e=>{
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
                    
                }
            })

            })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function search_medicament() {
            $("#search_text").keyup(function () {
            var search = $(this).val();
            // $("#resul").html(search);
            console.log("search");
            });
        }
})

var tot_com = 0;
// GRENE! n'oublié pas de faire le CONTROLE DE la DatePeremption des produit avant de l'ajouter au panié
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
           
            total_com.value = total_commande.value;
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
            document.getElementById("det_com").innerHTML += "<th>";

            document.getElementById("det_com").innerHTML += "<i>" + ligne_com[0] + "</i> ";
            document.getElementById("det_com").innerHTML += " <i style='margin-left:50px;'>" + ligne_com[1] + " <i>";
            document.getElementById("det_com").innerHTML += " <i style='margin-left:50px;'>" + ligne_com[2] + " <i>";
            document.getElementById("det_com").innerHTML += "  <i style='margin-left:50px;'>" + ligne_com[3] + " <i>";
            document.getElementById("det_com").innerHTML += " <i style='margin-left:50px;'>" + (ligne_com[1]*ligne_com[3]).toFixed(2) + " <i> ";
            document.getElementById("det_com").innerHTML += "<button > X </button>" ;
            
            document.getElementById("det_com").innerHTML += "<th/>";

        }
    }		
}



function facturer()
{
    const chaine = chaine_com.value


    $.ajax({
        type: 'POST',
        url: `facture-json/${chaine}/`, 
        success: function (response) {
            console.log(response.data)
           
        }, error: function(error) {
            console.log(error)
        }
    })
}







