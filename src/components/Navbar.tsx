import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Country Explorer</h2>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/favorites" style={styles.link}>
          Favorites
        </Link>
      </div>
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

  logo: {
    margin: 0,
    fontSize: "1.5rem",
    whiteSpace: "nowrap",
    flex: "1",
    textAlign: "left",
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
