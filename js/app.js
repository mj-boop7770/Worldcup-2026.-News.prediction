import { chargerDonneesMondial } from './2026.js';

async function afficherMatchs() {
    const data = await chargerDonneesMondial();
    const container = document.getElementById('container');

    if (data && data.rounds && data.rounds[0].matches) {
        const matches = data.rounds[0].matches;
        
        container.innerHTML = matches.map(m => `
            <div class="match-card">
                <div class="header">
                    <strong>${m.group}</strong> - ${m.date} à ${m.time}
                </div>
                <h3>${m.team1} vs ${m.team2}</h3>
                <div class="details">
                    <p>Score: ${m.score1 !== null ? `${m.score1} - ${m.score2}` : 'À venir'}</p>
                    <p>Statut: ${m.status}</p>
                    <p><small>Stade: ${m.stadium}</small></p>
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = "<p>Aucune donnée trouvée.</p>";
    }
}

// Lancer l'affichage au chargement
document.addEventListener('DOMContentLoaded', afficherMatchs);
                          
