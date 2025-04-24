import React from "react";

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

const CountryCard: React.FC<CountryCardProps> = ({
  name,
  capital,
  flagUrl,
  region,
  languages,
  currencies,
  onFavorite,
  onCustomList,
}) => {
  return (
    <div style={styles.card}>
      <img src={flagUrl} alt={`${name} flag`} style={styles.flag} />

      <div style={styles.info}>
        <div style={styles.topLeft}>
          <h2 style={styles.countryName}>{name}</h2>
          <p style={styles.capital}>Capital: {capital}</p>
        </div>

        <div style={styles.rightDetails}>
          <p>Region: {region}</p>
          <p>Language: {languages.join(", ")}</p>
          <p>Currency: {currencies.join(", ")}</p>
        </div>

        <div style={styles.actions}>
          <button onClick={onFavorite} style={styles.button}>
            ❤️
          </button>
          <button onClick={onCustomList} style={styles.button}>
            ➕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
