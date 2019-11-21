import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { User } from "../models/user";
import responseCodes from "../constants/responseCodes";
import responseMessages from "../constants/responseMessages";
import status from "../constants/status";
import {
  sendConfirmationEmail,
  sendForgotPasswordEmail
} from "../utils/mailer";

export const create = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password, admin } = req.body;
  try {
    // make sure user does not exist already
    await User.create(
      {
        firstname,
        lastname,
        email,
        phoneNumber,
        password,
        admin
      },
      function(err, user) {
        if (err) {
          return res.status(responseCodes.BAD_REQUEST).send({
            message: responseMessages.USER_ALREADY_EXISTS
          });
        }
        sendConfirmationEmail(email);
        return res.status(responseCodes.CREATED).json({
          message: responseMessages.USER_CREATED,
          data: user
        });
      }
    );
  } catch (error) {
    return res.json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: responseCodes.SERVER_ERROR
    });
  }
};

export const confirmed = async (req, res) => {
  try {
    const token = req.params.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(responseCodes.FORBIDDEN).json({
            status: status.ERROR,
            message: responseMessages.TOKEN_EXPIRED
          });
        } 
          const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { confirmed: true }
          );
          if (user === null) {
            return res
              .status(responseCodes.NOT_FOUND)
              .json({ message: responseMessages.USER_NOT_FOUND });
          }
          return res
            .status(responseCodes.OK)
            .json({ message: responseMessages.EMAIL_CONFIRMED });
        
      });
    }
  } catch (err) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR, error: err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res
        .status(responseCodes.UNAUTHAURISED)
        .json({ message: responseMessages.INVALID_CREDENTIALS });
    }
    if (!userData.confirmed) {
      return res
        .status(responseCodes.FORBIDDEN)
        .json({ message: responseMessages.INCOMPLETE_ACCOUNT });
    }
    const userPassword = await bcrypt.compare(password, userData.password);
    if (!userPassword) {
      return res
        .status(responseCodes.UNAUTHAURISED)
        .json({ message: responseMessages.INVALID_CREDENTIALS });
    }
    const payload = {
      id: userData._id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      admin: userData.admin
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    const data = {
      user: {
        ...payload,
        token
      }
    };

    return res.status(responseCodes.OK).json({
      message: responseMessages.SUCCESSFUL_LOGIN,
      data
    });
  } catch (err) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR, error: err });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email });
    if (userData === null) {
      return res
        .status(responseCodes.NOT_FOUND)
        .json({ message: responseMessages.USER_NOT_FOUND });
    }
    await sendForgotPasswordEmail(email);
    return res
      .status(responseCodes.OK)
      .json({ message: responseMessages.PASSWORD_RESET });
  } catch (error) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR, error: err });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const { password } = req.body;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(responseCodes.FORBIDDEN).json({
            status: status.ERROR,
            message: responseMessages.TOKEN_EXPIRED
          });
        } 
          const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { password: await bcrypt.hash(password, 8) }
          );
          if (user === null) {
            return res
              .status(responseCodes.NOT_FOUND)
              .json({ message: responseMessages.USER_NOT_FOUND });
          }
          return res
            .status(responseCodes.OK)
            .json({ message: responseMessages.PASSWORD_CHANGED });
        
      });
    }
  } catch (err) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR, error: err });
  }
};
