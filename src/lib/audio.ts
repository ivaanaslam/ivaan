let audioCtx: AudioContext | null = null;
let intervalId: any = null;

export const startAlarm = () => {
  if (intervalId) return; // Already playing
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  const playBeep = () => {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.setValueAtTime(440, audioCtx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  };

  playBeep();
  intervalId = setInterval(playBeep, 500);
};

export const stopAlarm = () => {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
};
