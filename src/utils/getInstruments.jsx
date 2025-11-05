function getInstruments(songText) {

    const instrumentNames = getInstrumentNames(songText);
    const instrumentsData = getInstrumentValues(songText, instrumentNames);

    //console.log(instruments)
    return instrumentNames
}

function getInstrumentNames(songText) {
    // Regex specifies a new line, followed by a word, then a colon (gets them in a group)
    const instrumentRegex = /\n\b[\w\-]+:/g
    const instrumentNames = songText.match(instrumentRegex);

    // Remove the '\n' at the start
    instrumentNames.forEach((d, i) => {
        instrumentNames[i] = d.slice(1)
    })

    return instrumentNames
}

function getInstrumentValues(songText, instrumentNames) {
    // Any ')' followed by white space and a word or code comment
    let instrumentEndRegex = /\)[\s\n]*[\w(\/)\2]/
    console.log(instrumentNames)

    instrumentNames.forEach((d) => {
        console.log(d)
        let startIndex = songText.lastIndexOf(d);
        let remainingSongText = songText.slice(startIndex)

        let instrumentEndMatch = remainingSongText.match(instrumentEndRegex, startIndex)
        let endIndex = remainingSongText.indexOf(instrumentEndMatch[0]) + startIndex

        console.log(startIndex, endIndex)
    })

    return ''
}

export default getInstruments;