import { chargerDonneesMondial } from './2026.js';

// Gestion de la navigation entre les onglets
window.tab = function(sectionId, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    btn.classList.add('active');
};

// Gestion de la langue (fonction placeholder)
window.changerLangue = function(lang) {
    console.log("Langue changée en :", lang);
    alert("Fonctionnalité " + lang + " en cours de développement.");
};

// Initialisation et chargement des données
async function init() {
    const data = await chargerDonneesMondial();
    const scheduleDiv = document.getElementById('schedule');

    if (data && data.rounds && scheduleDiv) {
        const matchs = data.rounds[0].matches;
        
        scheduleDiv.innerHTML = `
            <h2>Calendrier des matchs</h2>
            <div id="match-container" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; padding: 20px;">
                ${matchs.map(m => `
                    <div class="match-card" style="border: 1px solid #444; padding: 15px; border-radius: 10px; background: #111;">
                        <div style="font-size: 0.8rem; color: #888;">${m.group} | ${m.stadium}</div>
                        <h3 style="margin: 10px 0;">${m.team1} vs ${m.team2}</h3>
                        <p style="font-weight: bold; color: #D4AF37;">
                            ${m.score1 !== null ? `${m.score1} - ${m.score2}` : 'À venir'}
                        </p>
                        <p style="font-size: 0.9rem;">${m.date} à ${m.time} | <strong>${m.status}</strong></p>
                    </div>
                `).join('')}
            </div>
        `;
    } else if (scheduleDiv) {
        scheduleDiv.innerHTML = "<p>Erreur lors du chargement des matchs.</p>";
    }
}

// Lancer au chargement de la page
document.addEventListener('DOMContentLoaded', init);
    
