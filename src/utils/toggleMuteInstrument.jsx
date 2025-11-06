function toggleMuteInstrument(songText, instrument) {
    let newSongText = songText;
    let rawName = instrument.rawName + ':';
    let newName = instrument.name + ':';


    if (instrument.mute == false) {
        let muteChar = '_'
        newName = muteChar + newName
    }

    newSongText = songText.replaceAll(rawName, newName)
    return newSongText
}


export default toggleMuteInstrument;