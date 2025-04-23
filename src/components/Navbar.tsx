import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onFavoritesClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onFavoritesClick }) => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h2 style={styles.logo}>Country Explorer</h2>
      </Link>
      <span onClick={onFavoritesClick} style={styles.heart}>
        ❤️
      </span>
    </nav>
  );
};

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    zIndex: 1000,
    boxSizing: "border-box",
  } as React.CSSProperties,

  logoImage: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  } as React.CSSProperties,

  logo: {
    margin: 0,
    fontSize: "1.5rem",
    whiteSpace: "nowrap",
    flex: "1",
    textAlign: "left",
  } as React.CSSProperties,

  heart: {
    cursor: "pointer",
    marginLeft: "20px",
    marginRight: "40px",
    fontSize: "1.5rem",
  } as React.CSSProperties,

  linksContainer: {
    display: "flex",
    flex: "1",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: "15px",
  } as React.CSSProperties,

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    whiteSpace: "nowrap",
  } as React.CSSProperties,
};

export default Navbar;
