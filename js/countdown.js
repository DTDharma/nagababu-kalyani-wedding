/**
 * Live Countdown Timer to Wedding Muhurtham
 * Date: 29th October 2026, 7:30 PM IST (UTC+05:30)
 */

(function () {
    const weddingDate = new Date('2026-10-29T19:30:00+05:30').getTime();

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function formatNumber(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';

            const countdownHeader = document.querySelector('#countdown .section-title');
            if (countdownHeader) {
                countdownHeader.innerHTML = `
                    <span class="telugu-heading">వివాహ మహోత్సవం ప్రారంభమైనది! 🎉</span>
                    <span class="english-subtitle">The Wedding Celebrations Have Begun!</span>
                `;
            }
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (daysEl.textContent !== formatNumber(days)) daysEl.textContent = formatNumber(days);
        if (hoursEl.textContent !== formatNumber(hours)) hoursEl.textContent = formatNumber(hours);
        if (minutesEl.textContent !== formatNumber(minutes)) minutesEl.textContent = formatNumber(minutes);
        daysEl.textContent = formatNumber(days);
        hoursEl.textContent = formatNumber(hours);
        minutesEl.textContent = formatNumber(minutes);
        secondsEl.textContent = formatNumber(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();
