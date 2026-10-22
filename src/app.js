// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.



let daretform = document.getElementById('daret-form')
let nomcercle = document.getElementById('nom-cercle')
let cotisation = document.getElementById('cotisation')
let periodicite = document.getElementById('periodicite')
let datedebut = document.getElementById('date-debut')
let btnajouterparticipant = document.getElementById('ajouter-participant')
let btngenerer = document.getElementById('generer')
let btnreinitialiser = document.getElementById('reinitialiser')
let nomcercleerreur = document.querySelector('#nom-cercle-erreur')
let cotisationerreur = document.querySelector('#cotisation-erreur')
let datedebuterreur = document.querySelector('#date-debut-erreur')
let periodiciteerreur = document.querySelector('#periodicite-erreur')
let chiffres =  /^[0-9 a-z A-Z éèàùç -]+$/;
let participantsliste = document.querySelector('#participants-liste')
let participantscompteur = document.querySelector('#participants-compteur')

// valide nom

function validerNomCercle(){
    let nom = nomcercle.value.trim().toLocaleLowerCase();
    if (nom.length >= 3 && nom.length <= 40 && chiffres.test(nom)) {
    return true;
    }
    return false;
    }

    //mssg erreure

    function nomcercleerreurmssg(){
        let mssgerreur = nomcercleerreur;
        if(nomcercle.value.trim() === ""){
            mssgerreur.textContent = "entrer le nom";
            mssgerreur.classList.remove("hidden");
        }
        else if(validerNomCercle() === false){
            mssgerreur.classList.remove("hidden");
            mssgerreur.textContent = 'Nom Invalide';

        }else{
            mssgerreur.textContent = "";
            mssgerreur.classList.add("hidden");
        }        
    }
    nomcercle.addEventListener("input",nomcercleerreurmssg);

    //valider cotisation
    function validercotisation(){
        let cotisa = Number(cotisation.value.trim());
        if(cotisa >= 100 && cotisa <= 50000 && Number.isInteger(cotisa)){
            return true ;
        }
        return false;
    }
    
    function cotisationerreurmssg(){
        let mssgcotisa = cotisationerreur;
        if(cotisation.value.trim()===""){
            mssgcotisa.textContent="entrer la cotisation entre 100 et 50000 ";
            mssgcotisa.classList.remove("hidden");
        }else if(validercotisation() === false){
            mssgcotisa.classList.remove("hidden");
            mssgcotisa.textContent="Nombre Invalide entrer un prix entre 100 et 50000";
        }else{
            mssgcotisa.textContent = "";
            mssgcotisa.classList.add("hidden")
        }
    }
    cotisation.addEventListener("input",cotisationerreurmssg)

// valider la date

function validedate(){
    let date = datedebut.value
    let aujourd = new Date().toISOString().split("T")[0];
    if(date >= aujourd){
        return true
    }
    return false
}
function datedebuterreurmssg(){
    let mssgdate = datedebuterreur;
    if(datedebut.value === ""){
        mssgdate.textContent = "entrer la date";
        mssgdate.classList.remove("hidden")
    }else if(validedate() === false){
        mssgdate.classList.remove("hidden");
        mssgdate.textContent="Date Invalid"
    }else{
        mssgdate.textContent="";
        mssgdate.classList.add("hidden");
    }
}
datedebut.addEventListener("input", datedebuterreurmssg);


//valider periodicite

function validerperiodicite(){
let perio =  periodicite.value;
if(perio === "hebdomadaire"){
    return true
}else if(perio === "quinzaine"){
    return true;
}else if(perio ==="mensuelle"){
return true
}
return false
}

function periodiciteerreurmssg(){
    let mssgperio = periodiciteerreur;
    if(periodicite.value === ""){
        mssgperio.textContent = "entrer la periodicite";
        mssgperio.classList.remove("hidden")
    }else if(validerperiodicite()===false ){
        mssgperio.classList.remove("hidden");
        mssgperio.textContent = "Choix invalid";
    }else{
        mssgperio.textContent = "";
        mssgperio.classList.add("hidden");
    }
}
periodicite.addEventListener("change",periodiciteerreurmssg)

daretform.addEventListener("submit", function(event) {
    event.preventDefault();

    nomcercleerreurmssg();
    cotisationerreurmssg();
    datedebuterreurmssg();
    periodiciteerreurmssg();

    if(validerNomCercle() === false){
        nomcercle.focus();
    }else if(validercotisation()===false){
        cotisation.focus();
    }else if(validedate()=== false){
        datedebut.focus();
    }else if(validerperiodicite() === false){
        periodicite.focus();
    }else{
        console.log("kolchi mezyan")
    }
});


// part 2


function creerparticipant(){

if (participantsliste.children.length < 20) {
let liste = document.createElement("li")
liste.classList.add("flex", "items-center", "gap-4")

let inputparticipant = document.createElement("input")

inputparticipant.classList.add("border","rounded","px-3")


let btnsupprimer = document.createElement("button")
btnsupprimer.textContent="Retirer"
btnsupprimer.classList.add("border","rounded","px-3")


liste.appendChild(inputparticipant)
liste.appendChild(btnsupprimer)
btnsupprimer.type="button"
participantsliste.appendChild(liste)
inputparticipant.type = "text"
inputparticipant.placeholder="entrer le nom"

btnsupprimer.addEventListener("click", function() {
    if(participantsliste.children.length > 2){
        btnsupprimer.parentElement.remove();
        nbrparticipant()
    }
    
    
});
}
nbrparticipant()
}
btnajouterparticipant.addEventListener("click",creerparticipant)

creerparticipant()
creerparticipant()
creerparticipant()

function nbrparticipant(){
    let nombreparticipant = participantsliste.children.length;

    participantscompteur.textContent= " Particioants : "+ nombreparticipant ;

}

