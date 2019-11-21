import bcrypt from "bcryptjs";

import { User } from "../models/user";
import responseCodes from "../constants/responseCodes";
import responseMessages from "../constants/responseMessages";
import status from "../constants/status";
import { getCurrentUser } from "../utils/helpers/user";

export const list = async (req, res) => {
  try {
    const userData = await User.find({});
    if (!userData) {
      return res
        .status(responseCodes.NOT_FOUND)
        .json({ message: responseMessages.NO_USERS, status: status.FAIL });
    }
    const data = {
      userData
    };
    return res.status(responseCodes.OK).json({ success: true, data });
  } catch (error) {
    return res.status(responseCodes.SERVER_ERROR).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: status.FAIL
    });
  }
};

export const findAUser = async (req, res) => {
  const email = req.params.email;
  try {
    const userData = await User.findOne({ email });
    if (userData === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.USER_NOT_FOUND,
        status: status.FAIL
      });
    }
    const data = {
      userData
    };
    return res.status(responseCodes.OK).json({ status: status.SUCCESS, data });
  } catch (error) {
    return res.status(responseCodes.SERVER_ERROR).json({
      message: responseMessages.INTERNAL_SERVER_ERROR,
      status: status.FAIL
    });
  }
};

export const updateAUser = async (req, res) => {
  const email = req.params.email;
  const { firstname, lastname, phoneNumber } = req.body;
  try {
    const userData = await User.findOneAndUpdate(
      { email },
      { firstname, lastname, phoneNumber },
      { new: true }
    );
    if (userData === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.USER_NOT_FOUND,
        status: status.FAIL
      });
    }
    return res.status(responseCodes.OK).json({
      message: responseMessages.UPDATED_SUCCESSFULLY,
      status: status.SUCCESS,
      data: { user: userData }
    });
  } catch (error) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

export const deleteAUser = async (req, res) => {
  const email = req.params.email;
  try {
    const userData = await User.findOneAndDelete({ email });
    if (userData === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.USER_NOT_FOUND,
        status: status.FAIL
      });
    }
    return res.status(responseCodes.OK).json({
      status: status.SUCCESS,
      message: responseMessages.DELETE_SUCCESSFUL
    });
  } catch (error) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const user = await getCurrentUser(req);
    const { password } = req.body;
    const data = await User.findOneAndUpdate(
      { email: user.email },
      { password: await bcrypt.hash(password, 8) },
      { new: true }
    );
    if (data === null) {
      return res.status(responseCodes.NOT_FOUND).json({
        message: responseMessages.USER_NOT_FOUND,
        status: status.FAIL
      });
    }
    return res.json({
      status: status.SUCCESS,
      message: responseMessages.PASSWORD_CHANGED
    });
  } catch (error) {
    return res
      .status(responseCodes.SERVER_ERROR)
      .json({ message: responseMessages.INTERNAL_SERVER_ERROR });
  }
};
