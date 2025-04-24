import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <button onClick={onClose} style={styles.closeButton}>
        ×
      </button>

      <h3>❤️ My Lists</h3>
      <div>
        <h4>⭐ Favorites</h4>
        <ul>{/* here favorites list */}</ul>
        <h4>📌 Go to Next</h4>
        <ul>{/* here go to next list */}</ul>
        <h4>✈️ Already Visited</h4>
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
    transition: "transform 1s ease-in-out",
    zIndex: 1001,
    overflowY: "auto",
    boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.1)",
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
