function processText(songText, masterVolume) {
    let newSongText = songText.replaceAll(/\.gain\(([\d.]+)\)/g, (match, captureGroup) =>
        `.gain(${captureGroup}*${masterVolume})`
    )

    return newSongText
}

export default processText;