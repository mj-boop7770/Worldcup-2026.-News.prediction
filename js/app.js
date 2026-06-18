// ==========================================
// 1. SYSTÈME MULTILINGUE (3 LANGUES)
// ==========================================
let langueActuelle = 'fr', filtreActuel = "ALL";

const traductions = {
    fr: { title: "WORLDCUP2026 · MUJOS OCTOPUS", sub: "AI FOOTBALL ORACLE · 48 NATIONS · LIVE SCORES", dates: "11 JUIN - 19 JUIL 2026", groups: "GROUPES", schedule: "CALENDRIER", predict: "PRÉDICTIONS", dossier: "DOSSIERS", news: "NEWS", oracleBtn: "ORACLE - PRÉDIRE LE MATCH", winA: "VICTOIRE A", draw: "NUL", winB: "VICTOIRE B", placeholder: "France, Espagne, Allemagne...", open: "OUVRIR", attack: "ATTAQUE", defense: "DÉFENSE", form: "FORME", mental: "MENTAL", coach: "SÉLECTIONNEUR", keyplayer: "JOUEUR CLÉ", stars: "ÉTOILES", history: "HISTOIRE", all: "TOUS", grp: "GROUPE ", loadingMatch: "⏳ Chargement...", noMatch: "Aucun match", done: "✅ TERMINÉ", at: "à", diffTeams: "Sélectionnez deux équipes différentes", notFound: "Équipe non trouvée : ", loadingNews: "📰 Chargement des infos...", noNews: "Pas d'actualité", errorNews: "⚠️ Erreur actualité" },
    en: { title: "WORLDCUP2026 · MUJOS OCTOPUS", sub: "AI FOOTBALL ORACLE · 48 NATIONS · LIVE SCORES", dates: "11 JUN - 19 JUL 2026", groups: "GROUPS", schedule: "SCHEDULE", predict: "PREDICT", dossier: "DOSSIERS", news: "NEWS", oracleBtn: "ORACLE - PREDICT MATCH", winA: "WIN A", draw: "DRAW", winB: "WIN B", placeholder: "France, Spain, Germany...", open: "OPEN", attack: "ATTACK", defense: "DEFENSE", form: "FORM", mental: "MENTAL", coach: "COACH", keyplayer: "KEY PLAYER", stars: "STARS", history: "HISTORY", all: "ALL", grp: "GROUP ", loadingMatch: "⏳ Loading...", noMatch: "No matches", done: "✅ DONE", at: "at", diffTeams: "Select two different teams", notFound: "Team not found: ", loadingNews: "📰 Loading news...", noNews: "No news", errorNews: "⚠️ News error" },
    pt: { title: "WORLDCUP2026 · MUJOS OCTOPUS", sub: "AI FOOTBALL ORACLE · 48 NATIONS · LIVE SCORES", dates: "11 JUN - 19 JUL 2026", groups: "GRUPOS", schedule: "CALENDÁRIO", predict: "PREVISÕES", dossier: "DOSSIÊS", news: "NOTÍCIAS", oracleBtn: "ORÁCULO - PREVER JOGO", winA: "VITÓRIA A", draw: "EMPATE", winB: "VITÓRIA B", placeholder: "França, Espanha, Alemanha...", open: "ABRIR", attack: "ATAQUE", defense: "DEFESA", form: "FORMA", mental: "MENTAL", coach: "TÉCNICO", keyplayer: "JOGADOR CHAVE", stars: "ESTRELAS", history: "HISTÓRIA", all: "TUDO", grp: "GRUPO ", loadingMatch: "⏳ Carregando...", noMatch: "Nenhuma partida", done: "✅ CONCLUÍDO", at: "às", diffTeams: "Selecione dois times diferentes", notFound: "Equipe não encontrada: ", loadingNews: "📰 Carregando notícias...", noNews: "Sem notícias", errorNews: "⚠️ Erro de notícias" }
};

const aliasEquipes = {
    "espagne": "Spain", "france": "France", "allemagne": "Germany", "angleterre": "England", "brésil": "Brazil", "bresil": "Brazil", "portugal": "Portugal", "argentine": "Argentina", "maroc": "Morocco", "sénégal": "Senegal", "senegal": "Senegal", "norvège": "Norway", "norvege": "Norway", "colombie": "Colombia", "belgique": "Belgium", "croatie": "Croatia", "pays-bas": "Netherlands", "pays bas": "Netherlands", "hollande": "Netherlands", "uruguay": "Uruguay", "rdc": "DR Congo", "congo": "DR Congo", "rd congo": "DR Congo"
};

