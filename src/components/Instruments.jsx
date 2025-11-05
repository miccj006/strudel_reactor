import SlidersIcon from '../assets/sliders'
import VolumeIcon from '../assets/volume'

function Instruments({ instrumentNames }) {
    return (
        <>
            <h4>Instruments</h4>
                {instrumentNames.map((d, i) => (
                    <div key={i} className="row d-flex align-items-center no-gutters mx-3 my-2 bg-light">
                        <label className="h5" htmlFor="volume-range" style={{ flex: '0.25' }}>{d}</label>
                        <input className="form-range px-5" type="range" min="0" max="1" step="0.01" id="volume-range" style={{ flex: '1' }} />
                        <button className="form-btn btn btn-outline-secondary" style={{ flex: '0'}}>
                            <VolumeIcon level={"mute"} />
                        </button>
                        <button className="btn btn-outline-primary" style={{ flex: '0' }}>
                            <SlidersIcon />
                        </button>
                    </div>
                ))}
        </>
    );
}

export default Instruments;