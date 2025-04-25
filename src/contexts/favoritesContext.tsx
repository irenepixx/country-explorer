import React, { createContext, useContext, useState, useEffect } from "react";
import { Country } from "../types/Country";

interface FavoritesContextType {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (countryCode: string) => void;
  isFavorite: (countryCode: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (country: Country) => {
    if (!favorites.find((fav) => fav.name.common === country.name.common)) {
      setFavorites([...favorites, country]);
    }
  };

  const removeFavorite = (country: Country) => {
    setFavorites(
      favorites.filter((fav) => fav.name.common !== country.name.common)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
