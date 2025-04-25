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
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    let filtered = [...countries];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((country) => {
        const searchValue = searchQuery.toLowerCase();
        switch (searchCategory) {
          case "name":
            return country.name.common.toLowerCase().includes(searchValue);
          case "region":
            return country.region.toLowerCase().includes(searchValue);
          case "capital":
            return country.capital?.[0]?.toLowerCase().includes(searchValue);
          default:
            return true;
        }
      });
    }

    // Apply population filter
    if (filters.population) {
      filtered = filtered.filter((country) => {
        const population = country.population;
        const maxPopulation = filters.population.max;
        // If max is 350M, include all countries with populations above it
        if (maxPopulation === 350000000) {
          return population >= filters.population.min;
        }
        return (
          population >= filters.population.min && population <= maxPopulation
        );
      });
    }

    // Apply currency filter
    if (filters.currency) {
      filtered = filtered.filter((country) => {
        if (!country.currencies) return false;
        return Object.keys(country.currencies).some(
          (code) => code.toLowerCase() === filters.currency.toLowerCase()
        );
      });
    }

    // Apply language filter
    if (filters.language) {
      filtered = filtered.filter((country) => {
        if (!country.languages) return false;
        return Object.keys(country.languages).some(
          (code) => code.toLowerCase() === filters.language.toLowerCase()
        );
      });
    }

    setFilteredCountries(filtered);
  }, [countries, searchQuery, searchCategory, filters]);

  const handleSearch = (
    query: string,
    category: "name" | "region" | "capital"
  ) => {
    setSearchQuery(query);
    setSearchCategory(category);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

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
