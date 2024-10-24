document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('canvas');
    const addRectangleButton = document.getElementById('addRectangle');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');

    let scale = 1;
    const scaleStep = 0.1;
    const minScale = 0.2;
    const maxScale = 3;

    addRectangleButton.addEventListener('click', () => {
        createRectangle();
    });

    zoomInButton.addEventListener('click', () => {
        setScale(scale + scaleStep);
    });

    zoomOutButton.addEventListener('click', () => {
        setScale(scale - scaleStep);
    });

    function setScale(newScale) {
        scale = Math.min(Math.max(newScale, minScale), maxScale);
        canvas.style.transform = `scale(${scale})`;
        canvas.style.transformOrigin = '0 0'; //
    }

    function createRectangle() {
        const rect = document.createElement('div');
        rect.className = 'draggable';
        rect.style.width = '100px';
        rect.style.height = '100px';
        rect.style.left = '50px';
        rect.style.top = '50px';

        canvas.appendChild(rect);
        makeDraggable(rect);
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
});
