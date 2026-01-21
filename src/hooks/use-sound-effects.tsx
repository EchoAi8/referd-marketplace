import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

interface SoundEffectsContextType {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggle: () => void;
  playClick: () => void;
  playHover: () => void;
  playWhoosh: () => void;
  playSuccess: () => void;
  playToggle: () => void;
  // Haptic pulse tracking
  lastSoundTime: number;
  triggerHaptic: () => void;
}

const SoundEffectsContext = createContext<SoundEffectsContextType | undefined>(undefined);

export const useSoundEffects = () => {
  const context = useContext(SoundEffectsContext);
  if (!context) {
    throw new Error("useSoundEffects must be used within a SoundEffectsProvider");
  }
  return context;
};

// Web Audio API sound generator
class SoundGenerator {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  // Soft click sound
  click() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }

  // Subtle hover sound
  hover() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.03);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }

  // Whoosh transition sound
  whoosh() {
    const ctx = this.getContext();
    
    // Create noise buffer
    const bufferSize = ctx.sampleRate * 0.3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter for swoosh effect
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.15);
    filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.3);
    filter.Q.value = 1;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    whiteNoise.start(ctx.currentTime);
    whiteNoise.stop(ctx.currentTime + 0.3);
  }

  // Success chime
  success() {
    const ctx = this.getContext();
    
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = "sine";

      const startTime = ctx.currentTime + i * 0.08;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.06, startTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    });
  }

  // Toggle switch sound
  toggle() {
    const ctx = this.getContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);
    oscillator.type = "triangle";

    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }
}

interface SoundEffectsProviderProps {
  children: React.ReactNode;
}

export const SoundEffectsProvider = ({ children }: SoundEffectsProviderProps) => {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sound-effects");
      return stored === null ? false : stored === "true";
    }
    return false;
  });
  
  // Track when sounds play for haptic feedback
  const [lastSoundTime, setLastSoundTime] = useState(0);

  const soundGenerator = useRef<SoundGenerator | null>(null);

  useEffect(() => {
    soundGenerator.current = new SoundGenerator();
  }, []);

  useEffect(() => {
    localStorage.setItem("sound-effects", String(enabled));
  }, [enabled]);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);
  
  const triggerHaptic = useCallback(() => {
    setLastSoundTime(Date.now());
    // Real haptic vibration on mobile devices
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(15); // Short 15ms vibration
    }
  }, []);

  const playClick = useCallback(() => {
    if (enabled && soundGenerator.current) {
      soundGenerator.current.click();
      triggerHaptic();
    }
  }, [enabled, triggerHaptic]);

  const playHover = useCallback(() => {
    if (enabled && soundGenerator.current) {
      soundGenerator.current.hover();
      triggerHaptic();
    }
  }, [enabled, triggerHaptic]);

  const playWhoosh = useCallback(() => {
    if (enabled && soundGenerator.current) {
      soundGenerator.current.whoosh();
      triggerHaptic();
    }
  }, [enabled, triggerHaptic]);

  const playSuccess = useCallback(() => {
    if (enabled && soundGenerator.current) {
      soundGenerator.current.success();
      triggerHaptic();
    }
  }, [enabled, triggerHaptic]);

  const playToggle = useCallback(() => {
    if (enabled && soundGenerator.current) {
      soundGenerator.current.toggle();
      triggerHaptic();
    }
  }, [enabled, triggerHaptic]);

  return (
    <SoundEffectsContext.Provider
      value={{
        enabled,
        setEnabled,
        toggle,
        playClick,
        playHover,
        playWhoosh,
        playSuccess,
        playToggle,
        lastSoundTime,
        triggerHaptic,
      }}
    >
      {children}
    </SoundEffectsContext.Provider>
  );
};
