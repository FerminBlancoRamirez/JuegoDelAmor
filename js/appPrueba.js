const input = document.getElementById("nombre")
const boton = document.getElementById("buscar")
const resultado = document.getElementById("resultado")

boton.addEventListener("click", buscarJugadoresPromesas)

function buscarJugadoresPromesas() {
    const nombre = input.value.trim()

    // Validación para evitar búsquedas vacías
    if (!nombre) {
        resultado.innerHTML = "<p>Por favor, escribe el nombre de un futbolista.</p>"
        return
    }

    // Indicador visual de carga
    resultado.innerHTML = "<p>Buscando...</p>"

    // URL de TheSportsDB usando la clave gratuita '3' y búsqueda por texto
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(nombre)}`

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Error en la petición a la API")
            return response.json()
        })
        .then(data => {
            // Comprobamos si la API no encontró coincidencias (devuelve null)
            if (!data.player) {
                resultado.innerHTML = "<p>No se encontraron futbolistas con ese nombre.</p>"
                return
            }

            // Tomamos el primer jugador que coincide con la búsqueda
            const person = data.player[0]

            resultado.innerHTML = `
                <h2>${person.strPlayer}</h2>
                <p><strong>Nacionalidad:</strong> ${person.strNationality}</p>
                <p><strong>Equipo:</strong> ${person.strTeam || 'Sin equipo registrado'}</p>
                <p><strong>Posición:</strong> ${person.strPosition || 'No especificada'}</p>
                <p><strong>Goles:</strong> ${person.idLiveScore || '0'}</p>
                ${person.strThumb ? `<img src="${person.strThumb}" alt="${person.strPlayer}" width="150" style="border-radius: 8px; margin-top: 10px;">` : ''}
            `
        })
        .catch(error => {
            resultado.innerHTML = `<p style="color: red;">Ocurrió un error al buscar el jugador.</p>`
            console.error(error)
        })
}