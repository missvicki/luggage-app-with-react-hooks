import JoiValidator from "./validations/index";
import {
  createUser,
  loginUser,
  updateUser,
  emailVal,
  passwordsVal
} from "./validations/user";

import { tripVal, tripQuery, tripEdit } from "./validations/trips";

export const validateCreateUser = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, createUser);
};

export const validateLoginUser = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, loginUser);
};

export const validateUpdateUser = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, updateUser);
};

export const validateEmailAddress = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, emailVal);
};

export const validatePasswordAddress = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, passwordsVal);
};

export const validateTrips = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, tripVal);
};

export const validateQuery = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, tripQuery);
};

export const validateTripsEdit = (req, res, next) => {
  return JoiValidator.validateRequestBody(req, res, next, tripEdit);
};

export const validateDepDest = (req, res, next) => {
  if (req.body.destination === req.body.departure) {
    return res
      .status(400)
      .json({
        message: "Destination can not be similar to departure",
        status: 400
      });
  }
  next();
};
