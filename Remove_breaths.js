function getClientInfo() {
	return {
	  "name" : "Remove Breaths",
	  "category" : "Lys' Scripts",
	  "author" : "Lys",
	  "versionNumber" : 1.0,
	  "minEditorVersion" : 0
	};
}

function main() {
	removeBR();

	SV.showMessageBox("Removal Complete", "Done");
	SV.finish();
}

function removeBR() {
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

		var notesToDelete = new Array();

		//now, go through the notes
		for(j = 0; j < numOfNotes; j++){

			//needing to be reset per note
			var phonOfNote = new Array();

			currentNote = noteGroups[i].getNote(j);
			
			//get the phonemes
			phonString = groupPhon[j];
			phonOfNote = phonString.split(" ");

			//go through the phonemes of the note
			for(k = 0; k < 1; k++){
				
				//if this is the phoneme
				if(phonOfNote[k].localeCompare("br") == 0){
					notesToDelete.push(j);
				}
			}

		}
		
		for (j=0; j<notesToDelete.length; j++) {
			noteGroups[i].removeNote(notesToDelete[j]-j);
		}
	}
}