import { iniciarNuevaPartida } from "./services/apiServices.js";
import { comprobarIntento } from "./logic/juegoMotor.js";
import { estadoJuego } from "./logic/estadoJuego.js";

const btnIniciar = document.getElementById("btn-iniciar");
const btnEnviar = document.getElementById("btn-enviar");
const inputNombre = document.getElementById("input-nombre");
const contenedorPistas = document.getElementById("pistas");
const textoIntentos = document.getElementById("intentos");
const textoRacha = document.getElementById("racha");
const textoMensaje = document.getElementById("mensaje");

btnIniciar?.addEventListener("click", async () => {
    textoMensaje.textContent = "Cargando jugador aleatorio desde TheSportsDB...";
    btnEnviar.disabled = true;

    const exito = await iniciarNuevaPartida();

    if (exito) {
        btnEnviar.disabled = false;
        textoMensaje.textContent = "¡Partida lista! Escribe tu respuesta.";
        console.log("🎮 Jugador secreto:", estadoJuego.jugadorSecreto);
        actualizarInterfaz();
    } else {
        textoMensaje.textContent = "Error al obtener datos de la API.";
    }
});

btnEnviar?.addEventListener("click", () => {
    const intento = inputNombre.value;
    if (!intento) return;

    const resultado = comprobarIntento(intento);
    inputNombre.value = "";

    if (!resultado) return;

    if (resultado.resultado === "VICTORIA") {
        textoMensaje.textContent = `🎉 ¡Correcto! El jugador era ${resultado.jugador}.`;
        btnEnviar.disabled = true;
    } else if (resultado.resultado === "DERROTA") {
        textoMensaje.textContent = `❌ ¡Agotaste los intentos! Era ${resultado.jugador}.`;
        btnEnviar.disabled = true;
    } else if (resultado.resultado === "FALLO") {
        textoMensaje.textContent = "❌ Incorrecto. Pista desbloqueada.";
    }

    actualizarInterfaz();
});

function actualizarInterfaz() {
    textoRacha.textContent = estadoJuego.racha;
    textoIntentos.textContent = estadoJuego.intentosRestantes;

    contenedorPistas.innerHTML = "";
    estadoJuego.pistasRelevadasDelJugador.forEach((pista) => {
        const li = document.createElement("li");
        li.textContent = pista;
        contenedorPistas.appendChild(li);
    });
}