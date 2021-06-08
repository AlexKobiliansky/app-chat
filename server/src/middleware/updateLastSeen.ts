import UserModel from "../models/User";
import express, {NextFunction} from "express";

export default (
  req: express.Request,
  __: express.Response,
  next: NextFunction,
  ) => {
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        last_seen: new Date()
      },
      { new: true },
      () => {}
    );
  }
  next();
};