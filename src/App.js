import React, { useState, useEffect } from "react";
import "./App.css";

function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const jsonData = await response.json();

        setCountries(jsonData);
        setFilteredCountries(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term)
    );

    setFilteredCountries(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data. Please try again later.</div>;

  return (
    <div className="Countries">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="country-list">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.code} className="countryCard">
              <img
                src={country.png}
                alt={`Flag of ${country.common}`}
                className="flag"
              />
              <h3>{country.common}</h3>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Countries;
