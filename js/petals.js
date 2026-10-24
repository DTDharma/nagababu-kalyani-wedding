/**
 * Floating Petals Shower Animation (Rose & Marigold Petals)
 */

(function () {
    const container = document.getElementById('petals-container');
    if (!container) return;

    // SVG petal shapes
    const petalSVGs = [
        // Rose petal (red/deep pink)
        `<svg viewBox="0 0 30 30" width="100%" height="100%">
            <path d="M15,2 C8,7 3,14 4,21 C5,27 12,29 17,27 C22,25 27,19 25,11 C23,5 18,2 15,2 Z" fill="#C41E3A" opacity="0.82"/>
        </svg>`,
        // Marigold petal (golden yellow/orange)
        `<svg viewBox="0 0 30 30" width="100%" height="100%">
            <path d="M15,3 C10,9 6,15 8,22 C10,27 16,28 20,25 C24,22 25,15 22,8 C20,4 17,3 15,3 Z" fill="#FF9933" opacity="0.85"/>
        </svg>`,
        // Golden sparkle petal
        `<svg viewBox="0 0 25 25" width="100%" height="100%">
            <circle cx="12.5" cy="12.5" r="7" fill="#D4AF37" opacity="0.75"/>
            <circle cx="12.5" cy="12.5" r="4" fill="#F5E7A3" opacity="0.9"/>
        </svg>`,
        // Soft pink rose petal
        `<svg viewBox="0 0 30 30" width="100%" height="100%">
            <path d="M14,3 C7,8 4,16 6,22 C8,27 15,28 19,25 C23,21 24,14 21,7 C19,4 16,3 14,3 Z" fill="#E86F88" opacity="0.8"/>
        </svg>`
    ];

    const maxPetals = 22; // smooth performance on mobile and desktop
    let currentPetals = 0;

    function createPetal() {
        if (currentPetals >= maxPetals || document.hidden) return;

        const petal = document.createElement('div');
        petal.className = 'floating-petal';
        petal.innerHTML = petalSVGs[Math.floor(Math.random() * petalSVGs.length)];

        // Random properties
        const startX = Math.random() * 100; // 0 to 100vw
        const size = 18 + Math.random() * 18; // 18px to 36px
        const duration = 6 + Math.random() * 7; // 6s to 13s
        const driftX = (Math.random() - 0.5) * 160; // -80px to +80px drift
        const rotZ = 180 + Math.random() * 360;
        const rotX = Math.random() * 360;

        petal.style.position = 'fixed';
        petal.style.top = '-40px';
        petal.style.left = `${startX}vw`;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.pointerEvents = 'none';
        petal.style.zIndex = '9999';
        petal.style.willChange = 'transform, opacity';
        petal.style.setProperty('--drift-x', `${driftX}px`);
        petal.style.setProperty('--rot-z', `${rotZ}deg`);
        petal.style.setProperty('--rot-x', `${rotX}deg`);
        petal.style.animation = `petalFall ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;

        container.appendChild(petal);
        currentPetals++;

        // Remove after animation
        setTimeout(() => {
            if (petal.parentNode === container) {
                container.removeChild(petal);
            }
            currentPetals--;
        }, duration * 1000);
    }

    // Spawn petals periodically
    setInterval(createPetal, 450);

    // Initial batch
    for (let i = 0; i < 6; i++) {
        setTimeout(createPetal, i * 200);
    }
})();