function normaliserNomEquipe(input) {
    const lower = input.trim().toLowerCase();
    if (aliasEquipes[lower]) return aliasEquipes[lower];
    // Note: 'dossiers' doit être chargé globalement via ton fichier dossiers.js
    if (typeof dossiers !== 'undefined' && dossiers[lower]) return dossiers[lower].name;
    return null;
}

function changerLangue(code, btn) {
    document.documentElement.lang = code;
    langueActuelle = code;
    localStorage.setItem('langueOctopus', code);
    
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    
    const t = traductions[code];
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('main-sub').innerText = t.sub;
    document.getElementById('badge-dates').innerText = t.dates;
    document.getElementById('btn-groups').innerHTML = t.groups;
    document.getElementById('btn-schedule').innerHTML = t.schedule;
    document.getElementById('btn-predict').innerHTML = t.predict;
    document.getElementById('btn-dossier').innerHTML = t.dossier;
    document.getElementById('btn-news').innerHTML = `${t.news}<span class="live-dot"></span>`;
    document.getElementById('btn-oracle-predict').innerText = t.oracleBtn;
    document.getElementById('lbl-winA').innerText = t.winA;
    document.getElementById('lbl-draw').innerText = t.draw;
    document.getElementById('lbl-winB').innerText = t.winB;
    document.getElementById('di').placeholder = t.placeholder;
    document.getElementById('btn-open-dossier').innerText = t.open;
    document.getElementById('lbl-attack').innerText = t.attack;
    document.getElementById('lbl-defense').innerText = t.defense;
    document.getElementById('lbl-form').innerText = t.form;
    document.getElementById('lbl-mental').innerText = t.mental;
    document.getElementById('lbl-coach').innerText = t.coach;
    document.getElementById('lbl-keyplayer').innerText = t.keyplayer;
    document.getElementById('lbl-stars').innerText = t.stars;
    document.getElementById('lbl-history').innerText = t.history;
    
    const act = document.querySelector('.section.active').id;
    if (act === 'schedule') { document.getElementById('mfilter').innerHTML = ""; initFilters(); afficherMatchs(); }
    else if (act === 'news') afficherMessagesQuotidiens();
    else if (act === 'dossier' && document.getElementById('dc').style.display === 'block') dos();
}

function tab(secId, btn) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById(secId).classList.add('active');
    if (btn) btn.classList.add('active');
    if (secId === 'groups') initGroups();
    if (secId === 'schedule') initSchedule();
    if (secId === 'predict') initPredictSelectors();
    if (secId === 'news') afficherMessagesQuotidiens();
}

function initGroups() {
    const c = document.getElementById('gg'); if (!c) return; c.innerHTML = "";
    if (typeof worldCupData === 'undefined' || !worldCupData.groups) return;
    for (const [letter, teams] of Object.entries(worldCupData.groups)) {
        let h = `<div class="card"><div class="glabel">GROUP ${letter}</div>`;
        teams.forEach(t => { h += `<div class="trow" onclick="rechercherPaysDepuisGroupe('${t.name}')"><span>${t.name}</span><span class="rk">#${t.fifa_rank}</span></div>`; });
        c.innerHTML += h + `</div>`;
    }
}

function rechercherPaysDepuisGroupe(n) {
    const b = document.getElementById('btn-dossier'), i = document.getElementById('di');
    if (i) i.value = n;
    tab('dossier', b);
    dos();
}

