const zoomableImage = document.getElementById("zoomableImage");
const imageContainer = document.getElementById("imageContainer");

let scale = 2; // Set initial scale to 2 for zoomed-in effect
let originX = 0;
let originY = 0;
let isDragging = false;
let startX;
let startY;

// Zoom function
function zoom(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        scale *= 1.1; // zoom in
    } else {
        scale /= 1.1; // zoom out
    }

    // Prevent scale from being too small or too large
    scale = Math.min(Math.max(scale, 1), 5); // Limit zoom scale between 1x and 5x
    updateTransform();
}

// Update the image transformation
function updateTransform() {
    zoomableImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
}

// Handle mouse dragging
function startDrag(event) {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX - originX;
    startY = event.clientY || event.touches[0].clientY - originY;
    imageContainer.style.cursor = 'grabbing'; // Change cursor to indicate dragging
}

function drag(event) {
    if (isDragging) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        originX = clientX - startX;
        originY = clientY - startY;
        updateTransform();
    }
}

function endDrag() {
    isDragging = false;
    imageContainer.style.cursor = 'grab'; // Reset cursor
}

// Mouse events
imageContainer.addEventListener('wheel', zoom);
imageContainer.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);

// Touch events
imageContainer.addEventListener('touchstart', startDrag);
imageContainer.addEventListener('touchmove', drag);
window.addEventListener('touchend', endDrag);

// Prevent default touch actions to avoid scrolling
imageContainer.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

// Initial transform to apply the initial zoom level
updateTransform();
