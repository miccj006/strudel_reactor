import VolumeSliderControl from '../components/VolumeSliderControl'
import getInstruments from '../utils/getInstruments';

function Instruments({ songText, setSongText }) {
    const instruments = getInstruments(songText)
    function DisableAccordion(e) {
        let accordionButton = e.target.closest('.accordion-button');
        accordionButton.setAttribute('data-bs-toggle', '')
    }
    function EnableAccordion(e) {
        let accordionButton = e.target.closest('.accordion-button');
        accordionButton.setAttribute('data-bs-toggle', 'collapse')
    }
    
    function setInstrumentGain(songText, instrument, gainIndex, newGain) {
        let matchCount = 0;

        let newInstrument = instrument.text.replace(/\.gain\(([\d.]+)\)/g, (originalGainText, captureGroup) => {
            let newGainText = originalGainText
            if (matchCount == gainIndex) {
                newGainText = `.gain(${newGain})`
            }
            matchCount += 1
            
            console.log(originalGainText, matchCount)
            return newGainText
        })

        let newSongText = songText.replaceAll(instrument.text, newInstrument);
        return newSongText
    }

    function toggleMuteInstrument(songText, instrument) {
        let newSongText = songText;
        let rawName = instrument.rawName + ':';
        let newName = instrument.name + ':';


        if (instrument.mute == false) {
            let muteChar = '_'
            newName = muteChar + newName
        }

        newSongText = songText.replaceAll(rawName, newName)
        return newSongText
    }
    return (
        <>
            <div className="accordion rounded shadow p-3 m-2 rounded shadow bg-light-gray flex" id="accordionExample">
                {instruments.map((instrument, index) => (
                    <div key={index} className="accordion-item shadow-sm">
                        <div className="accordion-header" id={"heading-" + instrument.name} >
                            <div className="accordion-button collapsed py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + instrument.name} aria-expanded="false" aria-controls={"collapse-" + instrument.name}>
                                <div className="col-2 m-0 py-3">{instrument.name}</div>
                                <div className='mx-1'></div>
                                {/*<input className="form-range m-0 py-3" type="range" min="0" max="1" step="0.01" id="volume-range" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} />*/}
                                {/*<button className="btn btn-light m-0 mx-3" id="volume-button" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} onClick={(e) => setSongText(toggleMuteInstrument(songText, instrument))}>*/}
                                {/*    <VolumeIcon volume={1} maxVolume={1} isMute={instrument.mute} />*/}
                                {/*</button>*/}
                                <div className="row col mx-3 align-content-center" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)}>
                                    {instrument.gains.map((gain, gainIndex) => (
                                        <VolumeSliderControl volume={gain} maxVolume={2} setMute={(e) => setSongText(toggleMuteInstrument(songText, instrument))} isMute={instrument.mute}
                                            onVolumeChange={(newGain) => setSongText(setInstrumentGain(songText, instrument, gainIndex, newGain))} setProcessSong={(e) => ''} />
                                    ))}
                                </div>
                                <div className='mx-1'></div>
                            </div>
                        </div>
                        <div id={"collapse-" + instrument.name} className="accordion-collapse collapse" aria-labelledby={"heading-" + instrument.name} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>{instrument.name}</strong>

                                {/*Extra features to reach the mark :)*/}
                                <div className="row m-3">
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios1" + index} value="option1" defaultChecked />
                                            <label className="form-check-label" for={"exampleRadios1" + index}>
                                                Style 1
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios2" + index} value="option2" />
                                            <label className="form-check-label" for={"exampleRadios2" + index}>
                                                Style 2
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios3" + index} value="option3" disabled />
                                            <label className="form-check-label fst-italic" for={"exampleRadios3" + index}>
                                                New style coming soon
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Feature 1
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                            <label className="form-check-label" for="flexCheckChecked">
                                                Feature 2
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" for="flexSwitchCheckDefault">Bass Boost</label>
                                        </div>
                                    </div>
                                </div>

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