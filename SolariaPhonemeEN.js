function getClientInfo() {
	return {
	  "name" : "SOLARIA 101 Phoneme Adjustment (English)",
	  "category" : "Lys' Scripts",
	  "author" : "Lys",
	  "versionNumber" : 2.1,
	  "minEditorVersion" : 0
	};
}

function main() {
	changePhoneme(70.0, 80.0, "k");
	changePhoneme(90.0, 90.0, "g");
	changePhoneme(90.0, 90.0, "t");
	changePhoneme(90.0, 90.0, "d");
	changePhoneme(95.0, 90.0, "s");
	changePhoneme(95.0, 90.0, "sh");
	changePhoneme(60.0, 90.0, "tr");
	changePhoneme(70.0, 80.0, "hh");
	changePhoneme(95.0, 95.0, "b");
	changePhoneme(95.0, 95.0, "p");
	changePhonemeAfter(100.0, 70.0, "m");
	changePhonemeAfter(100.0, 70.0, "n");

	SV.showMessageBox("Phoneme Adjustment Complete", "Done");
	SV.finish();
}
function changePhonemeAfter(newDuration, newStrength, chosenPhon)  {
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
            var phonDuration = new Array();
            var newphonDuration = new Array();
            var phonStrength = new Array();
            var newphonStrength = new Array();

            currentNote = noteGroups[i].getNote(j);
            
            //get the phonemes
            phonString = groupPhon[j];
            phonOfNote = phonString.split(" ");


            noteAttributes = currentNote.getAttributes();

            for (var l = 0; l < noteAttributes.dur.length; l++){
                phonDuration.push(noteAttributes.dur[l]);
            }
            for (var l = 0; l < noteAttributes.strength.length; l++){
                phonStrength.push(noteAttributes.strength[l]);
            }
			var lastPhoneme = "sil";
            //go through the phonemes of the note
            for(k = 0; k < phonOfNote.length; k++){
                
                //if this is the phoneme
                if(lastPhoneme.localeCompare(chosenPhon) == 0){
                    newphonDuration.push(newDuration/100);
                //if not the phoneme but there is a duration set
                }else if((phonDuration[k] != undefined)){
                    newphonDuration.push(phonDuration[k]);
                //if not the phoneme & there is no duration set
                }else{
                    newphonDuration.push(1);
                }

                //same but for strength
                if(lastPhoneme.localeCompare(chosenPhon) == 0){
                    newphonStrength.push(newStrength/100);
                }else if((phonStrength[k] != undefined)){
                    newphonStrength.push(phonStrength[k]);
                }else{
                    newphonStrength.push(1);
                }
				lastPhoneme = phonOfNote[k];
            }

            currentNote.setAttributes({
                "dur" : newphonDuration
            });

            currentNote.setAttributes({
                "strength" : newphonStrength
            });

        }
    }
}
function changePhoneme(newDuration, newStrength, chosenPhon) {
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
			var phonDuration = new Array();
			var newphonDuration = new Array();
			var phonStrength = new Array();
			var newphonStrength = new Array();

			currentNote = noteGroups[i].getNote(j);
			
			//get the phonemes
			phonString = groupPhon[j];
			phonOfNote = phonString.split(" ");


			noteAttributes = currentNote.getAttributes();

			for (var l = 0; l < noteAttributes.dur.length; l++){
				phonDuration.push(noteAttributes.dur[l]);
			}
			for (var l = 0; l < noteAttributes.strength.length; l++){
				phonStrength.push(noteAttributes.strength[l]);
			}

			//go through the phonemes of the note
			for(k = 0; k < phonOfNote.length; k++){
				
				//if this is the phoneme
				if(phonOfNote[k].localeCompare(chosenPhon) == 0){
					newphonDuration.push(newDuration/100);
				//if not the phoneme but there is a duration set
				}else if((phonDuration[k] != undefined)){
					newphonDuration.push(phonDuration[k]);
				//if not the phoneme & there is no duration set
				}else{
					newphonDuration.push(1);
				}

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
				"dur" : newphonDuration
			});

			currentNote.setAttributes({
				"strength" : newphonStrength
			});

		}
	}
}