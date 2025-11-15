import VolumeButton from './VolumeButton'
function VolumeSliderControl({ volume, maxVolume, setMute, isMute, onVolumeChange, setProcessSong }) {
    const volumeButtonEnabled = <div className="w-auto m-0 p-0"><VolumeButton volume={volume} maxVolume={maxVolume} setMute={setMute} isMute={isMute} setProcessSong={setProcessSong} /></div>
    const volumeButtonDisabled = <div className="w-auto m-0 p-0"><VolumeButton volume={volume} maxVolume={maxVolume} isMute={isMute} setProcessSong={setProcessSong} /></div>
    function handleButton() {
        if (isMute === null) {
            return volumeButtonDisabled
        } else {
            return volumeButtonEnabled
        }
    }

    return (
        <div className="row rounded shadow-sm bg-white m-0 p-0">
            {handleButton()}

            <div className="col row p-1 m-0 vol-item">
                <input type="range" className="form-range col" min="0" max={maxVolume} step="0.01" id="volume-range" value={volume} onChange={(e) => onVolumeChange(e.target.value)} onMouseUp={setProcessSong} />
                <div className="col-1 text-muted vol-text w-auto">{parseFloat(volume).toFixed(2)}</div>
            </div>
        </div>
    );
}

export default VolumeSliderControl;