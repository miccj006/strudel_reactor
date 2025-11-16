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
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

import MasterControls from './components/MasterControls';
import PreprocessTextArea from './components/PreprocessTextArea';
import Instruments from './components/Instruments';
import getInstruments from './utils/getInstruments';
import processText from './utils/processText';

let globalEditor = null;

const handleD3Data = (event) => {
    function convertNoteToJson(text) {
        const params = text.split(': ')[1];
        const paramMatches = params.match(/\w+:[^\s]+/g);
        const parameters = {};

        paramMatches.forEach(match => {
            const [key, value] = match.split(':');
            parameters[key] = isNaN(value) ? value : parseFloat(value);
        })

        const result = {
            ...parameters
        };

        return result
    }

    function convertNotesToJson(arrayOfNotes) {
        const notes = [];
        arrayOfNotes.forEach(note => {
            notes.push(convertNoteToJson(note))
        })
        return notes
    }

    function getGainOfNotes(notes) {
        const noteGains = [];
        notes.forEach(note => {
            noteGains.push(note.gain ? note.gain : 0)
        })
        return noteGains
    }

    // Get array of note gain values
    const notes = convertNotesToJson(event.detail)
    const noteGains = getGainOfNotes(notes)


    // Get the SVG and the dimensions
    const svg = d3.select("#d3-svg");
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;

    const margin = { left: 25, right: 0, bottom: 10, top: 10 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom

    // Clear the graph
    svg.selectAll("*").remove()

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create scales and axis
    const xScale = d3.scaleBand()
        .domain(noteGains.map((d, i) => i))
        .range([0, chartWidth])
        .padding(0.3);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(noteGains)])
        .range([chartHeight, 0]);

    const yAxis = d3.axisLeft(yScale)
        .ticks(2)
        .tickFormat(d => d.toFixed(1))

    g.append("g")
        .classed("y-axis", true)
        .call(yAxis)
        .style("color", "gray")

    // Add bars showing gain values
    g.selectAll("rect")
        .data(noteGains)
        .join("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => chartHeight - yScale(d))
        .attr("fill", "gray")
        .attr("opacity", (d, i) => (i + 1) / noteGains.length)
};


export default function StrudelDemo() {
    const hasRun = useRef(false);
    const [songIsPlaying, SetSongIsPlaying] = useState(false);
    const handlePlay = () => {
        if (songText.length > 0) {
            globalEditor.evaluate()
            SetSongIsPlaying(true);
        } else {
            alert("Song text is empty, please add some code to play.")
        }
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
    const getInstrumentMasterVolumes = () => {
        let volumes = []
        for (let index = 0; index < instruments.length; index++) {
            volumes[index] = 1
        }
        return volumes
    };
    const [instrumentMasterVolumes, setInstrumentMasterVolumes] = useState(getInstrumentMasterVolumes())
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
        setInstruments(getInstruments(songText))
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
        globalEditor.setCode(processText(songText, masterVolume, masterMute, instruments, instrumentMasterVolumes));
    }, [songText, processSong, masterMute]);

    useEffect(() => {
        //globalEditor.setCode(processText(songText, masterVolume, masterMute, instruments, instrumentMasterVolumes));

        if (songIsPlaying) {
            handlePlay()
        }

        setProcessSong(false)
    }, [processSong]);


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
                        <div className="position-relative p-3 m-2 rounded shadow bg-light-gray" id='canvas-view'>
                            <div className="position-absolute p-2 mx-0 text-secondary row" style={{ left: 0, right: 0 }}>
                                <h6 className="col mx-2"><b>Piano View</b></h6>
                                <h6 className="col mx-2 text-end"><i>Strudle Graph</i></h6>
                            </div>
                            <canvas className="bg-dark rounded shadow-sm" id="roll"></canvas>
                        </div>
                        <div className="position-relative p-3 m-2 rounded shadow bg-light-gray" id='canvas-view'>
                            <div className="position-absolute p-2 mx-0 text-secondary row" style={{ left: 0, right: 0 }}>
                                <h6 className="col mx-2"><b>Note Gains View</b></h6>
                                <h6 className="col mx-2 text-end"><i>D3 Graph</i></h6>
                            </div>
                            <div className="bg-dark p-3 pt-4 pb-1 rounded shadow-sm text-secondary" id="d3-graph">
                                <svg className="w-100" id="d3-svg"></svg>
                            </div>
                        </div>
                        <Instruments songText={songText} setSongText={setSongText} setProcessSong={setProcessSong} instrumentMasterVolumes={instrumentMasterVolumes} setInstrumentMasterVolumes={setInstrumentMasterVolumes} />
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