// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

// Check if device is mobile
const isMobile = window.innerWidth <= 768;

// GSAP Animation
var tl = gsap.timeline();

// Different animations for mobile vs desktop
if (isMobile) {
    // Simplified animation for mobile
    tl.to("#page1", {
        y: "50vh",
        scale: 0.8,
        duration: 0
    })
    .to("#page1", {
        y: "0vh",
        scale: 1,
        duration: 0.7,
        delay: 0.5
    });
} else {
    // Original desktop animation
    tl.to("#page1", {
        y: "100vh",
        scale: 0.6,
        duration: 0
    })
    .to("#page1", {
        y: "30vh",
        duration: 1,
        delay: 1
    })
    .to("#page1", {
        y: "0vh",
        rotate: 360,
        scale: 1,
        duration: 0.7
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    // Refresh Locomotive Scroll on resize
    scroll.update();
    
    // Check if we need to reload for major size changes (optional)
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
        // Only reload if crossing the mobile threshold
        location.reload();
    }
});

// Update scroll animations for better mobile performance
function updateScroller() {
    scroll.update();
}

// Call this periodically or after content changes
setTimeout(updateScroller, 1000);

// Fix for mobile vh units (addresses mobile browser address bar issues)
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the height of the viewport
setVH();
window.addEventListener('resize', setVH);
