import { futbolistasActuales } from "../data/jugadores.js";
import { estadoJuego, calcularEdad, revelarSiguientePista } from "../logic/estadoJuego.js";
import { cargarRacha } from "../logic/almacenamiento.js";
import { DICCIONARIO_PAISES, DICCIONARIO_POSICIONES, traducirTexto } from "../data/traducciones.js";

export async function iniciarNuevaPartida() {
    estadoJuego.racha = cargarRacha();

    estadoJuego.intentosRestantes = estadoJuego.maxIntentos;
    estadoJuego.juegoTerminado = false;
    estadoJuego.victoria = false;
    estadoJuego.pistasRelevadasDelJugador = [];

    const indiceAleatorio = Math.floor(Math.random() * futbolistasActuales.length);
    const nombreBuscado = futbolistasActuales[indiceAleatorio];

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nombreBuscado)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la llamada a la API");

        const data = await response.json();
        const futbolistas = data.player?.filter(p => p.strSport === "Soccer");

        if (!futbolistas || futbolistas.length === 0) {
            return await iniciarNuevaPartida();
        }

        const jugadorDatos = futbolistas[0];
        const edad = calcularEdad(jugadorDatos.dateBorn);

        const nacionalidadEs = traducirTexto(jugadorDatos.strNationality, DICCIONARIO_PAISES);
        const posicionEs = traducirTexto(jugadorDatos.strPosition, DICCIONARIO_POSICIONES);

        estadoJuego.jugadorSecreto = jugadorDatos.strPlayer;
        estadoJuego.pistasDelJugador = [
            `Nacionalidad: ${nacionalidadEs}`,
            `Posición: ${posicionEs}`,
            `Edad: ${edad}`,
            `Equipo actual: ${jugadorDatos.strTeam || 'Desconocido'}`,
            `Dorsal: ${jugadorDatos.strNumber ? `#${jugadorDatos.strNumber}` : 'Sin dorsal registrado'}`
        ];

        revelarSiguientePista();

        return true;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return false;
    }
}