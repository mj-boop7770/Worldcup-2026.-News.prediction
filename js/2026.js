/**
 * MISSION : Fournir les données du tournoi.
 * Il ne calcule rien, il ne formate rien. 
 * Il va juste chercher le fichier JSON à la racine.
 */

export const chargerDonneesMondial = async () => {
    try {
        const response = await fetch('./2026.json');
        
        // On vérifie si le fichier est bien là
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        
        const data = await response.json();
        return data; 
        
    } catch (error) {
        console.error("❌ Erreur dans 2026.js (Fournisseur) :", error);
        return null; // Retourne null pour que app.js sache qu'il y a eu un problème
    }
};
                      
