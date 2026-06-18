// js/dossier.js

// 1. On importe la mémoire (le JSON)
import tournamentData from '../2026.json' assert { type: 'json' };

// 2. On importe le cerveau (les calculs de stats.js)
import { StatsEngine } from './stats.js';

// 3. On importe la voix (les messages dans les 3 langues de messages.js)
import { getOracleMessage } from './messages.js';

export const MUJOS = {
    /**
     * Cette fonction est le seul point d'entrée dont tu as besoin dans ton app.js
     * Elle reçoit le nom de l'équipe, la langue souhaitée et le ton.
     */
    consulterOracle: (teamName, lang, tone) => {
        
        // A. Étape de calcul : On demande à stats.js de traiter la mémoire (tournamentData)
        const points = StatsEngine.calculerPoints(teamName, tournamentData.matches);
        
        // B. Étape de forme : On demande à messages.js de traduire et styliser le résultat
        const messageFinal = getOracleMessage(lang, tone, teamName, points);
        
        // C. On renvoie le résultat prêt à être affiché
        return messageFinal;
    }
};
    
