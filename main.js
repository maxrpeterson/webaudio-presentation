// create the context that all web audio stuff will hinge off of
const audioCtx = new AudioContext();

// create the oscillator & change some settings for better tone
const osc1 = audioCtx.createOscillator();
// set the waveform
osc1.type = 'sawtooth';
// `noteNameToMidiNumber` & `noteNameToFrequency` imported from helper js file
osc1.frequency.value = noteNameToFrequency('C4'); // C4 is middle C

// create the amp (gain node)
const amp = audioCtx.createGain();
amp.gain.value = 0;

// link them up
osc1.connect(amp).connect(audioCtx.destination);

// start the oscillator
osc1.start();

// set up the QwertyHancock keyboard
const keyboard = new QwertyHancock({
       id: 'keyboard',
       width: 600,
       height: 150,
       octaves: 2,
       startNote: 'A3',
       whiteNotesColour: 'white',
       blackNotesColour: 'black',
       hoverColour: '#f3e939'
    });

// add the keyDown listener
keyboard.keyDown = function(note, freq) {
  let now = audioCtx.currentTime;
  osc1.frequency.setValueAtTime(freq, now);
  amp.gain.cancelScheduledValues(now);
  amp.gain.setValueAtTime(0, now);
  amp.gain.linearRampToValueAtTime(1, now + 0.3);
};

// add the keyUp listener
keyboard.keyUp = function(note) {
  let now = audioCtx.currentTime;
  let currAmpVal = amp.gain.value;
  amp.gain.cancelScheduledValues(now);
  amp.gain.setValueAtTime(currAmpVal, now);
  amp.gain.linearRampToValueAtTime(0, now + 1);
};
