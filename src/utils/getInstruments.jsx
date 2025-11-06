function getInstruments(songText) {

    const instrumentTexts = getInstrumentText(songText);
    const instruments = getInstrumentValues(instrumentTexts);

    console.log(instruments[0].name)
    return instrumentTexts
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
        let instrument = {
            name: text
        }

        instruments[index] = instrument
    })

    return instruments
}

export default getInstruments;