import React from "react";
import "../index.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
  onSearch,
}) => {
  return (
    <div style={styles.container}>
      <select
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
        style={styles.dropdown}
      >
        <option value="name">Name</option>
        <option value="region">Region</option>
        <option value="capital">Capital</option>
        <option value="currency">Currency</option>
        <option value="lang">Language</option>
      </select>

      <input
        type="text"
        placeholder={`Search by ${selectedFilter}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      <button onClick={onSearch} style={styles.button}>
        🔍
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  } as React.CSSProperties,

  dropdown: {
    width: "25%",
    maxWidth: "200px",
    borderRadius: "8px",
    border: "1px solid transparent",
    padding: "0.6em 1.2em",
    color: "inherit",
    fontSize: "1em",
    fontWeight: "500",
    fontFamily: "inherit",
    cursor: "pointer",
    transition: "border-color 0.25s",
  } as React.CSSProperties,

  input: {
    padding: "10px",
    fontSize: "16px",
    width: "50%",
    maxWidth: "500px",
  } as React.CSSProperties,
};

export default SearchBar;
