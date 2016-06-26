(function() {
  'use strict';
  // functions for converting from notes to frequency
  // `noteNameToMidiNumber('C5')` => `60`
  function noteNameToMidiNumber(note) {
    const noteNames = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11};

    // if the note name is valid, this should return something like:
    // `['C#3', 'C#', '3']`
    let regexResult = /([A-G][b\#]?)([0-9]{1,2})/.exec(note);

    if (!regexResult || regexResult.length !== 3) {
      throw new SyntaxError('Note checked not a valid note');
    }

    let noteValue = noteNames[regexResult[1]];
    let octave = parseInt(regexResult[2]);
    return noteValue + (octave * 12);
  }

  function noteNameToFrequency(note) {
    const a4MidiValue = 57;
    const a4Frequency = 440;
    const twelthRootOf2 = Math.pow(2, (1/12));
    const halfStepDiff = noteNameToMidiNumber(note) - a4MidiValue;

    return a4Frequency * Math.pow(twelthRootOf2, halfStepDiff);
  }

  if (typeof module !== 'undefined') {
    module.exports = {
      noteNameToMidiNumber: noteNameToMidiNumber,
      noteNameToFrequency: noteNameToFrequency
    };
  } else {
    window.noteNameToMidiNumber = noteNameToMidiNumber;
    window.noteNameToFrequency = noteNameToFrequency;
  }
})();
