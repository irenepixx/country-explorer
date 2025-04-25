import { useState, useEffect } from "react";
import { Country } from "../types/Country";

interface Filters {
  population: {
    min: number;
    max: number;
  };
  currency: string;
  language: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<
    "name" | "region" | "capital"
  >("name");
  const [filters, setFilters] = useState<Filters>({
    population: { min: 0, max: 350000000 },
    currency: "",
    language: "",
  });

  useEffect(() => {
  }, []);

  useEffect(() => {
    let filtered = [...countries];

    // Apply search filter

    // Apply population filter

    // Apply currency filter

    // Apply language filter
    setFilteredCountries(filtered);
  }, [countries, searchQuery, searchCategory, filters]);
  return {
    countries: filteredCountries,
    loading,
    error,
    handleSearch,
    handleFilterChange,
    searchQuery,
    searchCategory,
    filters,
  };
};
