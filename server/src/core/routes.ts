import express from "express";
import socket from "socket.io";
import bodyParser from "body-parser";

import UserController from "../controllers/UserController";
import DialogController from "../controllers/DialogController";
import MessageController from "../controllers/MessageController";
import loginValidation from "../utils/validations/login";
import cors from "cors";
import updateLastSeen from "../middleware/updateLastSeen";
import checkAuth from "../middleware/checkAuth";


const createRoutes = (app: express.Express, io: socket.Server) => {
  const User = new UserController(io);
  const Dialog = new DialogController(io);
  const Message = new MessageController(io);

  app.use(cors({origin: `http://localhost:${process.env.PORT}`}));
  app.use(bodyParser.json());
  app.use(updateLastSeen);
  app.use(checkAuth);

  app.get("/user/me", User.getMe);
  app.get('/user/:id', User.show);
  app.post('/user/registration', User.create);
  app.post('/user/login', loginValidation, User.login);
  app.delete('/user/:id', User.delete);


  app.get('/dialogs', Dialog.index);
  app.post('/dialogs', Dialog.create);
  app.delete('/dialogs/:id', Dialog.delete);

  app.get('/messages', Message.index);
  app.post('/messages', Message.create);
  app.delete('/messages/:id', Message.delete);
}

export default createRoutes;
