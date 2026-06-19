// js/app.js
import { chargerDonneesMondial } from './2026.js';
import { StatsEngine } from './stats.js';
import { ChanceEngine } from './chance.js';
import { Mascotte } from './mascotte.js';
import { texts } from './traductions.js';

// État global de l'application
const state = {
    data: null,
    lang: 'fr'
};

// 1. Navigation entre les sections
window.tab = (sectionId, btn) => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    btn.classList.add('active');
};

// 2. Gestion des langues
window.changerLangue = (lang) => {
    state.lang = lang;
    const t = texts[lang];
    if (!t) return;
    
    const navBtns = document.querySelectorAll('nav button');
    navBtns[0].innerText = t.groups;
    navBtns[1].innerText = t.schedule;
    navBtns[2].innerText = t.predict;
    navBtns[3].innerText = t.dossier;
    navBtns[4].innerText = t.news;
    console.log("Langue basculée en :", lang);
};

// 3. Initialisation unique et centralisée
async function demarrerApplication() {
    console.log("🚀 Lancement de l'Oracle MUJOS Octopus 2...");
    
    // Affichage de la mascotte
    Mascotte.afficher('mascotte-container');
    
    // Chargement unique des données
    state.data = await chargerDonneesMondial();
    
    if (state.data) {
        console.log("✅ Données reçues, système opérationnel.");
        // Ici, tu pourras appeler tes fonctions de calcul et initialiser tes vues
        // Exemple : afficherGroupes(state.data);
    } else {
        console.error("❌ Impossible de démarrer : pas de données.");
    }
}

window.addEventListener('load', demarrerApplication);
        
