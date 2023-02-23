function getClientInfo() {
    return {
      "name" : "Fix .vpr Conversion",
      "category" : "Lys' Scripts",
      "author" : "Lys",
      "versionNumber" : 1.0,
      "minEditorVersion" : 0
    };
  }
  /*
  the conversion from vpr to svp leaves syllables on different notes
  this script makes it so that each word is on 1 note and the extra syllables are +s
  */
  function main() {

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

    //lyric string
    var lyricString;

    for (i = 0; i < numOfGroups; i++){

        noteGroupReferences[i] = currentTrack.getGroupReference(i);
        noteGroups[i] = noteGroupReferences[i].getTarget();
        
        numOfNotes = noteGroups[i].getNumNotes();

        //now, go through the notes
        for(j = 0; j < numOfNotes; j++){

            //needing to be reset per note
            var lyricOfNote = new Array();

            currentNote = noteGroups[i].getNote(j);
            
            //get the lyrics
            lyricString = currentNote.getLyrics();
            lyricOfNote = lyricString.split("");
			
			var k = j; //counter
			
			//if the lyric ends with a -, and isn't a 1 character string, 
			//combines the next note's lyric with the current one and changes the next note's lyric into a +
			//and loops til the word is properly all in 1 note and the other notes are +s
			while (lyricOfNote[lyricString.length-1].localeCompare("-") == 0 && lyricOfNote.length > 1) {
				var nextNote = noteGroups[i].getNote(++k);
				//making sure the next note actually has lyrics and not just an extension
				while (nextNote.getLyrics().localeCompare("-") == 0) { 
					nextNote = noteGroups[i].getNote(++k);
				}
				currentNote.setLyrics(lyricString.slice(0,-1) + nextNote.getLyrics());
				nextNote.setLyrics("+");
				lyricString = currentNote.getLyrics();
				lyricOfNote = lyricString.split("");
			}

        }
    }

    SV.showMessageBox("Lyric Adjustment Complete","Done.");

      SV.finish();
  }