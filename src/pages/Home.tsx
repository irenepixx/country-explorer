import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import Sidebar from "../components/Sidebar";
import { Country } from "../types/Country";

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<Country[]>([]);

  const addToFavorites = (country: Country) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((item) => item.cca3 === country.cca3)) {
        return prevFavorites;
      }
      return [...prevFavorites, country];
    });
  };

  useEffect(() => {
    if (!searchTerm) {
      setCountries([]);
      return;
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

const styles = {
  padding: {
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  } as React.CSSProperties,

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    textAlign: "center",
  } as React.CSSProperties,

  homeHeader: {
    width: "calc(100vw - 40px)", // 20px de cada lado
    margin: "0 auto",
    backgroundColor: "#080054",
    border: "20px solid #060041",
    borderRadius: "50px",
    boxSizing: "border-box",
  } as React.CSSProperties,

  centerText: {
    width: "100%",
    textAlign: "center",
  } as React.CSSProperties,

  title: {
    fontSize: "clamp(2rem, 6vw, 4rem)",
    margin: 0,
    lineHeight: 1.2,
    color: "#fff",
    fontWeight: "bold",
    textWrap: "balance" as any,
  } as React.CSSProperties,

  results: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    gap: "20px",
    marginTop: "20px",
  } as React.CSSProperties,
};

export default Home;
