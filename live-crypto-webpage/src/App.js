import "./App.css";
import React, { useState, useEffect } from "react";
import { getCoinData } from "./services/api";
function App() {
  const [listOfCoins, setCoinData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getCoinData();
      setCoinData(data);
    };
  }, []);

  return (
    <div>
      <h1>Live Crypto</h1>
    </div>
  );
}

export default App;
