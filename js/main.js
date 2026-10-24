/**
 * Main Controller for Nagababu & Kalyani Wedding Invitation
 */

document.addEventListener('DOMContentLoaded', () => {
    initGate();
    initScrollReveal();
    initShareButtons();
});

/**
 * Gate Opening Experience
 */
function initGate() {
    const gate = document.getElementById('welcome-gate');
    const openBtn = document.getElementById('open-invitation');
    const mainContent = document.getElementById('main-content');

    if (!gate || !openBtn || !mainContent) return;

    // Check if user already opened gate in this session (optional, but keep it exciting)
    openBtn.addEventListener('click', () => {
        // Trigger Music automatically on user interaction
        if (window.WeddingMusic && typeof window.WeddingMusic.startMusic === 'function') {
            window.WeddingMusic.startMusic();
        }

        // Animate gate out
        gate.style.animation = 'gateFadeOut 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards';

        // Reveal main content
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 1s ease 0.4s';
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 50);

        setTimeout(() => {
            gate.style.display = 'none';
            // Scroll smoothly to top of couple hero section
            const coupleSection = document.getElementById('couple');
            if (coupleSection) {
                coupleSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1200);
    });
}

/**
 * Intersection Observer for scroll animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-section, .reveal-child');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Add staggered delays for children if any
                    const children = entry.target.querySelectorAll('.reveal-child');
                    children.forEach((child, idx) => {
                        child.style.setProperty('--delay', `${(idx + 1) * 0.12}s`);
                        child.classList.add('is-visible');
                    });
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
}

/**
 * Share & Copy Link Handling
 */
function initShareButtons() {
    const copyBtn = document.getElementById('copy-link-btn');
    const whatsappShareBtn = document.getElementById('share-whatsapp-btn');

    const shareUrl = window.location.href.split('#')[0];
    const shareTitle = "నాగబాబు 💍 కళ్యాణి వివాహ ఆహ్వాన పత్రిక | Wedding Invitation";
    const shareText = `🙏 నమస్కారం! నాగబాబు & కళ్యాణి ల వివాహ ఆహ్వాన శుభపత్రిక. తేది: 29-10-2026, రాత్రి 7:30 ని॥లకు. వేదిక: శ్రీ వేంకటేశ్వర స్వామి ఆలయం, కేశవరం. వివరాలకు ఈ లింక్ చూడండి:\n${shareUrl}`;

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(shareUrl);
                    showToast('లింక్ కాపీ చేయబడింది! / Link copied to clipboard! 📋');
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = shareUrl;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    showToast('లింక్ కాపీ చేయబడింది! / Link copied! 📋');
                }
            } catch (err) {
                showToast('Unable to copy link.');
            }
        });
    }

    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener('click', () => {
            const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        });
    }
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
    let toast = document.getElementById('wedding-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'wedding-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '25px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        toast.style.backgroundColor = '#800020';
        toast.style.color = '#FFF8E7';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '30px';
        toast.style.boxShadow = '0 8px 25px rgba(0,0,0,0.35)';
        toast.style.fontFamily = "'Noto Sans Telugu', sans-serif";
        toast.style.fontSize = '0.95rem';
        toast.style.border = '1px solid #D4AF37';
        toast.style.zIndex = '999999';
        toast.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.style.textAlign = 'center';
        toast.style.maxWidth = '90vw';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(120px)';
    }, 3200);
}
