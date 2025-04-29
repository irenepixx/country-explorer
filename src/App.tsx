import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
