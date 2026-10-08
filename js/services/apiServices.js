//Se van a seleccionar las pistas de nacionalidad, posicion, equipoActual, dorsal, fecha de nacimiento(edad)

import { futbolistasActuales } from "../data/jugadores";
import { estadoJuego } from "../logic/estadoJuego";
import { calcularEdad } from "../logic/estadoJuego";
import { revelarSiguientePista } from "../logic/estadoJuego";

export async function iniciarNuevaPartida() {
    if (!estadoJuego.victoria==true){
        estadoJuego.racha=0
    }else{
        estadoJuego.racha=estadoJuego.racha +1
    }

    estadoJuego.intentosRestantes = estadoJuego.maxIntentos
    estadoJuego.juegoTerminado = false
    estadoJuego.victoria = false
    estadoJuego.pistasRelevadasDelJugador = []

    const indiceAleatorio = Math.floor(Math.random() * futbolistasActuales.length)
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
        const edad =calcularEdad(jugadorDatos.dateBorn)

        estadoJuego.jugadorSecreto = jugadorDatos.strPlayer;
        estadoJuego.pistasDelJugador = [
            `Nacionalidad: ${jugadorDatos.strNationality || 'Desconocida'}`,
            `Posición: ${jugadorDatos.strPosition || 'No especificada'}`,
            `Edad: ${edad} (${jugadorDatos.dateBorn || 'Fecha desconocida'})`,
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



