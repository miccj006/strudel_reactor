import PlayButtons from '../components/PlayButtons'
import CycleField from '../components/CycleField'
import VolumeSliderControl from './VolumeSliderControl'

function MasterControls({ onPlay, onStop, songIsPlaying, songText, setSongText, masterVolume, onMasterVolumeChange, setProcessSong, masterMute, setMasterMute }) {
    const cycleData = getCycleData(songText)

    function SaveData() {
        const settings = {
            pattern: getCurrentPattern(),
            bass: getCurrentBass()
        }

        const json = JSON.stringify(settings)
        localStorage.setItem('settings', json)

        console.log(settings)
        console.log(json)
    }

    function LoadData() {
        const json = localStorage.getItem('settings')
        const settings = JSON.parse(json);

        console.log(settings)
        console.log(json)

        let newSongText = songText.replace(/const pattern = \d+/, `const pattern = ${settings.pattern}`);
        newSongText = newSongText.replace(/const bass = \d+/, `const bass = ${settings.bass}`);
        setSongText(newSongText);
        setProcessSong(true);
    }

    const getCurrentPattern = () => {
        const match = songText.match(/const pattern = (\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const getCurrentBass = () => {
        const match = songText.match(/const bass = (\d+)/);
        return match ? parseInt(match[1]) : 0;
    };

    const handlePatternChange = (value) => {
        const newSongText = songText.replace(/const pattern = \d+/, `const pattern = ${value}`);
        setSongText(newSongText);
        setProcessSong(true);
    };

    const handleBassChange = (value) => {
        const newSongText = songText.replace(/const bass = \d+/, `const bass = ${value}`);
        setSongText(newSongText);
        setProcessSong(true);
    };
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
            setProcessSong(true)
        }
        return newSongText
    }

    function setCycleValue(songText, cycleData, newCycleText) {
        let newSongText = songText;
        if (cycleData.isCycleExists) {
            const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
            const newFullText = `${cycleType}(${newCycleText})`
            newSongText = songText.replaceAll(cycleData.fullText, newFullText)
            setProcessSong(true)
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

            <div className="row align-items-center m-0 mt-3 gap-1">
                <VolumeSliderControl volume={masterVolume} maxVolume={1} setMute={setMasterMute} isMute={masterMute} onVolumeChange={onMasterVolumeChange} setProcessSong={setProcessSong} />
            </div>

            <div className="col m-0 mt-3 p-2 rounded shadow-sm bg-light">

                {/*Save and load buttons*/}
                <div className="row align-items-center m-0 mb-2 gap-1">
                    <button className="btn btn-outline-primary col" onClick={(e) => SaveData()}>Save Radials</button>
                    <button className="btn btn-outline-secondary col" onClick={(e) => LoadData()}>Load Radials</button>
                </div>

                {/*Radial buttons*/}
                <div className="row align-items-center m-0 gap-1">
                    <div className="col rounded shadow-sm bg-white">
                        <h6><b>gain_patterns</b></h6>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gain-patternsOptions" id="gain-patterns1" value="0" checked={getCurrentPattern() === 0} onChange={(e) => handlePatternChange(e.target.value)} />
                            <label class="form-check-label" for="gain-patterns1">1</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gain-patternsOptions" id="gain-patterns2" value="1" checked={getCurrentPattern() === 1} onChange={(e) => handlePatternChange(e.target.value)} />
                            <label class="form-check-label" for="gain-patterns2">2</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="gain-patternsOptions" id="gain-patterns3" value="2" checked={getCurrentPattern() === 2} onChange={(e) => handlePatternChange(e.target.value)} />
                            <label class="form-check-label" for="gain-patterns3">3</label>
                        </div>
                    </div>

                    <div className="col rounded shadow-sm bg-white">
                        <h6><b>basslines</b></h6>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="basslinesOptions" id="basslines1" value="0" checked={getCurrentBass() === 0} onChange={(e) => handleBassChange(e.target.value)} />
                            <label class="form-check-label" for="basslines1">1</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="basslinesOptions" id="basslines2" value="1" checked={getCurrentBass() === 1} onChange={(e) => handleBassChange(e.target.value)} />
                            <label class="form-check-label" for="basslines2">2</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterControls;