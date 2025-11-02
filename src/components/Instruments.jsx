function Instruments({ instrumentNames }) {
    return (
        <>
            <h4>Instruments</h4>
            <div className="d-flex flex-column">
                {instrumentNames.map((d, i) => (
                    <div key={i} className="btn btn-outline-secondary">
                        {d}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Instruments;