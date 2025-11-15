import VolumeIcon from '../assets/VolumeIcon'
function VolumeButton({ volume, maxVolume, setMute, isMute }) {
    function handleMute() {
        if (isMute === null) {
            return { "pointer-events": "none" }
        } else {
            return {}
        }
    }
    return (
        <button className="vol-item btn btn-white bg-white rounded" style={handleMute()} id="master-volume-button" onClick={(e) => setMute(!isMute)} >
            <VolumeIcon volume={volume} maxVolume={maxVolume} isMute={isMute} />
        </button>
    );
}

export default VolumeButton;