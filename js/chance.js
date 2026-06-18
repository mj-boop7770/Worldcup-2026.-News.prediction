let matchesData = [];
let teamStats = {};

async function loadMujosDatabase() {
    try {
        const matchesResponse = await fetch('2026.json');
        const data = await matchesResponse.json();
        matchesData = data.rounds[0].matches;
        
        initializeStatsFromDossiers();
        updateStatsWithMatches();
        console.log("✅ MUJOS ORACLE READY!");
    } catch (error) { console.error("❌ Erreur MUJOS:", error); }
}

function initializeStatsFromDossiers() {
    // Sécurité: Utilise les clés du fichier dossiers.js
    for (const team in dossiers) {
        teamStats[team] = {
            att: dossiers[team].attackScore || 50,
            def: dossiers[team].defenseScore || 50,
            wins: 0,
            matches: 0,
            goalsFor: 0,
            goalsAgainst: 0
        };
    }
}

function updateStatsWithMatches() {
    matchesData.forEach(m => {
        if (m.score1 !== null && teamStats[m.team1] && teamStats[m.team2]) {
            teamStats[m.team1].matches++;
            teamStats[m.team2].matches++;
            teamStats[m.team1].goalsFor += m.score1;
            teamStats[m.team1].goalsAgainst += m.score2;
            teamStats[m.team2].goalsFor += m.score2;
            teamStats[m.team2].goalsAgainst += m.score1;
            if (m.score1 > m.score2) teamStats[m.team1].wins++;
            if (m.score2 > m.score1) teamStats[m.team2].wins++;
        }
    });
}

function mujosPredicts(home, away) {
    // Sécurité: Si l'équipe est inconnue, on lui donne une force de base de 50
    const h = teamStats[home] || { att: 50, def: 50, wins: 0, matches: 1, goalsFor: 0, goalsAgainst: 0 };
    const a = teamStats[away] || { att: 50, def: 50, wins: 0, matches: 1, goalsFor: 0, goalsAgainst: 0 };

    const powerH = (h.att * 0.7) + (h.def * 0.3) + ((h.goalsFor - h.goalsAgainst) * 0.5);
    const powerA = (a.att * 0.7) + (a.def * 0.3) + ((a.goalsFor - a.goalsAgainst) * 0.5);

    const winRateH = h.matches > 0 ? (h.wins / h.matches) * 100 : 50;
    const winRateA = a.matches > 0 ? (a.wins / a.matches) * 100 : 50;
    
    let proba = ((powerH / (powerH + powerA)) * 60) + ((winRateH / (winRateH + winRateA)) * 40);

    if (Math.random() < 0.20) { proba = Math.random() * 100; }

    const avgGoalsH = Math.max(0.5, (h.goalsFor / Math.max(1, h.matches)) * (proba / 100));
    const avgGoalsA = Math.max(0.5, (a.goalsFor / Math.max(1, a.matches)) * ((100 - proba) / 100));

    return {
        homeProba: Math.round(proba),
        awayProba: Math.round(100 - proba),
        score: `${Math.round(avgGoalsH)} - ${Math.round(avgGoalsA)}`,
        confidence: Math.round(Math.abs(proba - 50) + 50)
    };
}

function predict() {
    const home = document.getElementById('ta').value;
    const away = document.getElementById('tb').value;
    const res = mujosPredicts(home, away);
    
    document.getElementById('rs').innerText = res.score;
    document.getElementById('pw').innerText = res.homeProba + "%";
    document.getElementById('pl').innerText = res.awayProba + "%";
    document.getElementById('rc').style.display = 'block';
}

window.addEventListener('load', loadMujosDatabase);
              