async function afficherMatchs() {
    const c = document.getElementById('matchlist'); if (!c) return;
    const t = traductions[langueActuelle]; c.innerHTML = `<p style='color:#94A3B8; padding:2rem;'>${t.loadingMatch}</p>`;
    try {
        const res = await fetch('./2026.json'); if (!res.ok) throw new Error();
        const d = await res.json(); c.innerHTML = "";
        let mF = d.rounds[0].matches.filter(m => filtreActuel === "ALL" || (m.group && m.group.toString().toUpperCase().includes(filtreActuel)));
        if (mF.length === 0) { c.innerHTML = `<p style='color:#94A3B8; padding:2rem;'>${t.noMatch}</p>`; return; }
        mF.forEach(m => {
            let sH = `<span class="mresult">VS</span>`, dt = m.date || "";
            if (m.score1 !== undefined && m.score1 !== null) { sH = `<span class="mresult" style="color:#F59E0B;">${m.score1} - ${m.score2}</span>`; dt += ` | ${t.done}`; }
            else if (m.time) { dt += ` ${t.at} ${m.time}`; }
            c.innerHTML += `<div class="mcard"><div class="mdate">${dt}</div><div class="mteams"><span style="cursor:pointer;" onclick="rechercherPaysDepuisGroupe('${m.team1}')">${m.team1}</span> <span style="cursor:pointer;" onclick="rechercherPaysDepuisGroupe('${m.team2}')">${m.team2}</span> <span class="mgroup">${m.group}</span></div><div style="display:flex;justify-content:space-between;">${sH}</div></div>`;
        });
    } catch (e) { c.innerHTML = `<p style='color:#EF4444; padding:2rem;'>⚠️ Erreur Calendrier</p>`; }
}

function dos() {
    const s = document.getElementById('di'); if (!s || !s.value.trim()) return;
    const t = traductions[langueActuelle];
    const cleEquipe = normaliserNomEquipe(s.value);
    if (!cleEquipe || typeof dossiers === 'undefined' || !dossiers[cleEquipe]) { alert(t.notFound + s.value); return; }
    const d = dossiers[cleEquipe][langueActuelle] || dossiers[cleEquipe]['fr'];
    document.getElementById('dn').innerText = d.name || cleEquipe;
    document.getElementById('dm').innerText = d.meta || "Nations Cup";
    document.getElementById('da').innerText = d.attack || "-";
    document.getElementById('dd').innerText = d.defense || "-";
    document.getElementById('df').innerText = d.form || "-";
    document.getElementById('dme').innerText = d.mental || "-";
    document.getElementById('dc2').innerText = d.coach || "-";
    document.getElementById('dkp').innerText = d.keyPlayer || "-";
    document.getElementById('dsp').innerText = d.stars || "-";
    document.getElementById('dh').innerText = d.history || "-";
    document.getElementById('dc').style.display = 'block';
}

// FONCTION NEWS NETTOYÉE (0 API)
async function afficherMessagesQuotidiens() {
    const c = document.getElementById('news-list'); if (!c) return;
    const t = traductions[langueActuelle];
    c.innerHTML = `<p style='color:#94A3B8;text-align:center;padding:2rem;'>${t.loadingNews}</p>`;
    try {
        const res = await fetch('./messages.json'); if (!res.ok) throw new Error();
        const d = await res.json();
        const articles = d.articles[langueActuelle] || d.articles['fr'] || [];
        
        c.innerHTML = `<div style="color:#64748B;font-size:0.75rem;font-weight:bold;margin-bottom:1rem;text-align:right;letter-spacing:0.5px;">📅 FLASH : ${d.date || '2026'}</div>`;
        if (articles.length === 0) { c.innerHTML += `<p style='color:#94A3B8;text-align:center;padding:2rem;'>${t.noNews}</p>`; return; }
        articles.forEach(a => {
            c.innerHTML += `<div class="card" style="margin-bottom:1rem;border-left:4px solid #8B5CF6;padding:1rem;background:#111827;border-radius:8px;"><div style="margin-bottom:.4rem;"><span style="color:#A78BFA;font-weight:700;font-size:0.9rem;">${a.titre}</span></div><p style="color:#94A3B8;font-size:0.8rem;line-height:1.5;">${a.contenu}</p></div>`;
        });
    } catch (e) { c.innerHTML = `<p style='color:#EF4444;text-align:center;padding:2rem;'>${t.errorNews}</p>`; }
}

window.onload = function() {
    const langueSauvegardee = localStorage.getItem('langueOctopus') || 'fr';
    const btnLangue = document.querySelector(`.lang-btn[onclick*="'${langueSauvegardee}'"]`);
    changerLangue(langueSauvegardee, btnLangue);
    initGroups();
};
     
