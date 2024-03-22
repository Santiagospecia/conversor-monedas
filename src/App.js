import React, { useState, useEffect } from "react";
import { fetchConversionRate, fetchCurrencies } from "./utils/api";
import SwapIcon from "./images/swap.png";
import "./App.css";
import Header from "./components/Header";
import CurrencyInput from "./components/CurrencyInput";
import CurrencySelect from "./components/CurrencySelect";

function App() {
  const [amount, setAmount] = useState("1.00");
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState({});
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState({});
  const [conversionResult, setConversionResult] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      const currencyOptions = await fetchCurrencies();
      setCurrencies(currencyOptions);
      const initialFrom = currencyOptions.find(
        (option) => option.value === "EUR"
      );
      const initialTo = currencyOptions.find(
        (option) => option.value === "USD"
      );
      setSelectedCurrencyFrom(initialFrom || {});
      setSelectedCurrencyTo(initialTo || {});
    };

    loadCurrencies();
  }, []);

  useEffect(() => {
    if (selectedCurrencyFrom.value && selectedCurrencyTo.value) {
      calculateConversion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, selectedCurrencyFrom, selectedCurrencyTo]);

  // Función para intercambiar las monedas
  const handleSwapCurrencies = () => {
    setSelectedCurrencyFrom(selectedCurrencyTo);
    setSelectedCurrencyTo(selectedCurrencyFrom);
  };

  const calculateConversion = async () => {
    if (!amount || !selectedCurrencyFrom.value || !selectedCurrencyTo.value) return;

    const fetchedRate = await fetchConversionRate(
      selectedCurrencyFrom,
      selectedCurrencyTo
    );
    if (fetchedRate && fetchedRate.rate) {
      setRate(fetchedRate);
      setConversionResult((amount * fetchedRate.rate).toFixed(6));
    } else {
      setConversionResult("Error al calcular la conversión");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate().toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${month} ${day}, ${year}`;
  };
  return (
    <div className="App">
      <div>
        <Header text="Currency exchange" />
        <div className="conversion-text">
          {amount} {selectedCurrencyFrom.value} to {selectedCurrencyTo.value} -
          Convert {selectedCurrencyFrom.label} to {selectedCurrencyTo.label}
        </div>
        <div className="main-content">
          <div className="card">
            <div className="currency-container">
              <CurrencyInput
                value={amount}
                onChange={setAmount}
                title="Amount"
              />
              <CurrencySelect
                title="From"
                value={selectedCurrencyFrom.value}
                onChange={(e) => {
                  const selectedOption = currencies.find(
                    (option) => option.value === e.target.value
                  );
                  setSelectedCurrencyFrom(selectedOption);
                }}
                options={currencies}
              />
              <button onClick={handleSwapCurrencies} className="swap-button">
                <img src={SwapIcon} alt="Swap" />
              </button>
              <CurrencySelect
                title="To"
                value={selectedCurrencyTo.value}
                onChange={(e) => {
                  const selectedOption = currencies.find(
                    (option) => option.value === e.target.value
                  );
                  setSelectedCurrencyTo(selectedOption);
                }}
                options={currencies}
              />
            </div>
            <div className="conversion-result">
              {conversionResult && (
                <div>
                  <strong>
                    {amount} {selectedCurrencyFrom.label} = <br />{" "}
                    {conversionResult} {selectedCurrencyTo.label}
                  </strong>
                  <p>
                    1 {selectedCurrencyFrom.value} = {rate.rate}{" "}
                    {selectedCurrencyTo.value}{" "}
                  </p>
                </div>
              )}
            </div>
            <div className="info-container">
            <div className="info-card">
                <p>We use the mid-market rate for our Converter. This is for informational purposes only. You won't receive this rate when sending money.</p>
            </div>
            <div className="info-request">
            {selectedCurrencyFrom.label} to {selectedCurrencyTo.label} conversion - Last updated {formatDate(rate?.date)}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
