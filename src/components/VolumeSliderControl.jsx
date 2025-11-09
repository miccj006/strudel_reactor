import VolumeButton from './VolumeButton'
function VolumeControl({ volume, maxVolume, setMute, isMute, onVolumeChange, setProcessSong }) {
    return (
        <>
            <input type="range" className="form-range col p-3 h-auto bg-white rounded shadow-sm" min="0" max={maxVolume} step="0.01" id="volume-range" value={volume} onChange={(e) => onVolumeChange(e.target.value)} onMouseUp={setProcessSong} />
            <VolumeButton volume={volume} maxVolume={maxVolume} setMute={setMute} isMute={isMute} />
        </>
    );
}

export default VolumeControl;