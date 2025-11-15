import VolumeIcon from '../assets/VolumeIcon'
function VolumeButton({ volume, maxVolume, setMute, isMute, setProcessSong }) {
    function getDisabledMute() {
        if (isMute === null) {
            return { "pointer-events": "none" }
        } else {
            return {}
        }
    }
    function handleMute() {
        console.log('buttonMuteClick')
        setMute(!isMute)
        setProcessSong()
    }
    return (
        <button className="vol-item btn btn-white bg-white rounded" style={getDisabledMute()} id="master-volume-button" onClick={(e) => handleMute()} >
            <VolumeIcon volume={volume} maxVolume={maxVolume} isMute={isMute} />
        </button>
    );
}

export default VolumeButton;