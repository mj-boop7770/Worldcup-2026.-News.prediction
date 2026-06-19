import { chargerDonneesMondial } from './2026.js';

async function init() {
    const data = await chargerDonneesMondial();
    
    if (data) {
        console.log("Données chargées :", data.name);
        const matchs = data.rounds[0].matches;
        
        // Exemple d'utilisation : affiche le premier match dans la console
        console.log("Premier match :", matchs[0].team1, "vs", matchs[0].team2);
        
        // Ajoute ici tes fonctions d'affichage vers le HTML
    } else {
        console.error("Échec du chargement des données.");
    }
}

init();
