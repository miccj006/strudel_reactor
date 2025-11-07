import VolumeIcon from '../assets/VolumeIcon'

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
    function getInstruments(songText) {
        function getInstrumentText(songText) {
            // I used "https://regex101.com/" to make this regex
            // This regex captures an instrument found within a strudle song text code
            const instrumentRegex = /\n\s+?(?=\b[\w-]+:)[\s\S]+?(?=(\)[\s\n]*[/\w]))\)/g
            const instrumentTexts = songText.match(instrumentRegex);

            instrumentTexts.forEach((text, index) => {
                instrumentTexts[index] = text.trim();
            })

            return instrumentTexts
        }
        function getInstrumentValues(instrumentTexts) {
            const instruments = [];

            instrumentTexts.forEach((text, index) => {
                let rawName = text.slice(0, text.indexOf(':'));
                let name = rawName.match(/(?!_)\w+/);
                let mute = text[0] == '_' ? true : false;
                let gain = text.slice(text.indexOf('gain(') + 5, text.indexOf(')', text.indexOf('gain(')));
                //let postGain = text.slice(text.indexOf('.postgain(', ')'));

                let instrument = {
                    rawName: rawName,
                    name: name,
                    mute: mute,
                    gain: gain,
                    //postGain: postGain,
                    text: text
                }

                instruments[index] = instrument
            })

            return instruments
        }

        const instrumentTexts = getInstrumentText(songText);
        const instruments = getInstrumentValues(instrumentTexts);

        console.log(instruments[0].gain)
        return instruments
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
            <div className="accordion rounded shadow" id="accordionExample">
                {instruments.map((instrument, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header" id={"heading-" + instrument.name} >
                            <div className="accordion-button collapsed py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + instrument.name} aria-expanded="false" aria-controls={"collapse-" + instrument.name}>
                                <div className="w-25 m-0 py-3">{instrument.name}</div>
                                {/*<input className="form-range m-0 py-3" type="range" min="0" max="1" step="0.01" id="volume-range" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} />*/}
                                {/*<button className="btn btn-light m-0 mx-3" id="volume-button" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} onClick={(e) => setSongText(toggleMuteInstrument(songText, instrument))}>*/}
                                {/*    <VolumeIcon volume={1} maxVolume={1} isMute={instrument.mute} />*/}
                                {/*</button>*/}
                                VOLUM SLIDER TEMP REMOVED
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