window.onload = main;

function main() {
    let canvas = document.getElementById('canvas');
    drawGrid(4, 4);
}

function drawGrid(numberOfXsquares, numberOfYsquares) {
    let numberOfPixels = numberOfXsquares * numberOfYsquares;
    for (var i = 0; i < numberOfPixels; i++) {
        let newPixel = document.createElement('span')
        newPixel.classList.add('pixel');
        canvas.appendChild(newPixel);
    }
}
