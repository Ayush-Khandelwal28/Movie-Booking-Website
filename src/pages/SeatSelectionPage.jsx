import React, { useEffect, useState } from "react";
import "./SeatSelection.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 15;

const SeatSelection = () => {

  const { id, date, time } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [booked, setBooked] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate("/login");
    }
  },[]);

  useEffect(()=>{
    async function fetchSeats(){
      const response = await axios.get(`/seats-selection/${id}/${date}/${time}`);
      const data = await response.data;
      setBooked(data);
      console.log(data);
    }
    fetchSeats();
  },[]);

  function redirectToCheckout() {
    if (selectedSeats != 0){
      const arrayString = selectedSeats.join(',');
      navigate(`/checkout/${arrayString}/${id}/${date}/${time}`);
    }
    else
      alert('You have not selected any seats');
  }

  const handleSeatClick = (row, seatNumber, color) => {
    const seat = `${row}${seatNumber}-${color}`;
    if(booked.includes(seat))return;
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

  const isBooked = (row, seatNumber, color) => {
    const d = `${row}${seatNumber}-${color}`;
    if(booked.includes(d))
    console.log(d);
    return booked.includes(d);
    // return null;
  }

  return (
    <div className="page">
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
                    isBooked("D",seatNumber,"silver")?"booked":isSeatSelected("D", seatNumber, "silver") ? "selected" : ""
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
                    isBooked("E",seatNumber,"silver")?"booked":isSeatSelected("E", seatNumber, "silver") ? "selected" : ""
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
                    isBooked("F",seatNumber,"silver")?"booked":isSeatSelected("F", seatNumber, "silver") ? "selected" : ""
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
                    isBooked("B",seatNumber,"gold")?"booked":isSeatSelected("B", seatNumber, "gold") ? "selected" : ""
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
                    isBooked("C",seatNumber,"gold")?"booked":isSeatSelected("C", seatNumber, "gold") ? "selected" : ""
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
                    isBooked("A",seatNumber,"platinum")?"booked":isSeatSelected("A", seatNumber, "platinum")
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
      <button className="checkout_btn" onClick={redirectToCheckout}>Proceed to payment</button>
      </div>
      </div>
      </div>
  );
};

export default SeatSelection;
