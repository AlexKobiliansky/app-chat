import express from "express";
import socket from "socket.io";
import bodyParser from "body-parser";

import UserController from "../controllers/UserController";
import DialogController from "../controllers/DialogController";
import MessageController from "../controllers/MessageController";
import UploadController from "../controllers/UploadController";
import loginValidation from "../utils/validations/login";
import registerValidation from "../utils/validations/register";
import cors from "cors";
import updateLastSeen from "../middleware/updateLastSeen";
import checkAuth from "../middleware/checkAuth";

import uploader from "./uploader";


const createRoutes = (app: express.Express, io: socket.Server) => {
  const User = new UserController(io);
  const Dialog = new DialogController(io);
  const Message = new MessageController(io);
  const UploadedFile = new UploadController();

  app.use(cors({origin: `http://localhost:${process.env.PORT}`}));
  app.use(bodyParser.json());
  app.use(checkAuth);
  app.use(updateLastSeen);


  app.get("/user/me", User.getMe);
  app.get('/user/verify', User.verify);
  app.post('/user/signup', registerValidation, User.create);
  app.post('/user/signin', loginValidation, User.login);
  app.get('/user/find', User.findUsers);
  app.get('/user/:id', User.show);
  app.delete('/user/:id', User.delete);



  app.get('/dialogs', Dialog.index);
  app.post('/dialogs', Dialog.create);
  app.delete('/dialogs/:id', Dialog.delete);

  app.get('/messages', Message.index);
  app.post('/messages', Message.create);
  app.delete('/messages/:id', Message.delete);

  app.post('/files', uploader.single('image'), UploadedFile.create);
  app.delete('/files/:id', UploadedFile.delete);
}

export default createRoutes;
