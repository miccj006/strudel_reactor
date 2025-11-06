function getInstruments(songText) {

    const instrumentTexts = getInstrumentText(songText);
    const instruments = getInstrumentValues(instrumentTexts);

    console.log(instruments[0].gain)
    return instruments
}

function getInstrumentText(songText) {
    // I used "https://regex101.com/" to make this regex
    // This regex captures an instrument found within a strudle song text code
    const instrumentRegex = /\n\s+?(?=\b[\w\-]+:)[\s\S]+?(?=(\)[\s\n]*[\/\w]))\)/g
    const instrumentTexts = songText.match(instrumentRegex);

    instrumentTexts.forEach((text, index) => {
        instrumentTexts[index] = text.trim();
    })

    return instrumentTexts
}

function getInstrumentValues(instrumentTexts) {
    const instruments = [];

    instrumentTexts.forEach((text, index) => {
        let mute = text[0] == '_' ? true : false;
        let name = text.slice(0, text.indexOf(':'));
        if (mute) name = name.slice(1);
        let gain = text.slice(text.indexOf('.gain(', ')'));
        let postGain = text.slice(text.indexOf('.postgain(', ')'));

        let instrument = {
            name: name,
            mute: mute,
            gain: gain,
            postGain: postGain,
            fullText: text
        }

        instruments[index] = instrument
    })

    return instruments
}

export default getInstruments;