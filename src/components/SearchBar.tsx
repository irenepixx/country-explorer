import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronUp, FaSlidersH } from "react-icons/fa";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string, category: "name" | "region" | "capital") => void;
  onFilterChange: (filters: {
    population: { min: number; max: number };
    currency: string;
    language: string;
  }) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<
    "name" | "region" | "capital"
  >("name");
  const [showFilters, setShowFilters] = useState(false);
  const [populationRange, setPopulationRange] = useState({
    min: 0,
    max: 350000000,
  });
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const filtersRef = useRef<HTMLDivElement>(null);

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Add smooth scroll when filters open on mobile
  useEffect(() => {
    if (showFilters && isMobile && filtersRef.current) {
      setTimeout(() => {
        filtersRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showFilters, isMobile]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query, searchCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as "name" | "region" | "capital";
    setSearchCategory(category);
    onSearch(searchQuery, category);
  };

  const handlePopulationChange = (type: "min" | "max", value: number) => {
    const newRange = {
      ...populationRange,
      [type]: value,
    };
    setPopulationRange(newRange);
    onFilterChange({
      population: newRange,
      currency: selectedCurrency,
      language: selectedLanguage,
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    onFilterChange({
      population: populationRange,
      currency,
      language: selectedLanguage,
    });
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onFilterChange({
      population: populationRange,
      currency: selectedCurrency,
      language,
    });
  };

  const formatPopulation = (value: number) => {
    if (value >= 350000000) return "350M+";
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const resetFilters = () => {
    setPopulationRange({ min: 0, max: 350000000 });
    setSelectedCurrency("");
    setSelectedLanguage("");
    onFilterChange({
      population: { min: 0, max: 350000000 },
      currency: "",
      language: "",
    });
  };

  return (
    <div className="search-bar">
      <div className="search-container">
        <div className="search-row">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <select
            value={searchCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            <option value="name">Name</option>
            <option value="region">Region</option>
            <option value="capital">Capital</option>
          </select>
        </div>

        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
          aria-controls="advanced-filters"
        >
          {showFilters ? (
            <>
              <FaChevronUp /> Hide Filters
            </>
          ) : (
            <>
              <FaSlidersH /> Show Filters
            </>
          )}
        </button>
      </div>

      {showFilters && (
        <div id="advanced-filters" className="filters" ref={filtersRef}>
          <div className="filter-group">
            <label className="filter-label">Population Range:</label>
            <div className="population-range">
              <div className="range-slider">
                <input
                  type="range"
                  min="0"
                  max="350000000"
                  step="1000000"
                  value={populationRange.min}
                  onChange={(e) =>
                    handlePopulationChange("min", parseInt(e.target.value))
                  }
                  className="range-slider__range range-slider__range--min"
                />
                <input
                  type="range"
                  min="0"
                  max="350000000"
                  step="1000000"
                  value={populationRange.max}
                  onChange={(e) =>
                    handlePopulationChange("max", parseInt(e.target.value))
                  }
                  className="range-slider__range range-slider__range--max"
                />
                <div className="range-slider__track"></div>
              </div>
              <div className="population-values">
                <span>{formatPopulation(populationRange.min)}</span>
                <span>{formatPopulation(populationRange.max)}</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Currency:</label>
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="filter-select"
            >
              <option value="">All Currencies</option>
              <option value="USD">US Dollar</option>
              <option value="EUR">Euro</option>
              <option value="GBP">British Pound</option>
              <option value="JPY">Japanese Yen</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Language:</label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="filter-select"
            >
              <option value="">All Languages</option>
              <option value="eng">English</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="zho">Chinese</option>
              <option value="ara">Arabic</option>
            </select>
          </div>

          {(selectedCurrency ||
            selectedLanguage ||
            populationRange.min > 0 ||
            populationRange.max < 350000000) && (
            <button className="filter-reset" onClick={resetFilters}>
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};
