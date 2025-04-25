import React from "react";
import { CountryCard } from "../components/CountryCard";
import { SearchBar } from "../components/SearchBar";
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

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleFavoriteToggle = (country: Country) => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">Start exploring</h1>
        <p className="hero-subtitle">
          Travelers are dreamers who make their desires for adventure a reality.
        </p>
      </div>
      <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="countries-grid">
        {countries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onFavorite={() => handleFavoriteToggle(country)}
            isFavorite={isFavorite(country.cca3)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
