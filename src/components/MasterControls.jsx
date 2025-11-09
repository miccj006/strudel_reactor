import PlayButtons from '../components/PlayButtons'
import CycleField from '../components/CycleField'
import VolumeSliderControl from './VolumeSliderControl'

function MasterControls({ onPlay, onStop, songIsPlaying, songText, setSongText, masterVolume, onMasterVolumeChange, setProcessSong, masterMute, setMasterMute }) {
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
        <div className="p-3 m-2 rounded shadow bg-light-gray">
            <div className="rounded shadow-sm mb-3">
                <PlayButtons onPlay={onPlay} onStop={onStop} songIsPlaying={songIsPlaying} />
            </div>
            <div className="input-group rounded shadow-sm bg-white">
                <CycleField songText={songText} setSongText={setSongText} cycleData={cycleData} setCycleValue={setCycleValue} setCycleInterval={setCycleInterval} />
            </div>

            <div className="row align-items-center m-0 mt-3 gap-3">
                <VolumeSliderControl volume={masterVolume} maxVolume={1} setMute={setMasterMute} isMute={masterMute} onVolumeChange={onMasterVolumeChange} setProcessSong={setProcessSong} />
            </div>
        </div>
    );
}

export default MasterControls;