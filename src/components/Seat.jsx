import React from 'react';
import PropTypes from 'prop-types';

const Seat = ({ seat, onSelect, onDeselect, selected }) => {
  const handleSeatClick = () => {
    if (selected) {
      onDeselect(seat);
    } else {
      onSelect(seat);
    }
  };

  return (
    <div
      className={`seat ${seat.type} ${selected ? 'selected' : ''}`}
      onClick={handleSeatClick}
    >
      {seat.number}
    </div>
  );
};

Seat.propTypes = {
  seat: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['platinum', 'gold', 'silver']).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default Seat;
