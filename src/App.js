import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MovieForm from "./pages/MovieForm";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/movie/:id/:date/:time" element={<MovieDetailPage />} />
        <Route
          exact
          path="/seat-selection/:id/:date/:time"
          element={<SeatSelectionPage />}
        />
        <Route exact path="/checkout/:seats/:id/:date/:time" element={<CheckoutPage />} />
        <Route exact path="/confirmation" element={<ConfirmationPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/movieForm" element={<MovieForm />} />
      </Routes>
    </div>
  );
};

export default App;
