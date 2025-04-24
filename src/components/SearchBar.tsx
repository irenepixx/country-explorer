import React from "react";

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
    marginBottom: "20px",
    textAlign: "center",
  } as React.CSSProperties,

  dropdown: {
    padding: "10px",
    fontSize: "16px",
    width: "20%",
    maxWidth: "200px",
    borderRadius: "8px",
  } as React.CSSProperties,

  input: {
    padding: "10px",
    fontSize: "16px",
    width: "80%",
    maxWidth: "500px",
  } as React.CSSProperties,
};

export default SearchBar;
