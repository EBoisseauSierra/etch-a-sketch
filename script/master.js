window.onload = main;

let penColor = 'black';

function main() {
    let canvas = document.getElementById('canvas');
    let numberOfPixelsPerSide = 12;
    setPixelSizeInCss(numberOfPixelsPerSide)
    drawGrid(numberOfPixelsPerSide, numberOfPixelsPerSide);
    paintPixelsOnHover();
    resetOnClickOnBtn();
    settingsOnClickOnBtn();
    hideOverlayOnClick();
    selectColorOnClick();
}

function setPixelSizeInCss(numberOfPixelsPerSide) {
    let sizeOfPixel = 540 / numberOfPixelsPerSide;
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
    if (pixelToPaint.id !== 'canvas') {
        pixelToPaint.classList.remove('painted-red', 'painted-orange', 'painted-yellow', 'painted-green', 'painted-lblue', 'painted-dblue', 'painted-black');
        pixelToPaint.classList.add(`painted-${penColor}`);
    }
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

function settingsOnClickOnBtn() {
    let btn = document.getElementById('settings-btn');
    btn.addEventListener('click', toggleSettings);
}

function toggleSettings() {
    let settings = document.querySelector('#settings');
    settings.classList.toggle('hidden');
}

function toggleColorSettings() {
    let colorSettings = document.querySelector('#stglist-color');
    colorSettings.classList.toggle('hidden');
}

function toggleSizeSettings() {
    let sizeSettings = document.querySelector('#stglist-size');
    sizeSettings.classList.toggle('hidden');
}

function hideOverlayOnClick() {
    let overlay = document.querySelector('.overlay');
    overlay.addEventListener('click', (e) => {
        overlay.classList.toggle('hidden');
    })
    let main = document.querySelector('main');
    main.addEventListener('click', () => {
        overlay.classList.toggle('hidden');
    })
}

function selectColorOnClick() {
    let colors = document.querySelector('#stglist-color');
    colors.addEventListener('click', (e) => {
        // if one clicks on crosses, there is no target anymore
        if(e.target.id === 'color-selector') return;
        // remove previous mark
        let mark = document.getElementById('color-selector');
        mark.parentNode.removeChild(mark);
        // get color (you either click on the square or its container that possesses the data-color attribute)
        penColor = e.target.getAttribute('data-color') ? e.target.getAttribute('data-color') : e.target.parentNode.getAttribute('data-color');
        console.log(penColor);
        let newMark = document.createElement('div');
        newMark.setAttribute('id', 'color-selector');
        newMark.setAttribute('class', 'fas fa-times');
        e.target.appendChild(newMark);
    })
}
