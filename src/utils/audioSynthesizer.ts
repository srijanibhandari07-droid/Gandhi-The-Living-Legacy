/**
 * Web Audio API Acoustic Soundscape & Sound Effects Engine
 * Pure synthesized audio ensuring 100% reliability with zero external asset dependencies.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private ambientNodes: AudioNode[] = [];
  private volume = 0.25;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic pen-on-paper drawing sound effect
  public playPenScratch(speed: number = 1) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * (0.04 / speed);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      // Pinkish/brown noise with granular friction bursts
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.3 * (1 - i / bufferSize);
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      // Bandpass filter to match pen nib resonance on paper grain (~1.8kHz - 3.2kHz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200 + Math.random() * 800, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (0.035 / speed));

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + (0.04 / speed));
    } catch {
      // Audio not permitted or suspended, ignore gracefully
    }
  }

  // Meditative harmonic tanpura drone (root C# / 138Hz + fifth G# / 207Hz + octave C# / 277Hz)
  public toggleAmbientMusic(enable?: boolean): boolean {
    try {
      this.initCtx();
      if (!this.ctx) return false;

      const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;

      if (!shouldPlay) {
        this.stopAmbientMusic();
        return false;
      }

      if (this.isAmbientPlaying) return true;

      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 2.5);
      masterGain.connect(this.ctx.destination);
      this.ambientGain = masterGain;

      // Base frequencies corresponding to classic meditative modal drone
      const freqs = [138.59, 207.65, 277.18, 415.30];

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Gentle subtle vibrato / shimmer
        const lfo = this.ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.08, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        this.ambientNodes.push(lfo, lfoGain);

        // Filter to keep acoustic warmth
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        const voiceGain = this.ctx.createGain();
        voiceGain.gain.setValueAtTime(0.12 / (idx + 1), this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(voiceGain);
        voiceGain.connect(masterGain);

        osc.start();
        this.ambientNodes.push(osc, filter, voiceGain);
      });

      this.ambientNodes.push(masterGain);
      this.isAmbientPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stopAmbientMusic() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.ambientNodes.forEach(node => {
            try {
              if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
                (node as AudioScheduledSourceNode).stop();
              }
              node.disconnect();
            } catch {
              // Node cleanup
            }
          });
          this.ambientNodes = [];
          this.isAmbientPlaying = false;
        }, 1300);
      } catch {
        this.isAmbientPlaying = false;
      }
    }
  }

  public setAmbientVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  // Gentle bell sound for milestone completions and choices
  public playChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08); // A5

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 1.8);
    } catch {
      // Ignore
    }
  }
}

export const soundscape = new SoundscapeEngine();
