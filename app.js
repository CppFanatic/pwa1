// PWA Installation and Service Worker Registration
let deferredPrompt;

// Install button functionality
const installBtn = document.getElementById('installBtn');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    // Show the install button
    installBtn.style.display = 'block';
});

// Handle install button click
installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the deferredPrompt so it can only be used once
        deferredPrompt = null;
        // Hide the install button
        installBtn.style.display = 'none';
    }
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    installBtn.style.display = 'none';
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add click animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('click', () => {
            feature.style.transform = 'scale(0.95)';
            setTimeout(() => {
                feature.style.transform = '';
            }, 150);
        });
    });
    
    // Add greeting animation
    const greeting = document.querySelector('.greeting-card h2');
    if (greeting) {
        greeting.style.opacity = '0';
        greeting.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            greeting.style.transition = 'all 0.6s ease';
            greeting.style.opacity = '1';
            greeting.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
    // You could show a notification here
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    // You could show a notification here
});
