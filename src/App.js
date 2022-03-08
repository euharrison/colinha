import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import xmlJs from "xml-js";

const notes2 = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const notes = [
  "DO",
  "DO#",
  "RE",
  "RE#",
  "MI",
  "FA",
  "FA#",
  "SOL",
  "SOL#",
  "LA",
  "LA#",
  "SI",
];

const tcpMap = {
  "-1": "Fbb",
  0: "Cbb",
  1: "Gbb",
  2: "Dbb",
  3: "Abb",
  4: "Ebb",
  5: "Bbb",
  6: "Fb",
  7: "Cb",
  8: "Gb",
  9: "Db",
  10: "Ab",
  11: "Eb",
  12: "Bb",
  13: "F",
  14: "C",
  15: "G",
  16: "D",
  17: "A",
  18: "E",
  19: "B",
  20: "F",
  21: "C",
  22: "G",
  23: "D#",
  24: "A#",
  25: "E#",
  26: "B#",
  27: "F##",
  28: "C##",
  29: "G##",
  30: "D##",
  31: "A##",
  32: "E##",
  33: "B##",
};

function pitchToNote(pitch) {
  const value = Number(pitch) % notes.length;
  return notes[value];
}

function ChordItem(props) {
  const { Note, durationType } = props;
  return (
    <div>
      {pitchToNote(Note.pitch?._text)} | {tcpMap[Note.tpc?._text]} | pitch:{" "}
      {Note.pitch?._text} | tpc: {Note.tpc?._text} | duration:{" "}
      {durationType._text}
    </div>
  );
}

function MeasureItem(props) {
  const { voice } = props;

  if (!voice?.Chord) {
    console.log("!voice?.Chord", props);
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }

  const array = Array.isArray(voice.Chord) ? voice.Chord : [voice.Chord];

  return (
    <div style={{ marginBottom: 10 }}>
      {array.map((item, i) => (
        <ChordItem key={i} {...item} />
      ))}
    </div>
  );
}

function App() {
  const [json, setJson] = useState(null);

  useEffect(() => {
    axios.get("A_Lenda-Marimbondo-MVP-11.0-Tuba.mscx").then((response) => {
      const xml = response.data;
      const json = xmlJs.xml2js(xml, { compact: true });
      console.log("File loaded:", json);
      setJson(json);
    });
  }, []);

  if (!json) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {json.museScore.Score.Staff.Measure.map((item, i) => (
        <MeasureItem key={i} {...item} />
      ))}
    </div>
  );
}

export default App;
