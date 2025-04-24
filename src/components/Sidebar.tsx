import React from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Country[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, favorites }) => {
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
      <div style={styles.lists}>
        <h4>⭐ Favorites</h4>
        <ul></ul>
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
    backgroundColor: "#699fc9",
    borderLeft: "1px  #699fc9",
    padding: "20px",
    transition: "transform 1s ease-in-out",
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
    color: "white",
  } as React.CSSProperties,

  lists: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    width: "auto",
    height: "100%",
    margin: "20px",
  } as React.CSSProperties,
};

export default Sidebar;
