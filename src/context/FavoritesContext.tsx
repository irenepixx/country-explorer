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
  const [favorites, setFavorites] = useState<Country[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country: Country) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.cca3 === country.cca3)) {
        return [...prev, country];
      }
      return prev;
    });
  };

  const removeFavorite = (countryCode: string) => {
    setFavorites((prev) =>
      prev.filter((country) => country.cca3 !== countryCode)
    );
  };

  const isFavorite = (countryCode: string) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
