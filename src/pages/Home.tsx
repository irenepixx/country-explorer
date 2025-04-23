import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

interface Country {
  name: {
    common: string;
  };
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
    <div style={{ paddingTop: "100px", padding: "20px" }}>
      <div>
        <h1>Start Exploring</h1>
      </div>
      <div>
        <p>
          Travellers are dreamers who make their desires for adventure a
          reality.
        </p>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={styles.results}>
        {countries.map((country) => (
          <div key={country.cca3} style={styles.card}>
            <img
              src={country.flags.png}
              alt={country.name.common}
              style={styles.flag}
            />
            <h3>{country.name.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
