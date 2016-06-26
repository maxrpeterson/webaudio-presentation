// `noteNameToMidiNumber` & `noteNameToFrequency` imported from helper js file

// create the context that all web audio stuff will hinge off of
const audioCtx = new AudioContext();

// create the oscillator
const osc1 = audioCtx.createOscillator();
osc1.type = 'sawtooth';
osc1.frequency.value = noteNameToFrequency('C4');

// create the gain node
const gain = audioCtx.createGain();

// link them up
osc1.connect(gain).connect(audioCtx.destination);
