import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Country } from "../types/Country";
import "./FavoriteButton.css";

interface FavoriteButtonProps {
  country: Country;
  isFavorite: boolean;
  onToggle: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <button
      className="favorite-button"
      onClick={onToggle}
      aria-label={`${isFavorite ? "Remove from" : "Add to"} favorites`}
    >
      {isFavorite ? (
        <FaHeart className="heart-icon filled" />
      ) : (
        <FaRegHeart className="heart-icon" />
      )}
    </button>
  );
};

export default FavoriteButton;
