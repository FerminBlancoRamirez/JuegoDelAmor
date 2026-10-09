import { estadoJuego, revelarSiguientePista } from "./estadoJuego.js";
import { guardarRacha } from "./almacenamiento.js";

function limpiarTexto(cadena) {
    return cadena
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function comprobarIntento(nombreIngresado) {
    if (estadoJuego.juegoTerminado) return;

    const entradaLimpia = limpiarTexto(nombreIngresado);
    const objetivoLimpio = limpiarTexto(estadoJuego.jugadorSecreto);

    if (entradaLimpia === objetivoLimpio) {
        estadoJuego.victoria = true;
        estadoJuego.juegoTerminado = true;
        estadoJuego.racha++;

        guardarRacha(estadoJuego.racha);

        return {
            resultado: "VICTORIA",
            rachaActual: estadoJuego.racha,
            jugador: estadoJuego.jugadorSecreto
        };
    } else {
        estadoJuego.intentosRestantes--;

        if (estadoJuego.intentosRestantes > 0) {
            revelarSiguientePista();

            return {
                resultado: "FALLO",
                intentosRestantes: estadoJuego.intentosRestantes,
                pistasVisibles: estadoJuego.pistasRelevadasDelJugador
            };
        } else {
            estadoJuego.juegoTerminado = true;
            estadoJuego.victoria = false;
            estadoJuego.racha = 0;

            guardarRacha(0);

            return {
                resultado: "DERROTA",
                rachaActual: 0,
                jugador: estadoJuego.jugadorSecreto
            };
        }
    }
}