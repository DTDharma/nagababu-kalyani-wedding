/**
 * RSVP Handler for Wedding Invitation
 * Handles Form Submission, WhatsApp Direct Messaging & Confetti
 */

document.addEventListener('DOMContentLoaded', () => {
    initRSVP();
});

function initRSVP() {
    const form = document.getElementById('rsvp-form');
    const successBox = document.getElementById('rsvp-success');
    const guestNameInput = document.getElementById('guest-name');
    const guestCountSelect = document.getElementById('guest-count');
    const wishesInput = document.getElementById('guest-wishes');
    const whatsappBtn = document.getElementById('whatsapp-rsvp-btn');

    // Phone numbers from Telugu wedding card
    const primaryPhone = "917386612437";

    // Dynamic WhatsApp button message update as user types
    function updateWhatsAppLink() {
        if (!whatsappBtn) return;
        const name = (guestNameInput && guestNameInput.value.trim()) || "అతిథి";
        const count = (guestCountSelect && guestCountSelect.value) || "1";
        const wishes = (wishesInput && wishesInput.value.trim()) || "నూరేళ్ళ పంటగా మీ వైవాహిక జీవితం వర్ధిల్లాలి!";

        const attendingRadio = document.querySelector('input[name="attending"]:checked');
        const attendingText = attendingRadio && attendingRadio.value === 'no' 
            ? "రాలేకపోతున్నాము, క్షమించండి" 
            : "తప్పకుండా వస్తాము!";

        const customMessage = `🙏 నమస్కారం!
నాగబాబు & కళ్యాణి వివాహ ఆహ్వానానికి నా సమాధానం:
👤 పేరు: ${name}
👥 వచ్చే వారి సంఖ్య: ${count} మంది
💌 హాజరు: ${attendingText}
✨ శుభాకాంక్షలు: ${wishes}`;

        whatsappBtn.href = `https://wa.me/${primaryPhone}?text=${encodeURIComponent(customMessage)}`;
    }

    if (guestNameInput) guestNameInput.addEventListener('input', updateWhatsAppLink);
    if (guestCountSelect) guestCountSelect.addEventListener('change', updateWhatsAppLink);
    if (wishesInput) wishesInput.addEventListener('input', updateWhatsAppLink);
    const radioInputs = document.querySelectorAll('input[name="attending"]');
    radioInputs.forEach(r => r.addEventListener('change', updateWhatsAppLink));

    // Handle Form Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (guestNameInput && guestNameInput.value.trim()) || '';
            const guests = (guestCountSelect && guestCountSelect.value) || '1';
            const attendingRadio = document.querySelector('input[name="attending"]:checked');
            const attending = attendingRadio ? attendingRadio.value : 'yes';
            const wishes = (wishesInput && wishesInput.value.trim()) || '';

            // Store in LocalStorage
            const rsvpData = {
                name,
                guests,
                attending,
                wishes,
                submittedAt: new Date().toISOString()
            };

            try {
                localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpData));
            } catch (err) {}

            // Show success screen
            form.style.display = 'none';
            if (successBox) {
                successBox.classList.remove('hidden');
                successBox.style.animation = 'fadeIn 0.8s ease forwards';
            }

            // Launch celebration confetti
            launchConfetti();

            // Provide option to send via WhatsApp as well
            if (window.confirm("మీ వివరాలు నమోదు చేయబడ్డాయి! WhatsApp ద్వారా కూడా కరెడ్ల కుటుంబ సభ్యులకు సందేశం పంపాలనుకుంటున్నారా?")) {
                updateWhatsAppLink();
                if (whatsappBtn) {
                    window.open(whatsappBtn.href, '_blank', 'noopener,noreferrer');
                }
            }
        });
    }

    // Check if previously submitted
    try {
        const savedRSVP = localStorage.getItem('wedding_rsvp');
        if (savedRSVP && successBox && form) {
            const data = JSON.parse(savedRSVP);
            form.style.display = 'none';
            successBox.classList.remove('hidden');
            const welcomeText = successBox.querySelector('.telugu-text');
            if (welcomeText) {
                welcomeText.textContent = `${data.name} గారు, మీ హాజరు (${data.guests} మంది) నమోదు చేయబడింది!`;
            }
        }
    } catch (e) {}
}

/**
 * Confetti Celebration Effect
 */
function launchConfetti() {
    const colors = ['#D4AF37', '#800020', '#C41E3A', '#F5E7A3', '#FF9933', '#2E5339'];
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = '-20px';
        confetti.style.width = `${8 + Math.random() * 8}px`;
        confetti.style.height = `${8 + Math.random() * 8}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '99999';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.transition = `all ${2 + Math.random() * 2}s cubic-bezier(0.25, 1, 0.5, 1)`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 30);

        setTimeout(() => {
            if (confetti.parentNode) {
                document.body.removeChild(confetti);
            }
        }, 4000);
    }
}
