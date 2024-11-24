const canvas = document.getElementById('canvas');
const addRectangleButton = document.getElementById('addRectangle');
const addRhombusButton = document.getElementById('addRhombus');
const addParallelogramButton = document.getElementById('addParallelogram');
const addStart = document.getElementById('addStart');
const addEnd = document.getElementById('addEnd');
const zoomInButton = document.getElementById('zoomIn');
const zoomOutButton = document.getElementById('zoomOut');

let start = false;

let properties = [];
let id = 1;
let curr = [];
const connections = new Map();

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
    if(start)return;
    createOval(1);
    start = true;
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
document.addEventListener('click', function(event) {
    if (!event.target.classList.contains('circle')) {
        curr = [];
    }
});
function addToConnections(key, value, pos1){
    if (!connections.has(key)) {
        // If the key doesn't exist, create a new Set for it
        connections.set(key, new Set());
    }

    // Add the value to the Set associated with the key
    console.log(pos1);
    if(pos1 == "left")connections.get(key).add(value * 10000);
    else connections.get(key).add(value);
}
function addNewElement(type){
    properties.push([]);
    properties[id-1].push(id);
    // Rectangle - 1; Rhombus - 2; Parallelogram - 3; Start - 4; End - 5
    properties[id-1].push(type);
    properties[id - 1].push('');
    id++;
}

function addConnection(s){
    let num = 0;
    let pos = "";
    for(let i = 0; i < s.length; i++){
        if(s[i] === ' ')continue;
        if(pos.length === i){
            pos += s[i];
        }else{
            num *= 10;
            num += s[i] - '0';
        }
    }

    if (curr.length === 2) {
        addToConnections(curr[0], num, curr[1]);
        console.log(properties);
        curr = [];
    } else {
        curr.push(num);
        curr.push(pos);
    }
}
function createCircle(rect, type){
    const circle = document.createElement('div');
    circle.className = 'circle';
    rect.appendChild(circle);
    Object.assign(circle.style, {
        position: 'absolute',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        backgroundColor: 'red'
    });
    //1 - top; 2 - bottom; 3 - left; 4 - right
    if(type === 1){
        Object.assign(circle.style, {
            top: '-10px', /* Adjust for half the circle's height */
            left: '50%',
            transform: 'translateX(-50%)'
        })
    }else if(type === 2){
        Object.assign(circle.style, {
            bottom: '-10px', /* Adjust for half the circle's height */
            left: '50%',
            transform: 'translateX(-50%)'
        })
    }else if(type === 3){
        Object.assign(circle.style, {
            left: '-10px', /* Adjust for half the circle's height */
            top: '50%',
            transform: 'translateY(-50%)'
        })
    }else if(type === 4){
        Object.assign(circle.style, {
            top: '50%',
            right: '-10px',
            transform: 'translateY(-50%)'
        })
    }
    circle.addEventListener('click', (e) => {
        addConnection(circle.id);
    })
    return circle;
}
function addCircles(type, rect){
    if(type === 2){
        const t = createCircle(rect, 1);
        const l = createCircle(rect, 3);
        const r = createCircle(rect, 4);
        t.style.left = '0';
        l.style.top = '100%';
        r.style.left = '100%';
        r.style.top = '0';
        t.id = `top ${id-1}`;
        l.id = `left ${id-1}`;
        r.id = `right ${id-1}`;
    }else if(type === 5){
        const t = createCircle(rect, 1);
        t.id = `top ${id-1}`;
    }else if(type === 4){
        const b = createCircle(rect, 2);
        b.id = `bottom ${id-1}`;
    }else{
        const t = createCircle(rect, 1);
        const b = createCircle(rect, 2);
        t.id = `top ${id-1}`;
        b.id = `bottom ${id-1}`;
        if(type === 3){
            t.style.transform = 'skew(20deg)';
            b.style.transform = 'skew(20deg)';
            t.style.left = '40%';
            b.style.left = '40%';
        }
    }
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
    addCircles(1, rect);
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
    addCircles(2, rect);
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
    addCircles(3, rect);
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
        addCircles(4, rect);
    }else{
        text.innerText = 'End';
        rect.id = `${id}`
        
        addNewElement(5);
        addCircles(5, rect);
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

