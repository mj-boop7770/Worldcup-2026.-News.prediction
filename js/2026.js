// js/2026.js

/**
 * Charge les données depuis le fichier JSON
 */
export async function chargerDonneesMondial() {
    try {
        const response = await fetch('2026.json');
        if (!response.ok) throw new Error("Erreur lors du chargement du fichier 2026.json");
        return await response.json();
    } catch (error) {
        console.error("Erreur:", error);
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
 * Calcule les stats rapides (nombre de matchs terminés par exemple)
 */
export function obtenirResumeStatut(data) {
    const matches = data.rounds[0].matches;
    return {
        total: matches.length,
        termines: matches.filter(m => m.status === "Terminé").length,
        aVenir: matches.filter(m => m.status === "À venir").length
    };
        }
                                 
