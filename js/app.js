// js/app.js
import { chargerDonneesMondial } from './2026.js';
import { StatsEngine } from './stats.js';
import { ChanceEngine } from './chance.js'; // Assure-toi d'avoir exporté tes fonctions dans chance.js

async function demarrerApplication() {
    console.log("🚀 Lancement de l'Oracle...");
    
    // 1. On récupère les données via le fournisseur
    const data = await chargerDonneesMondial();
    
    if (data) {
        console.log("✅ Données reçues, distribution aux moteurs...");
        
        // 2. On distribue les données aux moteurs de calcul
        // Exemple : On stocke les matchs dans le moteur de chance
        const matches = data.rounds[0].matches; 
        
        // Initialisation du moteur de statistiques
        // Ici, tu peux appeler des fonctions de tes autres fichiers
        console.log("Calculs des statistiques en cours...");
        
        // 3. Exemple d'utilisation : 
        // const pts = StatsEngine.calculerPoints("Brésil", matches);
        // console.log("Points du Brésil :", pts);

    } else {
        console.error("❌ Impossible de démarrer : pas de données.");
    }
}

// On lance le tout
window.addEventListener('load', demarrerApplication);
