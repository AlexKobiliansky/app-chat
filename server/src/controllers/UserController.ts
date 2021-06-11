import express from 'express';
import UserModel from '../models/User';
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import socket from "socket.io";
import createJWToken from "../utils/createJWToken";


class UserController {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  show = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id
    UserModel.findById(id, (err: any, user: any) => {
      if (err) {
        return res.status(404).json({
          message: 'Not found user'
        });
      }
      return res.json(user);
    })
  }

  findUsers = (req: any, res: express.Response) => {
    const query: string = req.query.query;

    UserModel.find()
      .or([
        {fullName: new RegExp(query, 'i')},
        {email: new RegExp(query, 'i')}
      ])
      .then((users: any) => res.json(users))
      .catch((err: any) => {
      return res.status(404).json({
        status: 'error',
        message: err
      });
    });
  };

  getMe = (req: any, res: express.Response) => {
    const id: string = req.user._id;
    UserModel.findById(id, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: "User not found"
        });
      }
      res.json(user);
    });
  };

  create = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const user = new UserModel(postData);

    user.save().then((obj: any) => {
      return res.json(obj);
    }).catch(reason => {
      res.status(500).json({
        status: 'error',
        message: `Проблемы при регистрации: ${reason}`
      })
    });
  }

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id
    UserModel.findOneAndRemove({_id: id})
      .then(user => {
        if (user) {
          res.json({
            message: `User ${user.fullName} deleted!`
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'Not found user'
        })
      });
  }

  login = (req: express.Request, res: express.Response) => {
    const postData = {
      email: req.body.email,
      password: req.body.password
    };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    UserModel.findOne({email: postData.email}, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          message: 'auth error: no such user'
        });
      }

      if (bcrypt.compareSync(postData.password, user.password)) {
        const token = createJWToken(user);
        return res.json({
          status: 'success',
          token
        });
      } else {
        res.status(403).json({
          status: 'error',
          message: 'incorrect password or email!'
        })
      }
    });
  }

  verify = (req: express.Request, res: express.Response) => {
    const hash = req.query.hash?.toString();

    if (!hash) {
      return res.status(422).json({
        message: 'Invalid hash'
      });
    }

    UserModel.findOne({confirm_hash: hash}, (err: any, user: any) => {
      if (err || !user) {
        return res.status(404).json({
          status: "error",
          message: "Hash not found"
        });
      }
      user.confirmed = true;
      user.save((err: any) => {
        if (err || !user) {
          return res.status(404).json({
            status: "error",
            message: err
          });
        }

        res.json({
          status: "success",
          message: "Аккаунт успешно подтвержден!"
        });
      });
    });
  }

}

export default UserController;