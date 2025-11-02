function getInstruments(songText) {
    // Regex specifies a new line, followed by a word, then a colon
    const instrumentRegex = /\n\b[\w\-]+:/g
    const instruments = songText.match(instrumentRegex);

    // Remove the '\n' and ':'
    instruments.forEach((d, i) => {
        instruments[i] = d.slice(1, -1)
    })

    //const instrumentData = getInstrumentValues(songText, instruments);

    console.log(instruments)
    return instruments
}

function getInstrumentValues(songText, instruments) {
    const instrumentData = songText.split(instruments);
    return instrumentData
}

export default getInstruments;