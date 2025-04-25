// src/components/FavoritesList.tsx
import React from "react";
import { useFavorites } from "../context/FavoritesContext"; // lo explicamos abajo

const FavoritesList: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return <p>You have no favorite countries yet.</p>;
  }

  return (
    <div style={styles.grid}>
      {favorites.map((country: any) => (
        <div key={country.name.common} style={styles.card}>
          <h3>{country.name.common}</h3>
          <button onClick={() => removeFavorite(country)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  } as React.CSSProperties,
  card: {
    padding: "15px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    textAlign: "center",
  } as React.CSSProperties,
};

export default FavoritesList;
