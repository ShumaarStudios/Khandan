<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Zoomable and Draggable Image</title>
<style>
  #imageContainer {
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    cursor: grab;
  }
  #zoomableImage {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform: translate(-50%, -50%) scale(1);
    touch-action: none; /* Prevent touch gestures from conflicting */
  }
</style>
</head>
<body>
<div id="imageContainer">
  <img id="zoomableImage" src="your-image.jpg" alt="Zoomable Image">
</div>
<script>
const zoomableImage = document.getElementById("zoomableImage");
const imageContainer = document.getElementById("imageContainer");

let scale = 1; // Initial zoom scale
let originX = 0; // Initial x-offset
let originY = 0; // Initial y-offset
let isDragging = false;
let startX;
let startY;

// Zoom function
function zoom(event) {
    event.preventDefault();
    const rect = zoomableImage.getBoundingClientRect();

    const offsetX = event.clientX - rect.left; // Mouse position relative to the image
    const offsetY = event.clientY - rect.top;

    const deltaScale = event.deltaY < 0 ? 1.1 : 0.9; // Zoom in or out
    const newScale = Math.min(Math.max(scale * deltaScale, 0.5), 3); // Limit zoom levels

    // Adjust origin to zoom at the mouse position
    originX = (originX - offsetX) * (newScale / scale) + offsetX;
    originY = (originY - offsetY) * (newScale / scale) + offsetY;

    scale = newScale;
    updateTransform();
}

// Update the image transformation
function updateTransform() {
    zoomableImage.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
}

// Handle mouse dragging
function startDrag(event) {
    event.preventDefault();
    isDragging = true;
    startX = (event.clientX || event.touches[0].clientX) - originX;
    startY = (event.clientY || event.touches[0].clientY) - originY;
    imageContainer.style.cursor = 'grabbing';
}

function drag(event) {
    if (isDragging) {
        event.preventDefault();
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;
        originX = clientX - startX;
        originY = clientY - startY;
        updateTransform();
    }
}

function endDrag() {
    isDragging = false;
    imageContainer.style.cursor = 'grab';
}

// Mouse and touch events
imageContainer.addEventListener('wheel', zoom);
imageContainer.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);

imageContainer.addEventListener('touchstart', startDrag);
imageContainer.addEventListener('touchmove', drag, { passive: false });
window.addEventListener('touchend', endDrag);

// Initial transform to apply the initial zoom level
updateTransform();
</script>
</body>
</html>
