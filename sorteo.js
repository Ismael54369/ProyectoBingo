// --- CONFIGURACIÓN DEL SORTEO ---

// 1. Define los nombres de tus 30 imágenes aquí.
// El orden es importante: la primera imagen corresponde a la bola 1, la segunda a la bola 2, etc.
const imageFiles = [
    "imagen_bola_1.jpg", // Para la bola 1
    "imagen_bola_2.jpg", // Para la bola 2
    "imagen_bola_3.jpg",
    "imagen_bola_4.jpg",
    "imagen_bola_5.jpg",
    "imagen_bola_6.jpg",
    "imagen_bola_7.jpg",
    "imagen_bola_8.jpg",
    "imagen_bola_9.jpg",
    "imagen_bola_10.jpg",
    "imagen_bola_11.jpg",
    "imagen_bola_12.jpg",
    "imagen_bola_13.jpg",
    "imagen_bola_14.jpg",
    "imagen_bola_15.jpg",
    "imagen_bola_16.jpg",
    "imagen_bola_17.jpg",
    "imagen_bola_18.jpg",
    "imagen_bola_19.jpg",
    "imagen_bola_20.jpg",
    "imagen_bola_21.jpg",
    "imagen_bola_22.jpg",
    "imagen_bola_23.jpg",
    "imagen_bola_24.jpg",
    "imagen_bola_25.jpg",
    "imagen_bola_26.jpg",
    "imagen_bola_27.jpg",
    "imagen_bola_28.jpg",
    "imagen_bola_29.jpg",
    "imagen_bola_30.jpg"  // Para la bola 30
];

let availableNumbers = [];

function initBingo() {
    // Prepara los números del 1 al 30
    console.log("Iniciando el bingo...");
    availableNumbers = Array.from({ length: imageFiles.length }, (_, i) => i + 1);
    const drawButton = document.getElementById('draw-button');
    if (drawButton) {
        drawButton.addEventListener('click', drawNextBall);
        console.log("¡Botón 'Sacar Bola' activado!");
    } else {
        console.error("Error crítico: No se encontró el botón con id 'draw-button'.");
    }
}

function drawNextBall() {
    if (availableNumbers.length === 0) {
        alert("¡Han salido todas las bolas!");
        document.getElementById('draw-button').disabled = true;
        return;
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const drawnNumber = availableNumbers.splice(randomIndex, 1)[0];
    const imageName = imageFiles[drawnNumber - 1]; // Obtenemos el nombre de la imagen del array

    if (!imageName) {
        console.error(`Error: No se encontró un nombre de imagen para la bola número ${drawnNumber}.`);
        return;
    }

    console.log(`Bola sacada: ${drawnNumber}, Imagen: ${imageName}`);

    document.getElementById('current-ball-display').innerHTML = `<img src="images/${imageName}" alt="Bola ${drawnNumber}">`;
    document.getElementById('history-display').innerHTML += `<img src="images/${imageName}" alt="Bola ${drawnNumber}" class="ball-history">`;
}

// Inicializa el bingo cuando el script se carga
initBingo();