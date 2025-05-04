// Fix for mobile vh units (addresses mobile browser address bar issues)
function setVH() {
    // This sets a CSS variable --vh to be the true viewport height
    // This addresses the issue with vh units on mobile browsers
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the height of the viewport initially
setVH();

// Update on resize and orientation change
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// Calculate device type based on screen width
const isMobile = window.innerWidth <= 768;
const isSmallMobile = window.innerWidth <= 480;

// Initialize Locomotive Scroll with device-specific settings
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    lerp: isMobile ? 0.08 : 0.05, // Smoother scrolling on mobile
    multiplier: isMobile ? 0.7 : 1, // Slower scroll speed on mobile
    smartphone: {
        smooth: true,
        breakpoint: 768
    },
    tablet: {
        smooth: true,
        breakpoint: 1024
    }
});

// GSAP Animation with viewport-based values
var tl = gsap.timeline();

// Different animations based on device size
if (isSmallMobile) {
    // Very simplified animation for small mobile
    tl.to("#page1", {
        y: "30vh",
        scale: 0.9,
        duration: 0
    })
    .to("#page1", {
        y: "0vh",
        scale: 1,
        duration: 0.5,
        delay: 0.3
    });
} else if (isMobile) {
    // Simplified animation for mobile
    tl.to("#page1", {
        y: "40vh",
        scale: 0.8,
        duration: 0
    })
    .to("#page1", {
        y: "0vh",
        scale: 1,
        duration: 0.6,
        delay: 0.4
    });
} else {
    // Full animation for desktop
    tl.to("#page1", {
        y: "100vh",
        scale: 0.6,
        duration: 0
    })
    .to("#page1", {
        y: "30vh",
        duration: 1,
        delay: 0.8
    })
    .to("#page1", {
        y: "0vh",
        rotate: 360,
        scale: 1,
        duration: 0.7
    });
}

// Make sure the heading is fully visible after animations
tl.eventCallback("onComplete", function() {
    const mirandaHeading = document.querySelector("#page1 h1");
    if (mirandaHeading) {
        mirandaHeading.style.overflow = "visible";
        
        // Update locomotive scroll to reflect new positions
        setTimeout(() => {
            scroll.update();
            
            // Small scroll to trigger browser repainting
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }, 100);
    }
});

// Handle window resize for responsive behavior
let currentWidth = window.innerWidth;
window.addEventListener('resize', function() {
    // Check if width crossed a breakpoint
    const newWidth = window.innerWidth;
    const sizeChanged = 
        (currentWidth <= 768 && newWidth > 768) || 
        (currentWidth > 768 && newWidth <= 768) ||
        (currentWidth <= 480 && newWidth > 480) ||
        (currentWidth > 480 && newWidth <= 480);
    
    currentWidth = newWidth;
    
    // Update viewport height
    setVH();
    
    // Update locomotive scroll
    scroll.update();
    
    // Only reload on major breakpoint changes (optional)
    if (sizeChanged) {
        // You could reload the page, but instead let's just update scroll
        // location.reload();
        scroll.scrollTo(0, { duration: 0, disableLerp: true });
    }
});

// Update scroll animations after content loads
window.addEventListener('load', function() {
    // Make sure all fonts and images are loaded
    setTimeout(() => {
        scroll.update();
    }, 1000);
});

// Fix for iOS devices
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.style.webkitTapHighlightColor = 'rgba(0,0,0,0)';
    
    // Extra help for iOS vh units
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            setVH();
            scroll.update();
        }, 200);
    });
}
