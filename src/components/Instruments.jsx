import VolumeIcon from '../assets/volume'

function Instruments({ instrumentNames }) {
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
                {instrumentNames.map((d, i) => (
                    <div key={i} className="accordion-item">
                        <div className="accordion-header" id={"heading-" + d} >
                            <div className="accordion-button py-0" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-" + d} aria-expanded="false" aria-controls={"collapse-" + d}>
                                <div className="w-25 m-0 py-3">{d}</div>
                                <input className="form-range m-0 py-3" type="range" min="0" max="1" step="0.01" id="volume-range" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)} />
                                <button className="btn btn-light m-0 mx-3" id="volume-button" onMouseEnter={(e) => DisableAccordion(e)} onMouseLeave={(e) => EnableAccordion(e)}>
                                    <VolumeIcon level={"mute"} />
                                </button>
                            </div>
                        </div>
                        <div id={"collapse-" + d} className="accordion-collapse collapse" aria-labelledby={"heading-" + d} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Data about {d}</strong>
                                <p>Need to add a D3 graph or something! :)</p>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </>


    );
}

export default Instruments;