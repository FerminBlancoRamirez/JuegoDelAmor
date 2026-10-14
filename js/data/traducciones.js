export const DICCIONARIO_POSICIONES = {
    "Goalkeeper": "Portero",
    "Defender": "Defensa",
    "Centre-Back": "Defensa Central",
    "Left-Back": "Lateral Izquierdo",
    "Right-Back": "Lateral Derecho",
    "Midfield": "Centrocampista",
    "Central Midfield": "Centrocampista",
    "Defensive Midfield": "Pivote / Mediocentro Defensivo",
    "Attacking Midfield": "Mediapunta",
    "Left Wing": "Extremo Izquierdo",
    "Right Wing": "Extremo Derecho",
    "Forward": "Delantero",
    "Centre-Forward": "Delantero Centro"
};

export const DICCIONARIO_PAISES = {
    "South Korea": "Corea del Sur",
    "Spain": "España",
    "France": "Francia",
    "England": "Inglaterra",
    "Germany": "Alemania",
    "Brazil": "Brasil",
    "Argentina": "Argentina",
    "Portugal": "Portugal",
    "Netherlands": "Países Bajos",
    "Belgium": "Bélgica",
    "Uruguay": "Uruguay",
    "Norway": "Noruega",
    "Croatia": "Croacia"
};

export function traducirTexto(texto, diccionario) {
    if (!texto) return 'Desconocido';
    return diccionario[texto] || texto; 
}