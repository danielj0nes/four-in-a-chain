import "./App.css";
import React, { useEffect, useState } from "react";
import { init, storeP } from "./client"

function App() {
  const [storedf, setStored] = useState(false);
  const storeT = () => {
    storeP()
      .then((tx) => {
        console.log(tx);
        setStored(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
  <div className="App">
    {!storedf ? (
      <button onClick={() => storeT()}>Store</button>
    ) : (
      <p>Stored!</p>
    )}
  </div>
  );
}

export default App;
