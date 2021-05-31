import UserModel from "../models/User";
import express, {NextFunction} from "express";

export default (_: express.Request, __: express.Response, next: NextFunction) => {

  UserModel.updateOne(
    {_id: '60b0c6c3f199114df1e6bded'},
    {$set: {last_seen: new Date()}},
    () => {}
  );
  next();
}