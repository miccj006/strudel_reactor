function processText(songText, masterVolume, masterMute) {
    let newSongText = songText.replaceAll(/\.gain\(([\d.]+)\)/g, (match, captureGroup) =>
        `.gain(${captureGroup}*${masterVolume}*${!masterMute})`
    )

    return newSongText
}

export default processText;