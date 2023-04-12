import React, { useState } from "react";
import SeatGrid from "../components/SeatGrid";
import SeatTypeSelector from "../components/SeatTypeSelector";
import Button from "../components/Button.jsx";
import "./SeatSelectionPage.scss";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const seats = {
  gold: [
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  ],
  platinum: [
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  ],
  silver: [
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  ],
};

const SeatSelectionPage = () => {
  // Define state variables for selected seats and selected seat type
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatType, setSelectedSeatType] = useState("");

  // Define a function to handle seat selection
  const handleSeatSelect = (seat) => {
    // Check if the seat is already selected
    const seatIndex = selectedSeats.findIndex(
      (selectedSeat) => selectedSeat.id === seat.id
    );
    if (seatIndex > -1) {
      // Seat is already selected, so unselect it
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((selectedSeat) => selectedSeat.id !== seat.id)
      );
    } else {
      // Seat is not yet selected, so select it
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
    }
  };

  // Define a function to handle seat type selection
  const handleSeatTypeSelect = (seatType) => {
    setSelectedSeatType(seatType);
  };

  // Define a function to handle the "Proceed to Payment" button click
  const handleProceedToPayment = () => {
    // Do something to proceed to the payment page
    console.log("Proceeding to payment...");
  };

  return (
    <div className="seat-selection-page">
      <h1 className="seat-selection-title">Select Your Seats</h1>
      <SeatTypeSelector
        selectedSeatType={selectedSeatType}
        onSeatTypeSelect={handleSeatTypeSelect}
      />
      <SeatGrid
        selectedSeats={selectedSeats}
        selectedSeatType={selectedSeatType}
        onSeatSelect={handleSeatSelect}
        seats={seats}
      />
      <Button
        label="Proceed to Payment"
        disabled={!selectedSeats.length || !selectedSeatType}
        onClick={handleProceedToPayment}
      />
    </div>
  );
};

export default SeatSelectionPage;
