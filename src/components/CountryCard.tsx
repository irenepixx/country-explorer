import React from "react";
import { Country } from "../types/Country";
import { FaPlus } from "react-icons/fa";
import FavoriteButton from "./FavoriteButton";

interface CountryCardProps {
  country: Country;
  onFavorite: () => void;
  isFavorite: boolean;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  onFavorite,
  isFavorite,
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
