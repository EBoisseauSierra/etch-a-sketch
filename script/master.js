window.onload = main;

let penColor = 'black';
let numberOfPixelsPerSide = 12;

function main() {
    let canvas = document.getElementById('canvas');
    drawGrid(numberOfPixelsPerSide);
    paintPixelsOnHover();
    resetOnClickOnBtn();
    settingsOnClickOnBtn();
    hideOverlayOnClick();
    selectColorOnClick();
    selectSizeOnClick();
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

function drawGrid(numberOfPixelsPerSide) {
    resetCanvas();
    setPixelSizeInCss(numberOfPixelsPerSide);
    for (var i = 0; i < numberOfPixelsPerSide * numberOfPixelsPerSide; i++) {
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
    btn.addEventListener('click', eraseCanvas);
}

function eraseCanvas() {
    let paints = ['painted-red', 'painted-orange', 'painted-yellow', 'painted-green', 'painted-lblue', 'painted-dblue', 'painted-black'];
    for (let i = 0, l = paints.length; i < l; i++) {
        let paintedPixels = document.querySelectorAll(`.${paints[i]}`);
        for(let paintedPixel of paintedPixels) {
            paintedPixel.classList.remove(paints[i]);
        }
    }
}

function resetCanvas() {
    let canvas = document.getElementById('canvas');
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
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

function selectSizeOnClick() {
    let sizes = document.querySelector('#stglist-size');
    sizes.addEventListener('click', (e) => {
        // do nothing if clicked on current size
        if(e.target.getAttribute('data-ppside') === numberOfPixelsPerSide) return;
        // remove previous selected size
        let previousSize = document.querySelector('.selected-size');
        previousSize.classList.remove('selected-size');
        // get size
        numberOfPixelsPerSide = e.target.getAttribute('data-ppside');
        e.target.classList.add('selected-size');
        drawGrid(numberOfPixelsPerSide);
    })

}
