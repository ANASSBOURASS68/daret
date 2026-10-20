// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.


let nomcercle = document.getElementById('nom-cercle')
let cotisation = document.getElementById('cotisation')
let periodicite = document.getElementById('periodicite')
let datedebut = document.getElementById('date-debut')
let btnajouterparticipant = document.getElementById('ajouter-participant')
let btngenerer = document.getElementById('generer')
let btnreinitialiser = document.getElementById('reinitialiser')
let nomcercleerreur = document.querySelector('#nom-cercle-erreur')

// valide nom
function validerNomCercle(){
    let nom = nomcercle.value.trim().toLocaleLowerCase();
    let chiffres = /^[0-9 a-z A-Z éèàùç -]+$/;
    if (nom.length >= 3 && nom.length <= 40 && chiffres.test(nom)) {
    return true;
    }
    return false;
    }

    function nomcercleerreurmssg(){
        let mssgerreur = nomcercleerreur;
        if(validerNomCercle() === false){
            mssgerreur.classList.remove("hidden")
            mssgerreur.textContent = 'Nom Invalide';

        }else{
            mssgerreur.textContent = "";
            mssgerreur.classList.add("hidden")
        }        
    }
    nomcercle.addEventListener("input",nomcercleerreurmssg)


