function getClientInfo() {
	return {
	  "name" : "Double & Harmony Phoneme Adjustment (English)",
	  "category" : "Lys' Scripts",
	  "author" : "Lys",
	  "versionNumber" : 2.0,
	  "minEditorVersion" : 0
	};
}

function main() {
	changePhonemeStrength(20.0, "b");
	changePhonemeStrength(20.0, "ch");
	changePhonemeStrength(20.0, "d");
	changePhonemeStrength(20.0, "dh");
	changePhonemeStrength(20.0, "m");
	changePhonemeStrength(20.0, "n");
	changePhonemeStrength(20.0, "f");
	changePhonemeStrength(20.0, "g");
	changePhonemeStrength(20.0, "hh");
	changePhonemeStrength(20.0, "j");
	changePhonemeStrength(20.0, "k");
	changePhonemeStrength(20.0, "p");
	changePhonemeStrength(60.0, "s");
	changePhonemeStrength(60.0, "sh");
	changePhonemeStrength(60.0, "zh");
	changePhonemeStrength(20.0, "t");
	changePhonemeStrength(20.0, "th");
	changePhonemeStrength(20.0, "v");
	changePhonemeStrength(60.0, "z");
	SV.showMessageBox("Phoneme Adjustment Complete.", "Done");
	SV.finish();
}
function changePhonemeStrength(newStrength, chosenPhon) {
	//loop vars
	var i = 0;
	var j = 0;
	var k = 0;
	var l = 0;

	//get the current track
	var mainEditor = SV.getMainEditor();
	var currentTrack = mainEditor.getCurrentTrack();

	//get the note reference groups
	var noteGroupReferences = new Array();
	var noteGroups = new Array();
	var numOfGroups = currentTrack.getNumGroups();
	var groupPhon = new Array();

	//for notes
	var numOfNotes;
	var currentNote;
	var noteAttributes;


	//phoneme string
	var phonString;

	for (i = 0; i < numOfGroups; i++){

		noteGroupReferences[i] = currentTrack.getGroupReference(i);
		noteGroups[i] = noteGroupReferences[i].getTarget();
		
		numOfNotes = noteGroups[i].getNumNotes();

		//get the phonemes of the note group
		groupPhon = SV.getPhonemesForGroup(noteGroupReferences[i]);

		//now, go through the notes
		for(j = 0; j < numOfNotes; j++){

			//needing to be reset per note
			var phonOfNote = new Array();
			var phonStrength = new Array();
			var newphonStrength = new Array();

			currentNote = noteGroups[i].getNote(j);
			
			//get the phonemes
			phonString = groupPhon[j];
			phonOfNote = phonString.split(" ");


			noteAttributes = currentNote.getAttributes();
			for (var l = 0; l < noteAttributes.strength.length; l++){
				phonStrength.push(noteAttributes.strength[l]);
			}

			//go through the phonemes of the note
			for(k = 0; k < phonOfNote.length; k++){
				

				//same but for strength
				if(phonOfNote[k].localeCompare(chosenPhon) == 0){
					newphonStrength.push(newStrength/100);
				}else if((phonStrength[k] != undefined)){
					newphonStrength.push(phonStrength[k]);
				}else{
					newphonStrength.push(1);
				}
			}

			currentNote.setAttributes({
				"strength" : newphonStrength
			});

		}
	}
}