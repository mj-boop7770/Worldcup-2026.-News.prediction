export async function chargerDonneesMondial() {
    try {
        const url = 'https://mj-boop7770.github.io/Worldcup-2026.-News.prediction/2026.json';
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("❌ Impossible de charger le JSON :", error);
        return null;
    }
}
