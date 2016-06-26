// create the context that all web audio stuff will hinge off of
const audioCtx = new AudioContext();

// create the oscillator & change some settings for better tone
const osc1 = audioCtx.createOscillator();
osc1.type = 'sawtooth';
// `noteNameToMidiNumber` & `noteNameToFrequency` imported from helper js file
osc1.frequency.value = noteNameToFrequency('C4'); // C4 is middle C

// create the gain node
const gain = audioCtx.createGain();

// link them up
osc1.connect(gain).connect(audioCtx.destination);
