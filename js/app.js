import { chargerToutesLesDonnees } from './2026.js';

let langue = 'fr';
let data = null;

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', async () => {
    data = await chargerToutesLesDonnees();
    if (data) rendre();
});

// Navigation Onglets
window.tab = (id, btn) => {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
};

// Gestion Langue
window.changerLangue = (l) => {
    langue = l;
    rendre();
};

function rendre() {
    if (!data) return;
    
    // Peuplement Calendrier
    const sched = document.getElementById('schedule');
    sched.innerHTML = data.calendrier.rounds.map(r => `
        <h3>${r.name}</h3>
        ${r.matches.map(m => `
            <div style="border:1px solid #444; margin:5px; padding:10px;">
                <strong>${m.team1} vs ${m.team2}</strong> - ${m.date}
                <p>Score: ${m.score1 ?? 'À venir'}</p>
            </div>`).join('')}
    `).join('');

    // Peuplement Dossiers
    const doss = document.getElementById('dossier');
    doss.innerHTML = data.dossiers.matches_dossier.map(d => `
        <div style="border:1px solid #444; margin:5px; padding:10px;">
            <h3>${d.match}</h3>
            <p>${d.teams.usa.prediction[langue]}</p>
        </div>`).join('');

    // Peuplement News
    const news = document.getElementById('news');
    news.innerHTML = Object.values(data.news.news_section).map(n => `
        <div style="border:1px solid #444; margin:5px; padding:10px;">
            <h3>${n.title[langue]}</h3>
            <p>${n.content[langue]}</p>
        </div>`).join('');
        }
