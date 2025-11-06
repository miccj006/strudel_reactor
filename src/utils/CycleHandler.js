export function getCycleData(songText) {
    const cycleData = {
        isCycleExists: false,
        isPerMinute: false,
        fullText: '',
        cycleText: '',
        value: NaN
    }

    // Get last used cycle interval type
    const cpmLastIndex = songText.lastIndexOf('setcpm(');
    const cpsLastIndex = songText.lastIndexOf('setcps(');
    const lastUsedCycleIndex = Math.max(cpmLastIndex, cpsLastIndex);

    cycleData.isCycleExists = lastUsedCycleIndex != -1;
    cycleData.isPerMinute = cpmLastIndex > cpsLastIndex;

    if (cycleData.isCycleExists) {
        // Get the cycle values from the song text
        const startIndex = songText.indexOf('(', lastUsedCycleIndex) + 1;
        const endIndex = songText.indexOf(')', startIndex)
        cycleData.fullText = songText.slice(lastUsedCycleIndex, endIndex + 1);
        cycleData.cycleText = songText.slice(startIndex, endIndex);

        // Calculate speed
        try {
            cycleData.value = eval(cycleData.cycleText);
        } catch {
            cycleData.value = NaN;
        }
    }

    return cycleData
}

export function setCycleInterval(songText, cycleData) {
    let newSongText = songText;

    if (cycleData.isCycleExists) {
        const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
        const newCycleType = cycleData.isPerMinute ? 'setcps' : 'setcpm';
        newSongText = songText.replaceAll(cycleType, newCycleType)
    }

    return newSongText
}

export function setCycleValue(songText, cycleData, newCycleText) {
    let newSongText = songText;

    if (cycleData.isCycleExists) {
        const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
        const newFullText = `${cycleType}(${newCycleText})`
        newSongText = songText.replaceAll(cycleData.fullText, newFullText)
    }

    return newSongText
}