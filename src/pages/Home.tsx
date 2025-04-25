import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import Sidebar from "../components/Sidebar";
import React from "react";
import { useCountries } from "../hooks/useCountries";
import { useFavorites } from "../context/FavoritesContext";
import { Country } from "../types/Country";
import "./Home.css";

const Home: React.FC = () => {
  const { countries, loading, error, handleSearch, handleFilterChange } =
    useCountries();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (loading) {
    return <div className="loading">Loading countries...</div>;
  }

    const fetchCountries = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: Response = await fetch(
          `https://restcountries.com/v3.1/name/${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("No countries found");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err: any) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [searchTerm]);

  return (
    <div id="main">
      <div
        id="homeHeader"
        style={{ ...styles.container, ...styles.padding, ...styles.homeHeader }}
      >
        <div style={styles.centerText}>
          <h1 style={styles.title}>START EXPLORING</h1>
        </div>
        <div style={styles.centerText}>
          <h2>
            Travellers are dreamers who make their desires for adventure a
            reality
          </h2>
        </div>
        <div>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div id="searchResults" style={styles.results}>
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            capital={country.capital?.[0] || "N/A"}
            flagUrl={country.flags.png}
            region={country.region}
            languages={Object.values(country.languages || {})}
            currencies={Object.values(country.currencies || {}).map(
              (c) => c.name
            )}
            onFavorite={() => addToFavorites(country)} // Llamamos a la función addToFavorites
            onCustomList={() => console.log("Add to list", country.name.common)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
