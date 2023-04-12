import React from 'react';

function SeatTypeSelector({ selectedType, onTypeSelect }) {
  const types = [
    { id: 'gold', name: 'Gold' },
    { id: 'platinum', name: 'Platinum' },
    { id: 'silver', name: 'Silver' },
  ];

  return (
    <div className="seat-type-selector">
      {types.map((type) => (
        <button
          key={type.id}
          className={selectedType === type.id ? 'selected' : ''}
          onClick={() => onTypeSelect(type.id)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
}

export default SeatTypeSelector;
