import React, { useState } from "react";
import "./SeatSelection.scss";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 15;

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seatNumber, color) => {
    const seat = `${row}${seatNumber}-${color}`;
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatSelected = (row, seatNumber, color) => {
    return selectedSeats.includes(`${row}${seatNumber}-${color}`);
  };

  return (
    <div className="seat-selection">
      <h2>Select your seats</h2>
      <div className="screen">Screen</div>
      <div className="seats">
        <div className="row silver-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat silver ${
                    isSeatSelected("D", seatNumber, "silver") ? "selected" : ""
                  }`}
                  key={`C${seatNumber}-silver`}
                  onClick={() => handleSeatClick("D", seatNumber, "silver")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
        <div className="row silver-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat silver ${
                    isSeatSelected("E", seatNumber, "silver") ? "selected" : ""
                  }`}
                  key={`C${seatNumber}-silver`}
                  onClick={() => handleSeatClick("E", seatNumber, "silver")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
        <div className="row silver-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat silver ${
                    isSeatSelected("F", seatNumber, "silver") ? "selected" : ""
                  }`}
                  key={`C${seatNumber}-silver`}
                  onClick={() => handleSeatClick("F", seatNumber, "silver")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
        <div className="row gold-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat gold ${
                    isSeatSelected("B", seatNumber, "gold") ? "selected" : ""
                  }`}
                  key={`B${seatNumber}-gold`}
                  onClick={() => handleSeatClick("B", seatNumber, "gold")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
        <div className="row gold-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat gold ${
                    isSeatSelected("C", seatNumber, "gold") ? "selected" : ""
                  }`}
                  key={`B${seatNumber}-gold`}
                  onClick={() => handleSeatClick("C", seatNumber, "gold")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
        <div className="row platinum-row">
          {Array(seatsPerRow)
            .fill()
            .map((_, index) => {
              const seatNumber = index + 1;
              return (
                <div
                  className={`seat platinum ${
                    isSeatSelected("A", seatNumber, "platinum")
                      ? "selected"
                      : ""
                  }`}
                  key={`A${seatNumber}-platinum`}
                  onClick={() => handleSeatClick("A", seatNumber, "platinum")}
                >
                  {seatNumber}
                </div>
              );
            })}
        </div>
      </div>
      <div className="selected-seats">
        <h3>Selected Seats:</h3>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      </div>
      <div className="button-div">
      <button className="checkout_btn">Proceed to payment</button>
      </div>
    </div>
  );
};

export default SeatSelection;
