const CLAVE_STORAGE = "racha_futbol_game";

export function guardarRacha(racha) {
    localStorage.setItem(CLAVE_STORAGE, racha.toString());
}

export function cargarRacha() {
    const rachaGuardada = localStorage.getItem(CLAVE_STORAGE);
    return rachaGuardada ? parseInt(rachaGuardada, 10) : 0;
}