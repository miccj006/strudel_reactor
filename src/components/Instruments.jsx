import VolumeIcon from '../assets/volume'

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
            <h4>Instruments</h4>
            <div className="accordion" id="accordionExample">
                {instruments.map((instrument, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header" id={"heading-" + instrument.name} >
                            <div className="accordion-button py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + instrument.name} aria-expanded="false" aria-controls={"collapse-" + instrument.name}>
                                <div className="w-25 m-0 py-3">{instrument.name}</div>
                                <input className="form-range m-0 py-3" type="range" min="0" max="1" step="0.01" id="volume-range" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} />
                                <button className="btn btn-light m-0 mx-3" id="volume-button" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} onClick={(e) => setSongText(toggleMuteInstrument(songText, instrument))}>
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