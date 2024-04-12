let palabraSecreta;
let letrasAdivinadas = [];
let intentosRestantes;

// Lista de palabras para el juego
const palabras = ["javascript", "programacion", "ordenador", "desarrollo", "tecnologia"];

// Función para elegir una palabra al azar
function elegirPalabra() {
    return palabras[Math.floor(Math.random() * palabras.length)];
}

// Función para inicializar el juego
function inicializarJuego() {
    palabraSecreta = elegirPalabra();
    letrasAdivinadas = [];
    intentosRestantes = 6;
    mostrarPalabra();
    actualizarInterfaz();
    actualizarImagenAhorcado();
}

// Función para mostrar la palabra con las letras adivinadas
function mostrarPalabra() {
    const palabraDiv = document.getElementById('palabra');
    palabraDiv.innerHTML = '';
    palabraSecreta.split('').forEach(letra => {
        const span = document.createElement('span');
        span.textContent = letrasAdivinadas.includes(letra) ? letra : '_';
        palabraDiv.appendChild(span);
    });
}

// Función para verificar si la letra está en la palabra secreta
function verificarLetra() {
    const letraInput = document.getElementById('letra-input').value.toLowerCase().trim();
    if (letraInput && /^[a-zA-Z]$/.test(letraInput)) {
        if (!letrasAdivinadas.includes(letraInput)) {
            letrasAdivinadas.push(letraInput);
            if (!palabraSecreta.includes(letraInput)) {
                intentosRestantes--;
            }
            mostrarPalabra();
            actualizarInterfaz();
            verificarFinJuego();
        } else {
            alert("Ya has intentado con esta letra.");
        }
    } else {
        alert("Ingresa una letra válida.");
    }
}

// Función para actualizar la interfaz del juego
function actualizarInterfaz() {
    document.getElementById('num-intentos').textContent = intentosRestantes;
    document.getElementById('letras').textContent = letrasAdivinadas.join(', ');
}

// Función para verificar si el juego ha terminado
function verificarFinJuego() {
    if (intentosRestantes === 0) {
        alert("¡Has perdido! La palabra era: " + palabraSecreta);
        reiniciarJuego();
    } else if (!mostrarPalabra().includes('_')) {
        alert("¡Felicidades, has ganado!");
        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    if (confirm("¿Quieres jugar otra vez?")) {
        inicializarJuego();
        document.getElementById('letra-input').value = '';
    }
}

// Función para actualizar la imagen del ahorcado
function actualizarImagenAhorcado() {
    const imagenAhorcado = document.getElementById('imagen-ahorcado').querySelector('img');
    imagenAhorcado.src = `images/${6 - intentosRestantes}.png`;
}

// Inicializar el juego al cargar la página
document.addEventListener('DOMContentLoaded', inicializarJuego);
