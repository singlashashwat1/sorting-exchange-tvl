import React, { useState, useEffect } from "react";

export const ExchangeList = () => {
  const [currency, setCurrency] = useState("BTC");
  const [data, setData] = useState(null);

  const fetchData = async (currency) => {
    const reponse = await fetch("http://localhost:3334/volume");
    const data = await reponse.json();
    const sortedData = data && data.sort((a, b) => b.volume - a.volume);
    const currencyData =
      sortedData && sortedData.filter((item) => item.currency === currency);
    setData(currencyData);
  };
  useEffect(() => {
    fetchData(currency);
  }, [currency]);

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h1>Exchange List</h1>
      <button onClick={() => setCurrency("BTC")}>BTC</button>
      <button onClick={() => setCurrency("ETH")}>ETH</button>
      <ul>
        {data &&
          data.slice(0, 5).map((item) => <li key={item.name}>{item.name}</li>)}
      </ul>
    </div>
  );
};

export default ExchangeList;
