
export const estadoJuego={
    jugadorSecreto : null,
    pistasDelJugador : [],
    pistasRelevadasDelJugador : [],
    intentosRestantes : 5,
    maxIntentos : 5,
    racha : 0,
    juegoTerminado : false,
    victoria : false
}

export function revelarSiguientePista() {
    if (estadoJuego.pistasDelJugador.length > 0) {
        const pista = estadoJuego.pistasDelJugador.shift();
        estadoJuego.pistasRelevadasDelJugador.push(pista);
    }
}

export function calcularEdad(fechaNacimientoStr) {
    if (!fechaNacimientoStr) return 'Desconocida';
    
    const fechaNac = new Date(fechaNacimientoStr);
    const hoy = new Date();
    
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    
    return isNaN(edad) ? 'Desconocida' : `${edad} años`;
}

