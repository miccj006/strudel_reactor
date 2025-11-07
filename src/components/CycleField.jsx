function CycleField({ songText, setSongText, cycleData, setCycleValue, setCycleInterval }) {
    const cpsValue = !isNaN(cycleData.value) ? (Math.round(cycleData.value / (cycleData.isPerMinute ? 60 : 1) * 100) / 100) : "?"
    const cpmValue = !isNaN(cycleData.value) ? (Math.round(cycleData.value * (cycleData.isPerMinute ? 1 : 60) * 100) / 100) : "?"

    return (
        <>
            <div className="input-group-prepstart">
                <button className="btn  btn-outline-primary input-group-text" id="cycle-label" onClick={(e) => setSongText(setCycleInterval(songText, cycleData))}>Set {cycleData.isPerMinute ? "CPM" : "CPS"} ⇅</button>
            </div>
            <input type="text" className="form-control" id="cycle-text-input" placeholder="Insert cycle value here" aria-label="cycle" aria-describedby="cycle-label" value={cycleData.cycleText} onChange={(e) => setSongText(setCycleValue(songText, cycleData, e.target.value))} />
            <div className="input-group-prepend">
                <span className="input-group-text text-muted" id="cycle-label">CPS = {cpsValue}</span>
            </div>
            <div className="input-group-prepend">
                <span className="input-group-text text-muted" id="cycle-label">CPM = {cpmValue}</span>
            </div>
        </>
    );
}

export default CycleField;