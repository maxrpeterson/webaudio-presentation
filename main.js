// functions for converting from notes to frequency
// `noteNameToMidiNumber('C5')` => `60`
function noteNameToMidiNumber(note) {
  const noteNames = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11};
  
}

// create the context that all web audio stuff will hinge off of
const audioCtx = new AudioContext();

// create the oscillator
const osc1 = audioCtx.createOscillator();
osc1.type = 'sawtooth';
osc1.frequency.value = 220;

// create the gain node
const gain = audioCtx.createGain();

// link them up
osc1.connect(gain).connect(audioCtx.destination);
