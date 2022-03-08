import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import xmlJs from "xml-js";

function App() {
  const [json, setJson] = useState({});

  useEffect(() => {
    axios.get("A_Lenda-Marimbondo-MVP-11.0.mscx").then((response) => {
      const xml = response.data;
      const json = xmlJs.xml2js(xml, { compact: true });
      setJson(json);

      console.log(json);
    });
  }, []);

  return (
    <div className="App">
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </div>
  );
}

export default App;
