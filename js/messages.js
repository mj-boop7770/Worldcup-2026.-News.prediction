// js/messages.js

export const messages = {
    fr: {
        mystique: {
            analyse: (team, pts) => `L'Oracle a scruté les astres : ${team} possède ${pts} points dans la trame du destin.`
        },
        analytique: {
            analyse: (team, pts) => `Données statistiques : ${team} totalise actuellement ${pts} points.`
        }
    },
    en: {
        mystique: {
            analyse: (team, pts) => `The Oracle has studied the stars: ${team} holds ${pts} points in the threads of destiny.`
        },
        analytique: {
            analyse: (team, pts) => `Statistical data: ${team} currently has a total of ${pts} points.`
        }
    },
    pt: {
        mystique: {
            analyse: (team, pts) => `O Oráculo observou os astros: ${team} possui ${pts} pontos nas tramas do destino.`
        },
        analytique: {
            analyse: (team, pts) => `Dados estatísticos: ${team} totaliza atualmente ${pts} pontos.`
        }
    }
};

/**
 * Fonction pour récupérer le message formaté
 * @param {string} lang - 'fr', 'en', ou 'pt'
 * @param {string} tone - 'mystique' ou 'analytique'
 * @param {string} team - Nom de l'équipe
 * @param {number} pts - Nombre de points calculés
 */
export const getOracleMessage = (lang, tone, team, pts) => {
    // Vérification de sécurité pour éviter les erreurs si la langue n'existe pas
    const language = messages[lang] ? lang : 'fr';
    const style = messages[language][tone] ? tone : 'analytique';
    
    return messages[language][style].analyse(team, pts);
};
