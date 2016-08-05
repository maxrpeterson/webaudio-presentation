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
var keyboard = new QwertyHancock({
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
keyboard.keyDown = function(note) {
  console.log(note, noteNameToFrequency(note));
  osc1.frequency.setValueAtTime(noteNameToFrequency(note), audioCtx.currentTime);
  amp.gain.cancelScheduledValues(audioCtx.currentTime);
  amp.gain.setValueAtTime(0, audioCtx.currentTime);
  amp.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.2);
};

// add the keyUp listener
keyboard.keyUp = function(note) {
  amp.gain.cancelScheduledValues(audioCtx.currentTime);
  var prevGain = amp.gain.value;
  amp.gain.setValueAtTime(prevGain, audioCtx.currentTime);
  amp.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2);
};
