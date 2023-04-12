import React from 'react';

function SeatGrid({ seats, selectedSeats, onSeatSelect }) {
  return (
    <div className="seat-grid">
      {seats.map((row, rowIndex) => (
        <div className="seat-row" key={rowIndex}>
          {row.map((seat, seatIndex) => {
            const isSelected = selectedSeats.some(
              (selectedSeat) =>
                selectedSeat.rowIndex === rowIndex &&
                selectedSeat.seatIndex === seatIndex
            );
            const isAvailable = !seat.isReserved;
            const classes = `seat ${isSelected ? 'selected' : ''} ${
              isAvailable ? 'available' : 'reserved'
            }`;

            return (
              <button
                key={seat.id}
                className={classes}
                disabled={!isAvailable}
                onClick={() => onSeatSelect({ rowIndex, seatIndex })}
              >
                {seat.id}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;
