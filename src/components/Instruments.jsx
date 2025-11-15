import VolumeSliderControl from '../components/VolumeSliderControl'
import getInstruments from '../utils/getInstruments';

function Instruments({ songText, setSongText, setProcessSong, instrumentMasterVolumes, setInstrumentMasterVolumes
 }) {
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
    function setInstrumentMasterVolume(instrumentIndex, newVolume) {
        let volumes = [...instrumentMasterVolumes]
        volumes[instrumentIndex] = newVolume
        setInstrumentMasterVolumes(volumes)

        //// DEBUG
        //console.log('setInstrumentsMasterVolume')
        //console.log(volumes)

    }
    return (
        <>
            <div className="accordion rounded shadow p-3 m-2 rounded shadow bg-light-gray flex" id="accordionInstruments">
                {instruments.map((instrument, index) => (
                    <div key={index} className="accordion-item shadow-sm">
                        <h2 className="accordion-header" id={"panelsStayOpen-heading-" + instrument.name} >
                            <div className="accordion-button collapsed py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse-" + instrument.name} aria-expanded="false" aria-controls={"panelsStayOpen-collapse-" + instrument.name}>
                                <div className="col-2 m-0 py-3 h6"><b>{instrument.name}</b></div>
                                <div className='mx-1'></div>
                                <div className="row col mx-3 align-content-center gap-1 m-0 mx-5" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)}>
                                    <VolumeSliderControl volume={instrumentMasterVolumes[index]} maxVolume={1} setMute={(e) => setSongText(toggleMuteInstrument(songText, instrument))} isMute={instrument.mute}
                                        onVolumeChange={(newVolume) => setInstrumentMasterVolume(index, newVolume)} setProcessSong={setProcessSong} />
                                </div>
                            </div>
                        </h2>
                        <div id={"panelsStayOpen-collapse-" + instrument.name} className="accordion-collapse collapse bg-light" aria-labelledby={"panelsStayOpen-heading-" + instrument.name} >
                            <div className="accordion-body">
                                <div className="row">
                                    <div className="col m-0">
                                        <h6 className="p-0 fst-italic"><b>Gain sliders</b></h6>
                                        {instrument.gains ? (
                                            instrument.gains.map((gain, gainIndex) => (
                                                <div className="row my-2 align-content-center gap-1 m-0">
                                                    <VolumeSliderControl volume={gain} maxVolume={2}
                                                        onVolumeChange={(newGain) => setSongText(setInstrumentGain(songText, instrument, gainIndex, newGain))} setProcessSong={setProcessSong} setMute={(e) => console.log()} isMute={null} />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="row my-2 align-content-center gap-1 m-0 text-muted">No gain values detected</div>
                                        )}
                                    </div>
                                    {/*<div className="col">*/}
                                    {/*    <div className="form-check">*/}
                                    {/*        <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios1" + index} value="option1" defaultChecked />*/}
                                    {/*        <label className="form-check-label" for={"exampleRadios1" + index}>*/}
                                    {/*            Style 1*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="form-check">*/}
                                    {/*        <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios2" + index} value="option2" />*/}
                                    {/*        <label className="form-check-label" for={"exampleRadios2" + index}>*/}
                                    {/*            Style 2*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="form-check">*/}
                                    {/*        <input className="form-check-input" type="radio" name={"exampleRadios" + index} id={"exampleRadios3" + index} value="option3" disabled />*/}
                                    {/*        <label className="form-check-label fst-italic" for={"exampleRadios3" + index}>*/}
                                    {/*            New style coming soon*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="col">*/}
                                    {/*    <div className="form-check">*/}
                                    {/*        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />*/}
                                    {/*        <label className="form-check-label" for="flexCheckDefault">*/}
                                    {/*            Feature 1*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="form-check">*/}
                                    {/*        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />*/}
                                    {/*        <label className="form-check-label" for="flexCheckChecked">*/}
                                    {/*            Feature 2*/}
                                    {/*        </label>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="col">
                                        <h6 className="p-0 fst-italic"><b>Effects</b></h6>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                                            <label className="form-check-label" for="flexSwitchCheckDefault">Bass Boost</label>
                                        </div>
                                    </div>
                                </div>

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