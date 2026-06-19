// js/2026.js

/**
 * Charge les données depuis le fichier JSON
 * Utilise "./" pour pointer vers la racine du projet, 
 * ce qui fonctionne sur GitHub Pages peu importe le dossier parent.
 */
export async function chargerDonneesMondial() {
    try {
        const response = await fetch('./2026.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - Vérifiez que 2026.json est bien à la racine.`);
        }
        return await response.json();
    } catch (error) {
        console.error("❌ Erreur lors du chargement de 2026.json :", error);
        return null;
    }
}

/**
 * Filtre les matchs selon leur statut ("Terminé" ou "À venir")
 * @param {Object} data - L'objet complet provenant du JSON
 * @param {string} statut - "Terminé" ou "À venir"
 */
export function filtrerMatchsParStatut(data, statut) {
    if (!data || !data.rounds) return [];
    return data.rounds[0].matches.filter(m => m.status === statut);
}

/**
 * Récupère tous les matchs d'un groupe spécifique
 */
export function filtrerMatchsParGroupe(data, groupName) {
    if (!data || !data.rounds) return [];
    return data.rounds[0].matches.filter(m => m.group === groupName);
}

/**
 * Calcule les stats rapides
 */
export function obtenirResumeStatut(data) {
    if (!data || !data.rounds) return { total: 0, termines: 0, aVenir: 0 };
    const matches = data.rounds[0].matches;
    return {
        total: matches.length,
        termines: matches.filter(m => m.status === "Terminé").length,
        aVenir: matches.filter(m => m.status === "À venir").length
    };
}
    
