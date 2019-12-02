/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bus.css";
import { dangerToast, successToast } from "./toast";

const Bus = ({
  busNumber,
  driver,
  conductor,
  destination,
  departure,
  price
}) => (
  <div className="body-container">
    <h3>
      Bus Number: <span>{busNumber}</span>
    </h3>
    <h3>
      Driver: <span>{driver}</span>
    </h3>
    <h3>
      Conductor: <span>{conductor}</span>
    </h3>
    <h3>
      Destination: <span>{destination}</span>
    </h3>
    <h3>
      Departure: <span>{departure}</span>
    </h3>
    <h3>
      Price: <span>{price}</span>
    </h3>
  </div>
);

const BusList = ({ buses }) => {
  const list = buses.map((bus, index) => {
    const {
      id,
      busNumber,
      busDriver,
      busConductor,
      destination,
      departure,
      price
    } = bus;
    return (
      <li key={`${id}-${index}`}>
        <Bus
          busNumber={busNumber}
          driver={busDriver}
          conductor={busConductor}
          destination={destination}
          departure={departure}
          price={price}
        />
      </li>
    );
  });

  return <ul>{list}</ul>;
};

const BusComponent = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBuses = async () => {
    await axios
      .get("http://localhost:4000/api/v1/trips")
      .then(response => {
        successToast(response.data.message);
        const data = response.data.data.trips;
        setLoading(false);
        setBuses(data);
      })
      .catch(error => {
        dangerToast(error.response.data.message);
      });
  };

  useEffect(() => {
    fetchBuses();
  }, [loading]);

  return (
    <div className="home" id="root">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/home">
            Luggage App
          </a>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">
                Gallery
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <h1>Buses</h1>
      <div className="body-container">
        <BusList buses={buses} />
      </div>
    </div>
  );
};

export default BusComponent;
