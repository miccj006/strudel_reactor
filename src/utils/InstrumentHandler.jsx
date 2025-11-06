export function getInstruments(songText) {
    function getInstrumentText(songText) {
        // I used "https://regex101.com/" to make this regex
        // This regex captures an instrument found within a strudle song text code
        const instrumentRegex = /\n\s+?(?=\b[\w-]+:)[\s\S]+?(?=(\)[\s\n]*[/\w]))\)/g
        const instrumentTexts = songText.match(instrumentRegex);

        instrumentTexts.forEach((text, index) => {
            instrumentTexts[index] = text.trim();
        })

        return instrumentTexts
    }
    function getInstrumentValues(instrumentTexts) {
        const instruments = [];

        instrumentTexts.forEach((text, index) => {
            let rawName = text.slice(0, text.indexOf(':'));
            let name = rawName.match(/(?!_)\w+/);
            let mute = text[0] == '_' ? true : false;
            let gain = text.slice(text.indexOf('gain(') + 5, text.indexOf(')', text.indexOf('gain(')));
            //let postGain = text.slice(text.indexOf('.postgain(', ')'));

            let instrument = {
                rawName: rawName,
                name: name,
                mute: mute,
                gain: gain,
                //postGain: postGain,
                text: text
            }

            instruments[index] = instrument
        })

        return instruments
    }

    const instrumentTexts = getInstrumentText(songText);
    const instruments = getInstrumentValues(instrumentTexts);

    console.log(instruments[0].gain)
    return instruments
}

export function toggleMuteInstrument(songText, instrument) {
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


export default getInstruments;