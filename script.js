document.addEventListener('DOMContentLoaded', () => {
    const beforeAfterContainer = document.querySelector('.before-after-container');
    const afterImage = document.querySelector('.before-after-container .after-image');
    let sliderHandle; // This will be created dynamically
    let isDragging = false;

    // Function to create the slider handle dynamically
    function createSliderHandle() {
        if (!beforeAfterContainer) return; // Exit if container not found

        // Check if handle already exists to prevent duplicates
        if (beforeAfterContainer.querySelector('.slider-handle')) {
            sliderHandle = beforeAfterContainer.querySelector('.slider-handle');
            return;
        }

        sliderHandle = document.createElement('div');
        sliderHandle.classList.add('slider-handle');
        beforeAfterContainer.appendChild(sliderHandle);

        // Add event listeners to the handle for dragging
        sliderHandle.addEventListener('mousedown', startDragging);
        sliderHandle.addEventListener('touchstart', startDragging, { passive: true });
    }

    // Initialize the slider handle
    createSliderHandle();

    // Function to set the initial position of the slider
    function setInitialSliderPosition() {
        if (beforeAfterContainer && afterImage && sliderHandle) {
            const initialX = beforeAfterContainer.offsetWidth / 2;
            updateSlider(initialX);
        }
    }

    // Update slider position based on mouse/touch X coordinate
    function updateSlider(x) {
        if (!beforeAfterContainer || !afterImage || !sliderHandle) return;

        const containerRect = beforeAfterContainer.getBoundingClientRect();
        let newX = x - containerRect.left;

        // Clamp the newX value within the container bounds
        newX = Math.max(0, Math.min(newX, containerRect.width));

        // Update the clip-path for the after image
        afterImage.style.clipPath = `inset(0 0 0 ${newX}px)`;

        // Update the handle position
        sliderHandle.style.left = `${newX}px`;
    }

    // Event handlers for dragging
    function startDragging(e) {
        isDragging = true;
        beforeAfterContainer.classList.add('dragging'); // Add class for styling feedback
        e.preventDefault(); // Prevent default browser actions like image dragging
        if (e.type === 'touchstart') {
            document.addEventListener('touchmove', onDragging, { passive: false });
            document.addEventListener('touchend', stopDragging);
        } else {
            document.addEventListener('mousemove', onDragging);
            document.addEventListener('mouseup', stopDragging);
        }
    }

    function onDragging(e) {
        if (!isDragging) return;

        let clientX;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            e.preventDefault(); // Prevent scrolling while dragging on touch devices
        } else {
            clientX = e.clientX;
        }
        updateSlider(clientX);
    }

    function stopDragging() {
        isDragging = false;
        beforeAfterContainer.classList.remove('dragging');
        document.removeEventListener('mousemove', onDragging);
        document.removeEventListener('mouseup', stopDragging);
        document.removeEventListener('touchmove', onDragging);
        document.removeEventListener('touchend', stopDragging);
    }

    // Initial setup and resize handling
    window.addEventListener('load', setInitialSliderPosition);
    window.addEventListener('resize', setInitialSliderPosition);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
