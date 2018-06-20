window.onload = main;

function main() {
    let canvas = document.getElementById('canvas');
    let numberOfPixelsPerSide = 12;
    setPixelSizeInCss(numberOfPixelsPerSide)
    drawGrid(numberOfPixelsPerSide, numberOfPixelsPerSide);
    paintPixelsOnHover();
    resetOnClickOnBtn();
}

function setPixelSizeInCss(numberOfPixelsPerSide) {
    let sizeOfPixel = 600 / numberOfPixelsPerSide;
    // first stylesheet is reset, second is master.css
    let fileMasterCSS = document.styleSheets[1];
    let rulesInCSSfile = fileMasterCSS.cssRules
    for (let cssRule of rulesInCSSfile) {
        if (cssRule.selectorText === '.pixel') {
            cssRule.style.setProperty('height', `${sizeOfPixel}px`),
            cssRule.style.setProperty('width', `${sizeOfPixel}px`);
        }
    }
}

function drawGrid(numberOfXsquares, numberOfYsquares) {
    for (var i = 0; i < numberOfXsquares * numberOfYsquares; i++) {
        let newPixel = document.createElement('span')
        newPixel.classList.add('pixel');
        canvas.appendChild(newPixel);
    }
}

function paintPixelsOnHover() {
    // use propagation from pixel to canvas for listening to events
    canvas.addEventListener('mouseover', paintPixel);
}

function paintPixel(event) {
    let pixelToPaint = event.target;
    // don't paint the canvas itself (even if it shouldn't be observable)
    if (pixelToPaint.id !== 'canvas') pixelToPaint.classList.add('painted');
}

function resetOnClickOnBtn() {
    let btn = document.getElementById('reset-btn');
    btn.addEventListener('click', resetCanvas);
}

function resetCanvas() {
    let paintedPixels = document.querySelectorAll('.painted');
    for(let paintedPixel of paintedPixels) {
        paintedPixel.classList.remove('painted');
    }
}
