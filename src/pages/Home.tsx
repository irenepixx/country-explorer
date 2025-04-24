import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CountryCard from "../components/CountryCard";
import Sidebar from "../components/Sidebar";

interface Country {
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string; symbol: string } };
  flags: {
    png: string;
  };
  cca3: string;
}

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
          <h1>START EXPLORING</h1>
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
            onFavorite={() => console.log("Favorited", country.name.common)}
            onCustomList={() => console.log("Add to list", country.name.common)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  padding: {
    paddingTop: "100px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  } as React.CSSProperties,

  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  } as React.CSSProperties,

  homeHeader: {
    backgroundColor: "#080054",
    border: "20px solid #060041",
    borderRadius: "50px",
  } as React.CSSProperties,

  centerText: {
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
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
