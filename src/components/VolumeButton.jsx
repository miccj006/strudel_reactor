import VolumeIcon from '../assets/VolumeIcon'
function VolumeButton({ volume, maxVolume, setMute, isMute }) {
    return (
        <button className="btn btn-white col-1 w-auto h-auto bg-white rounded shadow-sm" id="master-volume-button" onClick={(e) => setMute(!isMute)} >
            <VolumeIcon volume={volume} maxVolume={maxVolume} isMute={isMute} />
        </button>
    );
}

export default VolumeButton;