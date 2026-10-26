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

let contenuresultat = document.querySelector('#contenu-resultat')
let etatvide = document.querySelector('#etat-vide')
let resumecagnotte = document.querySelector('#resume-cagnotte')
let resumetotalcycl = document.querySelector('#resume-total-cycle')
let resumenbtours = document.querySelector('#resume-nb-tours')
let resumedates = document.querySelector('#resume-dates')


let calendriercorps = document.querySelector('#calendrier-corps')

//part 5 vr
let btntirage = document.getElementById("tirage-au-sort");
let btnordresaisie = document.getElementById("ordre-saisie");

let ordreTours = null;

//part 6 vr

let compteurtours = document.querySelector('#compteur-tours');





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
        resumecagnotte.textContent = montontrecu(cotisation.value ,participantsliste.children.length ) + " MAD ";
        resumetotalcycl.textContent =totalVerseCycle(cotisation.value ,participantsliste.children.length )
        resumenbtours.textContent = calculerNbTours(participantsliste.children.length)

        resumedates.textContent =
        new Date(datedebut.value).toLocaleDateString("fr-FR") + " - " +
        calculerDateDernierTour(
        datedebut.value,
        participantsliste.children.length,
        periodicite.value
        ).toLocaleDateString("fr-FR");


        contenuresultat.classList.remove("hidden");
        etatvide.classList.add("hidden");

        genererCalendrier();


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


//part 3


function montontrecu(cotisation , nbparticipant){
    return cotisation*nbparticipant
}

function totalVerseCycle(cotisation , nbtours){
    return  cotisation*nbtours
    
}

function calculerNbTours(nbparticipant){
    return nbparticipant
}

function calculerDateDernierTour(dateDebut, nbtours, periodicite) {
    let date = new Date(dateDebut);
    let jourInitial = date.getDate();
    let nbajouts = nbtours - 1;
    let intervalle = 0;

    if (periodicite === "hebdomadaire") {
        intervalle = 7;
    } else if (periodicite === "quinzaine") {
        intervalle = 15;
    }

    for (let i = 0; i < nbajouts; i++) {
        if (periodicite === "mensuelle") {
            let mois = date.getMonth() + 1;
            let annee = date.getFullYear();

            if (mois > 11) {
                mois = 0;
                annee++;
            }

            let dernierJour = new Date(annee, mois + 1, 0).getDate();
            let jour = Math.min(jourInitial, dernierJour);

            date.setFullYear(annee, mois, jour);
        } else {
            date.setDate(date.getDate() + intervalle);
        }
    }

    return date;
}


//part 4




function creerLigneTour(numero, dateDebut, beneficiaire, totalcotisa , periodicite, statut) {
    let ligne = document.createElement("tr");
    ligne.dataset.tour = numero;

    let celule1 = document.createElement("td");
    let celule2 = document.createElement("td");
    let celule3 = document.createElement("td");
    let celule4 = document.createElement("td");
    let celule5 = document.createElement("td");
    let celule6 = document.createElement("td");
    let boutonStatut = document.createElement("button");
    boutonStatut.textContent="Marquer comme terminé"
    boutonStatut.type="button"
    boutonStatut.dataset.action = "basculer-statut";


    let date = calculerDateDernierTour( dateDebut,numero,periodicite).toLocaleDateString("fr-FR",{
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    celule1.textContent = numero;
    ligne.appendChild(celule1);

    celule2.textContent = date;
    ligne.appendChild(celule2);

    celule3.textContent = beneficiaire;
    ligne.appendChild(celule3);

    celule4.textContent = totalcotisa + "MAD";
    ligne.appendChild(celule4);

    celule5.textContent = statut;
    ligne.appendChild(celule5);

    celule6.appendChild(boutonStatut);
    ligne.appendChild(celule6);

    return ligne;
}



//part 5 


function genererCalendrier() {
    let participants = ordreTours || Array.from(participantsliste.children);

    let totalcotisa = Number(cotisation.value) * participants.length;

    calendriercorps.textContent = "";

    for (let i = 0; i < participants.length; i++) {
        let participant = participants[i];
        let beneficiaire = participant.querySelector("input").value;
        let numero = i + 1;

        let ligne = creerLigneTour(
            numero,
            datedebut.value,
            beneficiaire,
            totalcotisa,
            periodicite.value,
            "À venir"
        );

        calendriercorps.appendChild(ligne);
    }
    actualiserCompteurTours();
    actualiserProchainTour();
}


function melangerParticipants() {
    let participants = Array.from(participantsliste.children);

    for (let i = participants.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temporaire = participants[i];
        participants[i] = participants[j];
        participants[j] = temporaire;
    }

    return participants;
}


btntirage.addEventListener("click", function () {
    ordreTours = melangerParticipants();
    genererCalendrier();
});

btnordresaisie.addEventListener("click", function () {
    ordreTours = null;
    genererCalendrier();
});


//part 6


calendriercorps.addEventListener("click", function(event) {
    let bouton = event.target.closest("button");

    if (bouton === null) {
    return;
    }
    if (bouton.dataset.action !== "basculer-statut") {
        return;
    }
    let ligne = bouton.closest("tr");
    let statut = ligne.children[4];

    if(statut.textContent==="À venir"){
        statut.textContent="Terminé"
        bouton.textContent = "Annuler";
        ligne.classList.add("ligne-terminee")
    }else{
        statut.textContent="À venir";
        bouton.textContent = "Marquer comme terminé";
        ligne.classList.remove("ligne-terminee")
    }
    actualiserCompteurTours()
    actualiserProchainTour();
});



function actualiserCompteurTours() {
    let nombreTermines = 0;

    for (let i = 0; i < calendriercorps.children.length; i++) {
        let ligne = calendriercorps.children[i];
        let statut = ligne.children[4];

        if (statut.textContent === "Terminé") {
            nombreTermines++;
        }
    }

    compteurtours.textContent =
        nombreTermines + " tours terminés sur " + calendriercorps.children.length;
}

function actualiserProchainTour() {
    for (let i = 0; i < calendriercorps.children.length; i++) {
        let ligne = calendriercorps.children[i];
        ligne.classList.remove("prochain-tour");
    }

    for (let i = 0; i < calendriercorps.children.length; i++) {
        let ligne = calendriercorps.children[i];
        let statut = ligne.children[4];

        if (statut.textContent === "À venir") {
            ligne.classList.add("prochain-tour");
            break;
        }
    }
}