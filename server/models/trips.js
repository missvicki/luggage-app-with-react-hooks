import mongoose from "mongoose";

const tripSchema = mongoose.Schema({
  busNumber: { type: String, required: true },
  busDriver: { type: String, required: true },
  busConductor: { type: String, required: true },
  destination: { type: String, required: true },
  departure: { type: String, required: true },
  departureDateTime: { type: Date, default: Date.now },
  destinationDateTime: { type: Date, default: Date.now },
  numberOfPassengers: { type: Number, required: true },
  price: { type: Number, required: true }
});

export const Trips = mongoose.model("Trips", tripSchema);
