import React, { useState, useEffect } from "react";
import RatesTable from "./Table/RatesTable";

function App() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        if (data?.rates) {
          setRates(data.rates);
        }
      } catch (err) {
        console.error("Error fetching rates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRates();
  }, []);

  return (
    <div>
      <h1>Forex Rates Table</h1>
      {loading ? <p>Loading</p> : <RatesTable rates={rates} />}
    </div>
  );
}

export default App;
