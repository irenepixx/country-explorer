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

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addFavorite = (item: any) => {
    if (!favorites.find((fav) => fav.name.common === item.name.common)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (item: any) => {
    setFavorites(
      favorites.filter((fav) => fav.name.common !== item.name.common)
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

export const useFavorites = () => useContext(FavoritesContext);
