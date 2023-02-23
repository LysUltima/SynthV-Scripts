function getClientInfo() {
    return {
      "name" : "Fill Silences with Breaths",
      "category" : "Lys' Scripts",
      "author" : "Lys",
      "versionNumber" : 1.1,
      "minEditorVersion" : 0
    };
  }
  /*
  this adds breaths between notes
  */
  function main() {
	  
	const NOTE_TIMES = ["1","1/2","1/4","1/8","1/16","1/32","1/64","1/128"];
	const NOTE_VALUES = [4,2,1,0.5,0.25,0.125,0.0625,0.03125];
	/*
	var minForm = {
        "title" : "Select Min Length",
        "message" : "Select the minimum length of a breath. If the breath is less than this length, the previous note will be cut in length til the breath is min length.",
        "buttons" : "OkCancel",
        "widgets" : [
            {
                "name" : "note", "type" : "ComboBox",
                "label" : "Choose Length:",
                "choices" : NOTE_TIMES,
                "default" : 4
            },
			{
              "name" : "amount", "type" : "Slider",
              "label" : "Duration Value",
              "format" : "%1.0f",
              "minValue" : 1,
              "maxValue" : 4,
              "interval" : 1,
              "default" : 1
			}, 
        ]
    };
	var maxForm = {
        "title" : "Select Max Length",
        "message" : "Select the max length of a breath. If the breath is greater than this lenth, the breath will be shortened.",
        "buttons" : "OkCancel",
        "widgets" : [
            {
                "name" : "note", "type" : "ComboBox",
                "label" : "Choose Length:",
                "choices" : NOTE_TIMES,
                "default" : 1
            },
			{
              "name" : "amount", "type" : "Slider",
              "label" : "Duration Value",
              "format" : "%1.0f",
              "minValue" : 1,
              "maxValue" : 4,
              "interval" : 1,
              "default" : 1
			}, 
        ]
    };

    //have the user pick min and max length
    var minpick = SV.showCustomDialog(minForm);
    var minLength = SV.quarter2Blick(NOTE_VALUES[minpick.answers.note] * minpick.answers.amount);
	
	var maxpick = SV.showCustomDialog(maxForm);
    var maxLength = SV.quarter2Blick(NOTE_VALUES[maxpick.answers.note] * maxpick.answers.amount);
	
	*/
	var minLength = 0;
	var maxLength = SV.quarter2Blick(NOTE_VALUES[1]);
	
    //loop vars
    var i = 0;
    var j = 0;
    var k = 0;
    
    //get the current track
    var mainEditor = SV.getMainEditor();
    var currentTrack = mainEditor.getCurrentTrack();

    //get the note reference groups
    var noteGroupReferences = new Array();
    var noteGroups = new Array();
    var numOfGroups = currentTrack.getNumGroups();
    
    //for notes
    var numOfNotes;
    var currentNote;
	var nextNote;
	var newNote;

    for (i = 0; i < numOfGroups; i++){

        noteGroupReferences[i] = currentTrack.getGroupReference(i);
        noteGroups[i] = noteGroupReferences[i].getTarget();
        
        numOfNotes = noteGroups[i].getNumNotes();

        //now, go through the notes
        for(j = 0; j < numOfNotes-1; j++){

            currentNote = noteGroups[i].getNote(j);
			nextNote = noteGroups[i].getNote(j+1);
			
			if (currentNote.getOnset()+currentNote.getDuration() < nextNote.getOnset()) {
				var onset = currentNote.getOnset()+currentNote.getDuration();
				var duration = nextNote.getOnset()-onset;
				if (duration < minLength) {
					currentNote.setDuration(currentNote.getDuration()-(minLength-duration));
					onset -= minLength-duration;
					duration = minLength;
				}
				else if (duration > maxLength) {
					onset += duration - maxLength;
					duration = maxLength;
				}
				
				newNote = noteGroups[i].getNote(noteGroups[i].addNote(nextNote.clone()));
				newNote.setLyrics("br");
				newNote.setPhonemes("br");
				
				newNote.setOnset(onset);
				newNote.setDuration(duration);
				numOfNotes++;
			}

        }
    }

    SV.showMessageBox("Adding Breaths Complete.","Done.");

      SV.finish();
  }