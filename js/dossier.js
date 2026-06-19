// js/dossier.js

/**
 * Récupère le dossier complet d'un match spécifique par nom d'équipe
 * @param {Object} data - Le JSON complet (dossier.json)
 * @param {string} nomEquipe - ex: "brazil"
 * @returns {Object|null}
 */
export function getMatchDossier(data, nomEquipe) {
    if (!data || !data.matches_dossier) return null;

    return data.matches_dossier.find(m => 
        m.teams[nomEquipe] !== undefined
    );
}

/**
 * Extrait les données d'une équipe dans une langue spécifique
 * @param {Object} matchData - L'objet match récupéré
 * @param {string} teamKey - ex: "brazil"
 * @param {string} lang - "fr", "en", ou "pt"
 */
export function getTeamContent(matchData, teamKey, lang = 'fr') {
    const team = matchData.teams[teamKey];
    if (!team) return null;

    return {
        general: team.general_performance.world_cup[lang],
        qualifiers: team.general_performance.qualifiers[lang],
        strength: team.key_strength[lang],
        weakness: team.key_weakness[lang],
        coach: team.coach.name,
        tactics: team.coach.tactics[lang],
        star: team.star_player.name,
        starForm: team.star_player.club_form[lang],
        prediction: team.prediction[lang]
    };
}

/**
 * Exemple d'utilisation dans ton app :
 * const dossier = await chargerDossier(); // fetch ton dossier.json
 * const matchInfo = getMatchDossier(dossier, "brazil");
 * const infoBrésil = getTeamContent(matchInfo, "brazil", "fr");
 * console.log(infoBrésil.prediction);
 */
        
