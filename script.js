const zoomableImage = document.getElementById("zoomableImage");
const imageContainer = document.getElementById("imageContainer");

let scale = 1;
let originX = 0;
let originY = 0;
let isDragging = false;
let startX;
let startY;

function zoom(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        scale *= 1.1; // zoom in
    } else {
        scale /= 1.1; // zoom out
    }

    zoomableImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
}

function startDrag(event) {
    isDragging = true;
    startX = event.clientX - originX;
    startY = event.clientY - originY;
    imageContainer.style.cursor = 'grabbing'; // Change cursor to indicate dragging
}

function drag(event) {
    if (isDragging) {
        originX = event.clientX - startX;
        originY = event.clientY - startY;
        zoomableImage.style.transform = `scale(${scale}) translate(${originX}px, ${originY}px)`;
    }
}

function endDrag() {
    isDragging = false;
    imageContainer.style.cursor = 'grab'; // Reset cursor
}

imageContainer.addEventListener('wheel', zoom);
imageContainer.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', endDrag);