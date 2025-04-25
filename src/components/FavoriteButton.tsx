import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Country } from "../types/Country";

interface FavoriteButtonProps {
  country: Country;
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
}) => {
  return (
  );
};

export default FavoriteButton;
