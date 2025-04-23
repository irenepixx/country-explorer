import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "20px",
    textAlign: "center",
  } as React.CSSProperties,
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "80%",
    maxWidth: "500px",
  } as React.CSSProperties,
};

export default SearchBar;
