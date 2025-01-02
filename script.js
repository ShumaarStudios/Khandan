// JavaScript to handle zooming and dragging of the image
const zoomableImage = document.getElementById("zoomableImage");
const imageContainer = document.getElementById("imageContainer");

let scale = 1; // Current scale of the image
let originX = 0; // Current X position of the image
let originY = 0; // Current Y position of the image
let isDragging = false; // Flag to check if dragging is active
let startX; // Initial X position when dragging starts
let startY; // Initial Y position when dragging starts

// Function to handle zooming in and out
function zoom(event) {
    event.preventDefault(); // Prevent default scroll behavior
    if (event.deltaY < 0) {
        scale *= 1.1; // Zoom in
    } else {
        scale /= 1.1; // Zoom out
    }

    // Apply transformation
    zoomableImage.style.transform = scale(${scale}) translate(${originX}px, ${originY}px);
}

// Function to start dragging
function startDrag(event) {
    isDragging = true;
    startX = event.clientX - originX; // Calculate offset
    startY = event.clientY - originY; // Calculate offset
    imageContainer.style.cursor = 'grabbing'; // Change cursor to indicate dragging
}

// Function to handle dragging
function drag(event) {
    if (isDragging) {
        originX = event.clientX - startX; // Update X position
        originY = event.clientY - startY; // Update Y position
        zoomableImage.style.transform = scale(${scale}) translate(${originX}px, ${originY}px); // Apply transformation
    }
}

// Function to end dragging
function endDrag() {
    isDragging = false; // Reset dragging flag
    imageContainer.style.cursor = 'grab'; // Reset cursor
}

// Add event listeners for zoom and drag functionalities
imageContainer.addEventListener('wheel', zoom); // Add zoom on wheel scroll
imageContainer.addEventListener('mousedown', startDrag); // Start dragging on mouse down
window.addEventListener('mousemove', drag); // Handle dragging on mouse move
window.addEventListener('mouseup', endDrag); // End dragging on mouse up