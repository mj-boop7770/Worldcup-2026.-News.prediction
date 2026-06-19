// js/2026.js

let donneesCoupeDuMonde = null;

/**
 * Charge le fichier 2026.json une seule fois et le stocke en mémoire.
 */
export async function chargerDonneesMondial() {
    if (donneesCoupeDuMonde) return donneesCoupeDuMonde; // Si déjà chargé, on renvoie la cache

    try {
        const response = await fetch('2026.json');
        if (!response.ok) throw new Error('Erreur lors du chargement du calendrier');
        donneesCoupeDuMonde = await response.json();
        return donneesCoupeDuMonde;
    } catch (error) {
        console.error("Problème avec le fichier miracle 2026.json :", error);
        return null;
    }
}

/**
 * Exemple de fonction de lecture : Récupérer tous les matchs d'un groupe précis
 */
export function getMatchsParGroupe(nomGroupe) {
    if (!donneesCoupeDuMonde) return [];
    return donneesCoupeDuMonde.rounds[0].matches.filter(m => m.group === nomGroupe);
}
