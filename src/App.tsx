import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./utils/favoritesContext";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorites"
          element={
            <FavoritesProvider>
              <Favorites />
            </FavoritesProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
