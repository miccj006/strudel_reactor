function PlayButtons({ onPlay, onStop, songIsPlaying }) {
    const playButton = <button id="play" className="btn btn-primary" onClick={onPlay}>Play</button>
    const stopButton = <button id="stop" className="btn btn-danger" onClick={onStop}>Stop</button>

    const getButton = () => {
        return songIsPlaying ? stopButton : playButton
    }

    return (
        <div className="btn-group w-100" role="group" aria-label="Basic mixed styles example">
            {getButton()}
        </div>
    );
}

export default PlayButtons;