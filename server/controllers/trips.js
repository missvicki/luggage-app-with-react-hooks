import { getCurrentUser } from "../utils/helpers/user";
import { Trips } from "../models/trips";
import responseCodes from "../constants/responseCodes";
import responseMessages from "../constants/responseMessages";
import status from "../constants/status";
import { filterTrips } from "../utils/helpers/filter";

export const create = async (req, res) => {
  const {
    busNumber,
    busDriver,
    busConductor,
    destination,
    departure,
    departureDateTime,
    destinationDateTime,
    numberOfPassengers,
    price
  } = req.body;
  try {
    const user = await getCurrentUser(req);
    if (user.admin === true) {
      await Trips.create(
        {
          busNumber,
          busDriver,
          busConductor,
          destination,
          departure,
          departureDateTime,
          destinationDateTime,
          numberOfPassengers,
          price
        },
        (err, response) => {
          if (err) {
            return res.status(responseCodes.SERVICE_UNAVAILABLE).json({
              message: responseMessages.UNKNOWN_ERROR,
              error: err
            });
          }
          return res.status(responseCodes.CREATED).json({
            message: responseMessages.TRIP_CREATED,
            status: status.SUCCESS,
            data: { trips: response }
          });
        }
      );
    } else {
      return res.status(responseCodes.FORBIDDEN).json({
        message: responseMessages.FORBIDDEN,
        status: status.ERROR
      });
    }
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};

export const list = async (req, res) => {
  try {
    // short way to pass query data
    const trips = await Trips.find(req.query);
    // const { destination, departure, busDriver } = req.query;
    // const tripData = {
    //   destination,
    //   departure,
    //   busDriver
    // };

    if (trips === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.NOT_FOUND_TRIPS,
        status: status.ERROR
      });
    }
    //  long way to do the querying
    // const filteredTrips = filterTrips(trips, tripData);

    return res.status(responseCodes.OK).json({
      message: responseMessages.TRIPS_FOUND,
      status: status.SUCCESS,
      data: { trips: trips }
    });
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};

export const findOne = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(responseCodes.BAD_REQUEST).json({
        message: "Invalid ID passed",
        status: status.ERROR
      });
    }
    const trip = await Trips.findById({ _id });
    if (trip === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.NOT_FOUND,
        status: status.ERROR
      });
    }
    return res.status(responseCodes.OK).json({
      message: responseMessages.TRIPS_FOUND,
      status: status.SUCCESS,
      data: { trips: trip }
    });
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    if (user.admin === true) {
      const _id = req.params.id;
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(responseCodes.BAD_REQUEST).json({
          message: "Invalid ID passed",
          status: status.ERROR
        });
      }
      const trip = await Trips.findByIdAndRemove({ _id });
      if (trip === null) {
        return res.status(responseCodes.NOT_FOUND).json({
          message: responseMessages.NOT_FOUND,
          status: status.ERROR
        });
      }
      return res.status(responseCodes.OK).json({
        message: responseMessages.DELETE_SUCCESSFUL,
        status: status.SUCCESS
      });
    }
    return res.status(responseCodes.FORBIDDEN).json({
      message: responseMessages.FORBIDDEN,
      status: status.ERROR
    });
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};

export const edit = async (req, res) => {
  const {
    busNumber,
    busDriver,
    busConductor,
    destination,
    departure,
    departureDateTime,
    destinationDateTime,
    price
  } = req.body;

  const _id = req.params.id;
  if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(responseCodes.BAD_REQUEST).json({
      message: "Invalid ID passed",
      status: status.ERROR
    });
  }
  try {
    const user = await getCurrentUser(req);
    if (user.admin === true) {
      const trip = await Trips.findByIdAndUpdate(
        { _id },
        {
          busNumber,
          busDriver,
          busConductor,
          destination,
          departure,
          departureDateTime,
          destinationDateTime,
          price
        },
        { new: true }
      );
      if (trip === null) {
        return res.status(responseCodes.NOT_FOUND).json({
          message: responseMessages.NOT_FOUND,
          status: status.ERROR
        });
      }
      return res.status(responseCodes.OK).json({
        message: responseMessages.UPDATED_SUCCESSFULLY,
        status: status.SUCCESS,
        data: { trips: trip }
      });
    } else {
      return res.status(responseCodes.FORBIDDEN).json({
        message: responseMessages.FORBIDDEN,
        status: status.ERROR
      });
    }
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};
