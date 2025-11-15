function processText(songText, masterVolume, masterMute, instruments, instrumentMasterVolumes) {
    let newSongText = songText
    console.log(instrumentMasterVolumes)
    console.log(instruments[0])

    // Instrument Master Volume
    for (let index = 0; index < instruments.length; index++) {
        let newInstrumentVolumes = instruments[index].text.replace(/\.gain\(([\d.]+)\)/g, (originalGainText, captureGroup) => {
            let newVolumes = originalGainText
            newVolumes = `.gain(${captureGroup}*${instrumentMasterVolumes[index]})`
            return newVolumes
        })

        newSongText = newSongText.replaceAll(instruments[index].text, newInstrumentVolumes);

        if (index == 0) {
            //console.log(instruments[0].text)
            //console.log(newInstrumentVolumes)
        }
    }


    // Song Master Volume
    newSongText = newSongText.replaceAll(/\.gain\(([\d.*]+)\)/g, (match, captureGroup) =>
        `.gain(${captureGroup}*${masterVolume}*${!masterMute})`
    )

    return newSongText
}

export default processText;