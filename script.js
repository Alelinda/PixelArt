function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Corrigido para concatenar ao invés de sobrescrever
    }

    return color;
}

const palette = document.getElementById('palette');
const pixelArt = document.getElementById('pixel-art');
const gridSizeInput = document.getElementById('grid-size');

let selectedColor = '#000000'; // cor padrão
let gridSize = 5; // tamanho padrão

function createPalette() {
    palette.innerHTML = ''; // limpa a paleta

    for (let i = 0; i < 4; i++) {
        const color = getRandomColor();
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color;
        colorDiv.onclick = () => {
            selectedColor = color; // atualiza a cor selecionada
        };

        palette.appendChild(colorDiv); // adiciona à paleta
    }
}

function createGrid(size) {
    pixelArt.innerHTML = ''; // Corrigido para limpar a grade antes de criar nova
    pixelArt.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    pixelArt.style.gridTemplateRows = `repeat(${size}, 50px)`;

    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        pixel.onclick = () => {
            pixel.style.backgroundColor = selectedColor; // pinta a célula
        };

        pixelArt.appendChild(pixel); // adiciona à grade
    }
}

function clearPixels() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => pixel.style.backgroundColor = ''); // limpa a cor dos pixels
}

function regenerateColors() {
    createPalette(); // gera nova paleta de cores
}

function generateGrid() {
    const size = parseInt(gridSizeInput.value) || 5; // tamanho da grade a partir do input
    gridSize = size;
    createGrid(gridSize); // cria a grade com o tamanho especificado
}

// eventos dos botões
document.getElementById('clear').onclick = clearPixels;
document.getElementById('generate').onclick = generateGrid;

// evento para gerar novas cores
document.getElementById('regenerate-colors').onclick = regenerateColors;

// adiciona evento de teclado para input (Enter)
gridSizeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        generateGrid(); // chama a função quando 'Enter' for pressionado
    }
});

// inicia a paleta e grade padrão
createPalette();
createGrid(gridSize);
