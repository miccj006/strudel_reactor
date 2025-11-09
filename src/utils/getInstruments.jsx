function getInstruments(songText) {
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
            let gains = text.match(/\.gain\(([\d.]+)\)/g).map(match => match.match(/[\d.]*?(?=\))/));
            console.log(gains[0])
            let mute = text[0] == '_' ? true : false;

            let instrument = {
                rawName: rawName,
                name: name,
                mute: mute,
                gains: gains,
                text: text
            }
            
            instruments[index] = instrument
        })

        return instruments
    }

    const instrumentTexts = getInstrumentText(songText);
    const instruments = getInstrumentValues(instrumentTexts);

    return instruments
}

export default getInstruments;