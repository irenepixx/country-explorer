import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div style={{ ...styles.sidebar, right: isOpen ? 0 : "-50%" }}>
      <button onClick={onClose} style={styles.closeButton}>
        ×
      </button>
      <h2>⭐ My Lists</h2>
      <div>
        <h3>❤️ Favorites</h3>
        <ul>{/* here favorites list */}</ul>
        <h3>📌 Go to Next</h3>
        <ul>{/* here go to next list */}</ul>
        <h3>✈️ Already Visited</h3>
        <ul>{/* here already visited list */}</ul>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    backgroundColor: "#fff",
    borderLeft: "1px solid #ddd",
    padding: "20px",
    transition: "right 0.3s ease-in-out",
    zIndex: 1001,
    overflowY: "auto",
  } as React.CSSProperties,
  closeButton: {
    position: "absolute",
    top: 10,
    right: 15,
    fontSize: "24px",
    background: "none",
    border: "none",
    cursor: "pointer",
  } as React.CSSProperties,
};

export default Sidebar;
