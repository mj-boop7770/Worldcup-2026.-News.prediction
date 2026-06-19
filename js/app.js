import { chargerToutesLesDonnees } from './2026.js';

// Configuration de la langue par défaut
let langueCourante = 'fr';

async function init() {
    const data = await chargerToutesLesDonnees();
    if (!data) {
        console.error("Échec du chargement des données.");
        return;
    }

    // Fonction de rendu global
    const rendre = () => {
        peuplerCalendrier(data.calendrier.rounds);
        peuplerDossiers(data.dossiers.matches_dossier);
        peuplerNews(data.news.news_section);
    };

    // Exposition au scope global pour le HTML
    window.changerLangue = (lang) => {
        langueCourante = lang;
        rendre();
    };

    rendre();
}

function peuplerCalendrier(rounds) {
    const container = document.getElementById('schedule');
    if (!container) return;
    
    container.innerHTML = rounds.map(r => `
        <div class="round">
            <h3>${r.name}</h3>
            ${r.matches.map(m => `
                <div class="match-card">
                    <p><strong>${m.team1} vs ${m.team2}</strong></p>
                    <p>${m.date} - ${m.time} | Stade: ${m.stadium}</p>
                    <p>Statut: ${m.status} | Score: ${m.score1 !== null ? m.score1 + '-' + m.score2 : '-'}</p>
                </div>
            `).join('')}
        </div>
    `).join('');
}

function peuplerDossiers(dossiers) {
    const container = document.getElementById('dossiers');
    if (!container) return;

    container.innerHTML = dossiers.map(d => `
        <div class="dossier-card">
            <h3>${d.match} (${d.date})</h3>
            <p><strong>Groupe:</strong> ${d.group}</p>
            <p><strong>Coach (USA):</strong> ${d.teams.usa.coach.name}</p>
            <p><strong>Analyse:</strong> ${d.teams.usa.prediction[langueCourante]}</p>
        </div>
    `).join('');
}

function peuplerNews(newsSection) {
    const container = document.getElementById('news');
    if (!container) return;

    container.innerHTML = Object.values(newsSection).map(n => `
        <div class="news-card">
            <h3>${n.title[langueCourante]}</h3>
            <p>${n.content[langueCourante]}</p>
        </div>
    `).join('');
}

// Lancer l'initialisation
document.addEventListener('DOMContentLoaded', init);
        
