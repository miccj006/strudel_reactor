import VolumeIcon from '../assets/volume'

function MasterControls({ songText, setSongText, masterVolume, onMasterVolumeChange, setProcessSong }) {
    const cycleData = getCycleData(songText)
    function getCycleData(songText) {
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

    function setCycleInterval(songText, cycleData) {
        let newSongText = songText;
        if (cycleData.isCycleExists) {
            const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
            const newCycleType = cycleData.isPerMinute ? 'setcps' : 'setcpm';
            newSongText = songText.replaceAll(cycleType, newCycleType)
        }
        return newSongText
    }

    function setCycleValue(songText, cycleData, newCycleText) {
        let newSongText = songText;
        if (cycleData.isCycleExists) {
            const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
            const newFullText = `${cycleType}(${newCycleText})`
            newSongText = songText.replaceAll(cycleData.fullText, newFullText)
        }
        return newSongText
    }



    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepstart">
                    <button className="btn  btn-outline-primary input-group-text" id="cycle-label" onClick={(e) => setSongText(setCycleInterval(songText, cycleData))}>Set {cycleData.isPerMinute ? "CPM" : "CPS"} ⇅</button>
                </div>
                <input type="text" className="form-control" id="cycle-text-input" placeholder="Insert cycle value here" aria-label="cycle" aria-describedby="cycle-label" value={cycleData.cycleText} onChange={(e) => setSongText(setCycleValue(songText, cycleData, e.target.value))} />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPS = {!isNaN(cycleData.value) ? (Math.round(cycleData.value / (cycleData.isPerMinute ? 60 : 1) * 100) / 100) : "?"}</span>
                </div>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPM = {!isNaN(cycleData.value) ? (Math.round(cycleData.value * (cycleData.isPerMinute ? 1 : 60) * 100) / 100) : "?"}</span>
                </div>
            </div>

            <label htmlFor="volume-range" className="form-label">Master Volume</label>
            <div className="row align-items-center mx-4">
                <input type="range" className="form-range col" min="0" max="1" step="0.01" id="volume-range" value={masterVolume} onChange={(e) => onMasterVolumeChange(e.target.value)} onMouseUp={setProcessSong} />
                <button className="btn btn-light m-0 mx-3 col-2" id="master-volume-button">
                    <VolumeIcon volume={masterVolume} maxVolume={1} isMute={false} />
                </button>
            </div>
        </>
    );
}

export default MasterControls;