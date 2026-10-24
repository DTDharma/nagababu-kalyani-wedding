/** Background music controls. Playback starts only from an explicit user action. */
(function () {
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let playRequest = 0;

    function setPlaying(playing) {
        if (!musicBtn) return;
        const icon = musicBtn.querySelector('.music-icon');
        if (icon) icon.textContent = playing ? '♫' : '♪';
        musicBtn.classList.toggle('playing', playing);
        musicBtn.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music');
        musicBtn.setAttribute('title', playing ? 'Pause Music' : 'Play Music');
    }

    async function startMusic() {
        if (!audio) return false;
        const request = ++playRequest;
        audio.loop = true;
        try {
            await audio.play();
            if (request === playRequest) setPlaying(true);
            return true;
        } catch (error) {
            if (request === playRequest) setPlaying(false);
            // A rejected play request is expected when browser policy or the network blocks playback.
            console.info('Wedding music could not start. Use the music button to try again.', error);
            return false;
        }
    }

    function pauseMusic() {
        ++playRequest;
        if (audio) audio.pause();
        setPlaying(false);
    }

    function toggleMusic() {
        if (audio && !audio.paused) pauseMusic();
        else startMusic();
    }

    if (audio) {
        audio.addEventListener('play', () => setPlaying(true));
        audio.addEventListener('pause', () => setPlaying(false));
        audio.addEventListener('error', () => {
            setPlaying(false);
            console.error('Wedding music file failed to load:', audio.currentSrc || audio.src);
        });
    }
    musicBtn?.addEventListener('click', toggleMusic);

    window.WeddingMusic = { startMusic, pauseMusic, toggleMusic };
    setPlaying(false);
})();
