import "./App.css";
import React, { useState, useEffect } from "react";
import { getCoinData } from "./services/api";
import CoinCard from "./components/coinCard";
function App() {
  const [listOfCoins, setCoinData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getCoinData();
      setCoinData(data);
    };
    const interval = setInterval(() => {
      fetchAPI();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Live Crypto</h1>
      {listOfCoins.map((crypto) => {
        return (
          <CoinCard
            key={crypto.id}
            name={crypto.name}
            price={crypto.current_price}
            image={crypto.image}
            priceChange={crypto.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
