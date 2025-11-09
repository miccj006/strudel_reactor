import VolumeIcon from '../assets/VolumeIcon'
function VolumeButton({ volume, maxVolume, setMute, isMute }) {
    return (
        <button className="vol-item btn btn-white bg-white rounded" id="master-volume-button" onClick={(e) => setMute(!isMute)} >
            <VolumeIcon volume={volume} maxVolume={maxVolume} isMute={isMute} />
        </button>
    );
}

export default VolumeButton;