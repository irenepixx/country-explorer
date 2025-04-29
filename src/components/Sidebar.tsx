import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { Country } from "../types/Country";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Country[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, favorites }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isOpen) {
        touchStartX.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isOpen || touchStartX.current === null) return;

      const touchX = e.touches[0].clientX;
      const startX = touchStartX.current;

      if (startX - touchX > 50) {
        touchStartX.current = null;
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpen, onClose]);

  const renderCountryList = (countries: Country[]) => {
    if (countries.length === 0) {
      return <p className="empty-message">No countries added yet</p>;
    }

    return (
      <ul className="favorites-list">
        {countries.map((country) => (
          <li key={country.cca3} className="favorite-item">
            <Link to={`/country/${country.name.common}`} onClick={onClose}>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                className="favorite-flag"
              />
              <span>{country.name.common}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
      <aside
        ref={sidebarRef}
        className={`sidebar ${isOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="My Lists"
      >
        <div className="sidebar-header">
          <h3>My Lists</h3>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="lists-container">
          <div className="list-section">
            <h4>⭐ Favorites</h4>
            {renderCountryList(favorites)}
          </div>

          <div className="list-section">
            <h4>✈️ Want to Visit</h4>
            {/* here list want to visit */}
          </div>

          <div className="list-section">
            <h4>📌 Already Visited</h4>
            {/* here list already visited */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
