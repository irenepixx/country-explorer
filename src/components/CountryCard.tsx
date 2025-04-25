import React from "react";
import { Country } from "../types/Country";

interface CountryCardProps {
  name: string;
  capital: string;
  flagUrl: string;
  region: string;
  languages: string[];
  currencies: string[];
  onFavorite: () => void;
  onCustomList: () => void;
}

  name,
  capital,
  flagUrl,
  region,
  languages,
  currencies,
export const CountryCard: React.FC<CountryCardProps> = ({
  onFavorite,
  onCustomList,
}) => {
  return (
    <div className="country-card">
      <div className="flag-container">
        <img
          className="flag-img"
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="country-name">{country.name.common}</h3>
        <div>
          <p className="info-item">
            <span className="info-label">Population:</span>
            {country.population.toLocaleString()}
          </p>
          <p className="info-item">
            <span className="info-label">Region:</span>
            {country.region}
          </p>
          <p className="info-item">
            <span className="info-label">Capital:</span>
            {country.capital?.[0]}
          </p>
        </div>
      </div>
      <div className="card-actions">
        <button
          className="action-button"
          /* onClick={handlePlusClick}*/
          aria-label="Add to list"
        >
          <FaPlus />
        </button>
        <FavoriteButton
          country={country}
          isFavorite={isFavorite}
          onToggle={onFavorite}
        />
      </div>
    </div>
  );
};

const styles = {
  results: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center", // Centra horizontalmente
    gap: "20px",
    width: "100%",
    padding: "20px 0",
  } as React.CSSProperties,

  card: {
    width: "250px", // Tamaño fijo, no cambia
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    boxSizing: "border-box",
  } as React.CSSProperties,

  flag: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
  } as React.CSSProperties,

  info: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  } as React.CSSProperties,

  topLeft: {
    marginBottom: "10px",
  } as React.CSSProperties,

  countryName: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#080054",
  } as React.CSSProperties,

  capital: {
    margin: 0,
    fontStyle: "italic",
    color: "#555",
  } as React.CSSProperties,

  rightDetails: {
    marginTop: "10px",
    fontSize: "0.95rem",
    lineHeight: 1.5,
  } as React.CSSProperties,

  p: {
    color: "#555",
  } as React.CSSProperties,

  actions: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  } as React.CSSProperties,

  button: {
    background: "none",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.2s",
  } as React.CSSProperties,
};

