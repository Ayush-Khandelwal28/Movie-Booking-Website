import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/movie/:id" element={<MovieDetailPage />} />
        <Route
          exact
          path="/seat-selection/:id"
          element={<SeatSelectionPage />}
        />
        <Route exact path="/checkout" element={<CheckoutPage />} />
        <Route exact path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </div>
  );
};

export default App;
