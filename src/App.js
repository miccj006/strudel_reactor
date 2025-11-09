import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';

import MasterControls from './components/MasterControls';
import PreprocessTextArea from './components/PreprocessTextArea';
import Instruments from './components/Instruments';
import getInstruments from './utils/getInstruments';
import processText from './utils/processText';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {
    const hasRun = useRef(false);
    const [songIsPlaying, SetSongIsPlaying] = useState(false);
    const handlePlay = () => {
        globalEditor.evaluate()
        SetSongIsPlaying(true);
    };
    const handleStop = () => {
        globalEditor.stop()
        SetSongIsPlaying(false);
    };
    const [songText, setSongText] = useState(stranger_tune);
    const [masterVolume, setMasterVolume] = useState(0.2);
    const [masterMute, setMasterMute] = useState(false);
    const [processSong, setProcessSong] = useState(true);
    const [instruments, setInstruments] = useState(getInstruments(songText));
    const [width, setWidth] = useState(window.innerWidth); // reference from: https://stackoverflow.com/questions/69228336/how-to-call-useeffect-when-browser-is-resized
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    // Resize canvas upon screen resize
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        const canvas = document.getElementById('roll')
        const canvasView = document.getElementById('canvas-view')
        const padding = parseInt(window.getComputedStyle(canvasView).paddingLeft) + parseInt(window.getComputedStyle(canvasView).paddingRight);
        canvas.width = canvasView.offsetWidth - padding;

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    })

    // Demo Effect
    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            const drawContext = canvas.getContext('2d');
            const drawTime = [-0.1, 0.1]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
        }
        globalEditor.setCode(processText(songText, masterVolume, masterMute));
        if (songIsPlaying) {
            handlePlay()
        }
    }, [songText, processSong, masterMute]);


    return (
        <div className="bg-gray d-flex flex-column min-vh-100">
            <header className="w-100 bg-light-gray text-muted p-2 mb-4 px-4 shadow" >
                <div className="h4 m-0"><b>Music Mixer</b></div>
                <div className="h6 mb-1 mx-3 fst-italic text-secondary">Powered by Strudle</div>
            </header>
            <main className="p-4 pt-0">
                <div className="container-fluid row">
                    <div className="col-8">
                        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreprocessTextArea songText={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="rounded shadow" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                    <div className="col-4">
                        <MasterControls onPlay={handlePlay} onStop={handleStop} songIsPlaying={songIsPlaying} songText={songText} setSongText={setSongText} masterVolume={masterVolume}
                            masterMute={masterMute} setMasterMute={setMasterMute}
                            onMasterVolumeChange={setMasterVolume} setProcessSong={setProcessSong} />
                        <div className="p-3 m-2 rounded shadow bg-light-gray" id='canvas-view'>
                            <canvas className="bg-dark rounded shadow-sm" id="roll" ></canvas>
                        </div>
                        <Instruments songText={songText} setSongText={setSongText} setProcessSong={setProcessSong} />
                    </div>
                </div>
            </main >
            <footer className="w-100 bg-light-gray text-muted mt-auto p-2 text-center" >
                <div className="h5 m-0">Christian Micallef</div>
                <div className="h6">University of South Australia - 2025</div>
            </footer>
        </div >
    );
}