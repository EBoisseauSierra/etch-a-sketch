window.onload = main;

function main() {
    let canvas = document.getElementById('canvas');
    drawGrid(4, 4);
    // use propagation to listen to events
    canvas.addEventListener('mouseover', paintPixel);
}

function drawGrid(numberOfXsquares, numberOfYsquares) {
    let numberOfPixels = numberOfXsquares * numberOfYsquares;
    for (var i = 0; i < numberOfPixels; i++) {
        let newPixel = document.createElement('span')
        newPixel.classList.add('pixel');
        canvas.appendChild(newPixel);
    }
}

function paintPixel(event) {
    let pixelToPaint = event.target;
    // don't paint the canvas itself (even if it shouldn't be observable)
    if (pixelToPaint.id !== 'canvas') pixelToPaint.classList.add('painted');
}
