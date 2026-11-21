// ==========================================================================
// SCI-FI PROCEDURAL SOUND EFFECTS ENGINE (Web Audio API)
// 100% zero external audio files required, zero latency, ultra-lightweight.
// ==========================================================================

let audioCtx = null;
let isMuted = false;
let ambienceSource = null;
let ambienceGain = null;
let lastHoverTime = 0;

// Initialize or get the shared AudioContext
function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Check saved mute preference
try {
  const saved = localStorage.getItem('sound_enabled');
  if (saved !== null) {
    isMuted = saved === 'false';
  }
} catch {
  // Ignore local storage error
}

export const soundEffects = {
  // Toggle mute state
  toggleMute() {
    isMuted = !isMuted;
    try {
      localStorage.setItem('sound_enabled', String(!isMuted));
    } catch {}
    if (isMuted && ambienceGain) {
      this.stopFireAmbience();
    }
    return !isMuted;
  },

  isSoundEnabled() {
    return !isMuted;
  },

  // 1. Element Tile Hover (High-tech gentle chirping blip)
  playHover() {
    if (isMuted) return;
    const now = Date.now();
    // Throttle hover sounds so rapid gliding across 20 tiles remains pleasant
    if (now - lastHoverTime < 45) return;
    lastHoverTime = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(750, t);
    osc.frequency.exponentialRampToValueAtTime(1150, t + 0.04);

    gain.gain.setValueAtTime(0.04, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.045);
  },

  // 2. Fire Ignition Burst (When ElementModal opens with the flaming border)
  playFireIgnition() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;

    // --- Sub-layer A: Warm Sub-bass ignition thump ---
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(130, t);
    subOsc.frequency.exponentialRampToValueAtTime(45, t + 0.35);

    subGain.gain.setValueAtTime(0.22, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(t);
    subOsc.stop(t + 0.4);

    // --- Sub-layer B: Filtered White Noise Roaring Flame Whoosh ---
    const bufferSize = Math.floor(ctx.sampleRate * 0.55); // 0.55s buffer
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 2.2;
    filter.frequency.setValueAtTime(260, t);
    filter.frequency.exponentialRampToValueAtTime(850, t + 0.12);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.5);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.22, t + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.52);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(t);
    noise.stop(t + 0.55);
  },

  // 3. Tab Switch (Cybernetic Hologram Beep)
  playTabSwitch() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.setValueAtTime(1320, t + 0.035);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.085);
  },

  // 4. Navigate Next/Previous Element (Sleek sci-fi slide whoosh)
  playNavigate() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.1);

    gain.gain.setValueAtTime(0.07, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.11);
  },

  // 5. Modal Close / Dismiss (Descending power-down swoosh)
  playModalClose() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(520, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t);
    filter.frequency.exponentialRampToValueAtTime(180, t + 0.2);

    gain.gain.setValueAtTime(0.09, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.23);
  },

  // 6. Specimen Photo Zoom / Lightbox Open (Hologram harmonic chime)
  playZoom() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    [523.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25 + i * 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    });
  },

  // 7. Ambient Plasma & Fire Hum (Soft background presence when modal is open)
  startFireAmbience() {
    if (isMuted || ambienceGain) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      ambienceGain = ctx.createGain();
      ambienceGain.gain.setValueAtTime(0.001, t);
      ambienceGain.gain.linearRampToValueAtTime(0.045, t + 0.3); // very subtle

      // Dual low-frequency plasma oscillators with subtle beat frequency
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      osc1.type = 'sine';
      osc1.frequency.value = 55; // 55Hz sub hum
      osc2.type = 'sine';
      osc2.frequency.value = 110; // 110Hz harmonic

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 180;

      osc1.connect(lowpass);
      osc2.connect(lowpass);
      lowpass.connect(ambienceGain);
      ambienceGain.connect(ctx.destination);

      osc1.start(t);
      osc2.start(t);

      ambienceSource = { osc1, osc2 };
    } catch {
      // Audio autoplay or web audio context error
    }
  },

  stopFireAmbience() {
    if (!ambienceGain || !audioCtx) return;
    try {
      const t = audioCtx.currentTime;
      ambienceGain.gain.linearRampToValueAtTime(0.0001, t + 0.15);
      setTimeout(() => {
        if (ambienceSource) {
          try {
            ambienceSource.osc1.stop();
            ambienceSource.osc2.stop();
          } catch {}
          ambienceSource = null;
        }
        ambienceGain = null;
      }, 160);
    } catch {
      ambienceGain = null;
      ambienceSource = null;
    }
  }
};
