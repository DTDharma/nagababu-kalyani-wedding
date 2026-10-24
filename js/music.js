/**
 * Background Music Controller with Web Audio API Fallback
 * Provides traditional Indian Nadaswaram / Shehnai melody when audio file isn't present
 */

(function () {
    const musicBtn = document.getElementById('music-toggle');
    const audioElement = document.getElementById('bg-music');
    let isPlaying = false;
    let audioContext = null;
    let synthInterval = null;
    let activeNodes = [];

    // Classical Indian Wedding Raga (Raga Kalyani / Mohanam Notes in Hz)
    // Sa: 261.63 (C4), Re: 293.66 (D4), Ga: 329.63 (E4), Pa: 392.00 (G4), Dha: 440.00 (A4), Sa': 523.25 (C5)
    const ragaNotes = [
        { freq: 261.63, dur: 0.6 }, // Sa
        { freq: 293.66, dur: 0.6 }, // Ri
        { freq: 329.63, dur: 0.8 }, // Ga
        { freq: 392.00, dur: 0.9 }, // Pa
        { freq: 440.00, dur: 0.7 }, // Dha
        { freq: 523.25, dur: 1.2 }, // Sa'
        { freq: 440.00, dur: 0.6 }, // Dha
        { freq: 392.00, dur: 0.8 }, // Pa
        { freq: 329.63, dur: 0.8 }, // Ga
        { freq: 293.66, dur: 0.6 }, // Ri
        { freq: 261.63, dur: 1.4 }, // Sa
        { freq: 329.63, dur: 0.6 },
        { freq: 392.00, dur: 0.8 },
        { freq: 523.25, dur: 1.5 }
    ];

    let noteIndex = 0;

    function updateButtonUI(playing) {
        if (!musicBtn) return;
        const icon = musicBtn.querySelector('.music-icon');
        if (playing) {
            if (icon) icon.textContent = '🎵';
            musicBtn.classList.add('playing');
            musicBtn.setAttribute('title', 'Pause Music');
        } else {
            if (icon) icon.textContent = '🔇';
            musicBtn.classList.remove('playing');
            musicBtn.setAttribute('title', 'Play Music');
        }
    }

    // Play synthesized shehnai tone
    function playNote(freq, duration) {
        if (!audioContext || audioContext.state !== 'running') return;

        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        // Shehnai has rich harmonic content, sawtooth filtered works wonderfully
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        // Lowpass filter for warm acoustic feel
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, audioContext.currentTime);

        // Natural envelope (attack, decay, sustain, release)
        gain.gain.setValueAtTime(0.001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);

        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + duration);

        activeNodes.push(osc);
    }

    function startSynthMelody() {
        if (!window.AudioContext && !window.webkitAudioContext) return;
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (synthInterval) clearInterval(synthInterval);

        function tick() {
            const current = ragaNotes[noteIndex];
            playNote(current.freq, current.dur);
            noteIndex = (noteIndex + 1) % ragaNotes.length;
        }

        tick();
        synthInterval = setInterval(tick, 850);
    }

    function stopSynthMelody() {
        if (synthInterval) {
            clearInterval(synthInterval);
            synthInterval = null;
        }
        activeNodes.forEach(node => {
            try { node.stop(); } catch (e) {}
        });
        activeNodes = [];
    }

    function playMusic() {
        isPlaying = true;
        updateButtonUI(true);

        if (audioElement && audioElement.currentSrc) {
            const playPromise = audioElement.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Audio file failed or missing, use synthetic melody
                    startSynthMelody();
                });
            }
        } else {
            startSynthMelody();
        }
    }

    function pauseMusic() {
        isPlaying = false;
        updateButtonUI(false);
        if (audioElement) {
            audioElement.pause();
        }
        stopSynthMelody();
    }

    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }

    // Expose globally for gate open trigger
    window.WeddingMusic = {
        startMusic: () => {
            if (!isPlaying) {
                playMusic();
            }
        },
        toggleMusic: toggleMusic,
        pauseMusic: pauseMusic
    };
})();
