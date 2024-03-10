import React, { useState } from "react";
import "./App.css";
import GainLooser from "./GainLooser";
export default function App() {
  const [stockData, setStockData] = useState(null);
  const [stockSymbol, setStockSymbol] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store input value
  function convertMarketCapToCrore(marketCap) {
    return (marketCap / Math.pow(10, 7)).toFixed(2) + " cr";
  }
  async function fetchData() {
    if (!stockSymbol) {
      setErrorMessage("Please enter stock name");
      return;
    }
    const StockOverview = `https://real-time-finance-data.p.rapidapi.com/stock-overview?symbol=${stockSymbol}%3ANSE&language=en`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f8291c67admsh0f86d252f35a9a3p1dd96ajsnb8daba0c0b90",
        "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(StockOverview, options);
      const result = await response.json();
      console.log(result);
      setStockData(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  const handleInputChange = (e) => {
    setStockSymbol(e.target.value);
    setErrorMessage("");
  };
  return (
    <div className="container">
      <div className="Heading">
        <h1>Stock Search-NSE</h1>
      </div>
      <div className="row mx-5 SearchWrapper">
        <div className="col-9">
          <input
            id="StockName"
            className="form-control"
            placeholder="Enter Stock name"
            value={stockSymbol}
            onChange={handleInputChange}
            required={true}
          />
        </div>
        <div className="col-1">
          <button onClick={fetchData} className="btn btn-primary">
            Search
          </button>
        </div>
        <div className="col-7">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
      </div>
      <div className="aside">
          <GainLooser />
        </div>
      <div className="main-content">
      <div className="row StockDetails">
        {stockData && <h2>Stock Details</h2>}
      </div>
      {stockData && (
        <div class="row">
          <p class="col-l">
            <b>Name: </b>
            {stockData.name}
          </p>
          <p class="col-l">
            <b>About:</b> {stockData.about}
          </p>
          <p class="col-l">
            <b>Company Website: </b>
            {stockData.company_website}
          </p>
          <p class="col-3">
            <b>Market Cap: </b>
            {convertMarketCapToCrore(stockData.company_market_cap)}
          </p>
          <p class="col-3">
            <b>Price: </b>
            {stockData.price}
          </p>
          <p class="col-3">
            <b>P/E ratio: </b>
            {stockData.company_pe_ratio}
          </p>
          <p class="col-3">
            <b>Dividend Yeild: </b>
            {stockData.company_dividend_yield}
          </p>
          <p class="col-3">
            <b>Open: </b>
            {stockData.open}
          </p>
          <p class="col-3">
            <b>High: </b>
            {stockData.high}
          </p>
          <p class="col-3">
            <b>Low: </b>
            {stockData.low}
          </p>
          <p class="col-3">
            <b>Volume: </b>
            {stockData.volume}
          </p>
          <p class="col-3">
            <b>Previous Close: </b>
            {stockData.previous_close}
          </p>
          <p class="col-3">
            <b>Change: </b>
            {stockData.change}
          </p>
          <p class="col-3">
            <b>Change Percent: </b>
            {stockData.change_percent}
          </p>
          <p class="col-3">
            <b>Year Low: </b>
            {stockData.year_low}
          </p>
          <p class="col-3">
            <b>Year High: </b>
            {stockData.year_high}
          </p>
          <p class="col-3">
            <b>Company Ceo: </b>
            {stockData.company_ceo}
          </p>
          <p class="col-3">
            <b>Company Employees: </b>
            {stockData.company_employees}
          </p>
          <p class="col-3">
            <b>Last updated: </b>
            {stockData.last_update_utc}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}