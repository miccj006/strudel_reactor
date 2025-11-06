import VolumeIcon from '../assets/volume'
import toggleMute from '../utils/toggleMuteInstrument'

function Instruments({ instruments, songText, setSongText }) {
    function DisableAccordion(e) {
        let accordionButton = e.target.closest('.accordion-button');
        accordionButton.setAttribute('data-bs-toggle', '')
    }
    function EnableAccordion(e) {
        let accordionButton = e.target.closest('.accordion-button');
        accordionButton.setAttribute('data-bs-toggle', 'collapse')
    }

    return (
        <>
            <h4>Instruments</h4>
            <div className="accordion" id="accordionExample">
                {instruments.map((instrument, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header" id={"heading-" + instrument.name} >
                            <div className="accordion-button py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + instrument.name} aria-expanded="false" aria-controls={"collapse-" + instrument.name}>
                                <div className="w-25 m-0 py-3">{instrument.name}</div>
                                <input className="form-range m-0 py-3" type="range" min="0" max="1" step="0.01" id="volume-range" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} />
                                <button className="btn btn-light m-0 mx-3" id="volume-button" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} onClick={(e) => setSongText(toggleMute(songText, instrument))}>
                                    <VolumeIcon level={instrument.mute === true ? "mute" : "high"} />
                                </button>
                            </div>
                        </div>
                        <div id={"collapse-" + instrument.name} className="accordion-collapse collapse" aria-labelledby={"heading-" + instrument.name} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>{instrument.name}</strong>
                                <p>{instrument.text}</p>
                                <p>Gain = {instrument.gain}</p>
                                {/*<p>Post Gain = {instrument.postGain}</p>*/}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </>


    );
}

export default Instruments;