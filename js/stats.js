// stats.js
export const StatsEngine = {
    // Calcul automatique des points d'une équipe
    // Victoire = 3pts, Nul = 1pt, Défaite = 0pt
    calculerPoints: (teamName, matches) => {
        let points = 0;
        
        matches.forEach(match => {
            // On ne traite que les matchs terminés
            if (match.status === "Terminé") {
                const estTeam1 = match.team1 === teamName;
                const estTeam2 = match.team2 === teamName;

                if (estTeam1 || estTeam2) {
                    const scorePropre = estTeam1 ? match.score1 : match.score2;
                    const scoreAdversaire = estTeam1 ? match.score2 : match.score1;

                    if (scorePropre > scoreAdversaire) {
                        points += 3;
                    } else if (scorePropre === scoreAdversaire) {
                        points += 1;
                    }
                }
            }
        });
        
        return points;
    },

    // Vérifie si un match est à venir pour une équipe donnée
    aUnMatchAVenir: (teamName, matches) => {
        return matches.find(m => 
            m.status === "À venir" && (m.team1 === teamName || m.team2 === teamName)
        );
    }
};
                  
