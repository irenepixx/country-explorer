// src/pages/Favorites.tsx
import React from "react";
import FavoritesList from "../components/FavoritesList";

const Favorites: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>My Favorite Countries</h1>
      <FavoritesList />
    </div>
  );
};

const styles = {
  container: {
    padding: "100px 20px 20px", // deja espacio debajo del navbar fijo
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,
};

export default Favorites;
