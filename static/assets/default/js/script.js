  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    // const chaine = chaine_com.value


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







