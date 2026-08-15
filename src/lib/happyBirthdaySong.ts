const NOTE_FREQ: Record<string, number> = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
};

/** Classic "Happy Birthday" melody — note name and duration in seconds. */
const MELODY: [string, number][] = [
  ["G4", 0.35],
  ["G4", 0.15],
  ["A4", 0.5],
  ["G4", 0.5],
  ["C5", 0.5],
  ["B4", 1.0],
  ["G4", 0.35],
  ["G4", 0.15],
  ["A4", 0.5],
  ["G4", 0.5],
  ["D5", 0.5],
  ["C5", 1.0],
  ["G4", 0.35],
  ["G4", 0.15],
  ["G5", 0.5],
  ["E5", 0.5],
  ["C5", 0.5],
  ["B4", 0.5],
  ["A4", 1.0],
  ["F5", 0.35],
  ["F5", 0.15],
  ["E5", 0.5],
  ["C5", 0.5],
  ["D5", 0.5],
  ["C5", 1.5],
];

let audioContext: AudioContext | null = null;
let playing = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playNote(
  ctx: AudioContext,
  frequency: number,
  startTime: number,
  duration: number
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.05);
}

export function isHappyBirthdayPlaying(): boolean {
  return playing;
}

export function getHappyBirthdayDurationMs(): number {
  return MELODY.reduce((sum, [, d]) => sum + d, 0) * 1000 + 200;
}

export async function playHappyBirthday(): Promise<void> {
  if (playing) return;

  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  playing = true;
  let time = ctx.currentTime + 0.05;

  for (const [note, duration] of MELODY) {
    const freq = NOTE_FREQ[note];
    if (freq) playNote(ctx, freq, time, duration * 0.92);
    time += duration;
  }

  const totalMs = getHappyBirthdayDurationMs();
  setTimeout(() => {
    playing = false;
  }, totalMs);
}
