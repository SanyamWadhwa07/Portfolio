"use client";

import { useCallback, useState, useEffect } from "react";

// Web Audio API based sound effects - no external dependencies
export function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };

    document.addEventListener("click", initAudio);
    document.addEventListener("keydown", initAudio);

    return () => {
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };
  }, [audioContext]);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine", volume: number = 0.1) => {
      if (!soundEnabled || !audioContext) return;

      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (e) {
        // Audio context not ready
      }
    },
    [soundEnabled, audioContext]
  );

  const playHover = useCallback(() => {
    // Soft high-pitched blip
    playTone(800, 0.05, "sine", 0.03);
  }, [playTone]);

  const playClick = useCallback(() => {
    // Satisfying click sound
    playTone(600, 0.08, "square", 0.05);
    setTimeout(() => playTone(900, 0.05, "sine", 0.03), 30);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    // Ascending notes
    playTone(523, 0.1, "sine", 0.05);
    setTimeout(() => playTone(659, 0.1, "sine", 0.05), 100);
    setTimeout(() => playTone(784, 0.15, "sine", 0.05), 200);
  }, [playTone]);

  const playWhoosh = useCallback(() => {
    if (!soundEnabled || !audioContext) return;

    try {
      // White noise burst for whoosh effect
      const bufferSize = audioContext.sampleRate * 0.2;
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const source = audioContext.createBufferSource();
      source.buffer = buffer;

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

      const filter = audioContext.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(2000, audioContext.currentTime);
      filter.frequency.linearRampToValueAtTime(8000, audioContext.currentTime + 0.2);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      source.start();
    } catch (e) {
      // Audio context not ready
    }
  }, [soundEnabled, audioContext]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  return {
    playHover,
    playClick,
    playSuccess,
    playWhoosh,
    soundEnabled,
    toggleSound,
  };
}
