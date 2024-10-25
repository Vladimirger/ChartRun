const canvas = document.getElementById('canvas');
const addRectangleButton = document.getElementById('addRectangle');
const addRhombusButton = document.getElementById('addRhombus');
const addParallelogramButton = document.getElementById('addParallelogram');
const addStart = document.getElementById('addStart');
const addEnd = document.getElementById('addEnd');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');

let properties = [];
let id = 1;

let scale = 1;
const scaleStep = 0.1;
const minScale = 0.2;
const maxScale = 3;

addRectangleButton.addEventListener('click', () => {
    createRectangle();
});
addRhombusButton.addEventListener('click', () => {
    createRhombus();
})
addParallelogramButton.addEventListener('click', () => {
    createParallelogram();
})
addStart.addEventListener('click', () => {
    createOval(1);
})
addEnd.addEventListener('click', () => {
    createOval(2);
})
zoomInButton.addEventListener('click', () => {
    setScale(scale + scaleStep);
});
zoomOutButton.addEventListener('click', () => {
    setScale(scale - scaleStep);
});

function addNewElement(type){
    properties.push([]);
    properties[id-1].push(id);
    // Rectangle - 1; Rhombus - 2; Parallelogram - 3; Start - 4; End - 5
    properties[id-1].push(type);
    properties[id - 1].push('');
    id++;
}

function setScale(newScale) {
    scale = Math.min(Math.max(newScale, minScale), maxScale);
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = '0 0'; //
}

function createRectangle() {
    const rect = document.createElement('div');
    rect.className = 'draggable';
    rect.id = `${id}`
    addNewElement(1);
    rect.style.width = '100px';
    rect.style.height = '100px';
    rect.style.left = '50px';
    rect.style.top = '50px';
    canvas.appendChild(rect);
    makeDraggable(rect);
    const text = document.createElement('input');
    text.id = `${(id - 1) * -1}`;
    text.addEventListener('change', (e) => {
        properties[Number(text.id) * -1 - 1][2] = text.value;
    })
    rect.appendChild(text);
}

function createRhombus() {
    const rect = document.createElement('div');
    rect.className = 'draggable';
    rect.id = `${id}`
    addNewElement(2);
    rect.style.width = '100px';
    rect.style.height = '100px';
    rect.style.left = '50px';
    rect.style.top = '50px';
    rect.style.transform = 'rotate(45deg)';
    canvas.appendChild(rect);
    makeDraggable(rect);
    const text = document.createElement('input');
    text.id = `${(id - 1) * -1}`;
    text.addEventListener('change', (e) => {
        properties[Number(text.id) * -1 - 1][2] = text.value;
    })
    rect.appendChild(text);
}

function createParallelogram() {
    const rect = document.createElement('div');
    rect.className = 'draggable';
    rect.id = `${id}`
    addNewElement(3);
    rect.style.width = '100px';
    rect.style.height = '100px';
    rect.style.left = '50px';
    rect.style.top = '50px';
    rect.style.transform = 'skew(-20deg)';
    canvas.appendChild(rect);
    makeDraggable(rect);
    const text = document.createElement('input');
    text.id = `${(id - 1) * -1}`;
    text.addEventListener('change', (e) => {
        properties[Number(text.id) * -1 - 1][2] = text.value;
    })
    rect.appendChild(text);
}
function createOval(type){
    const rect = document.createElement('div');
    rect.className = 'draggable';
    rect.style.width = '100px';
    rect.style.height = '100px';
    rect.style.left = '50px';
    rect.style.top = '50px';
    rect.style.borderRadius = '50%';
    canvas.appendChild(rect);
    makeDraggable(rect);
    const text = document.createElement('p');
    if(type === 1){
        text.innerText = 'Start';
        rect.id = `${id}`
        addNewElement(4);
    }else{
        text.innerText = 'End';
        rect.id = `${id}`
        addNewElement(5);
    }
    rect.appendChild(text);
}
function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = parseInt(element.style.left, 10);
        initialY = parseInt(element.style.top, 10);
        element.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = (e.clientX - startX) / scale;
            const dy = (e.clientY - startY) / scale;

            // Get the new potential position
            let newX = initialX + dx;
            let newY = initialY + dy;

            // Get the boundaries of the canvas and element
            const canvasRect = canvas.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            // Apply boundary checks to prevent the rectangle from leaving the canvas
            if (newX < 0) newX = 0; // Prevent going out on the left
            if (newY < 0) newY = 0; // Prevent going out on the top
            if (newX + elementRect.width > canvasRect.width) newX = canvasRect.width - elementRect.width; // Prevent going out on the right
            if (newY + elementRect.height > canvasRect.height) newY = canvasRect.height - elementRect.height; // Prevent going out on the bottom

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'move';
        }
    });
}

