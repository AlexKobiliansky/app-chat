import express from 'express';
import MessageModel from '../models/Message';
import socket from "socket.io";

class MessageController {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: express.Request, res: express.Response) => {
    const dialogId: any = req.query.dialog
    MessageModel.find({dialog: dialogId})
      .populate(['dialog'])
      .exec(function(err, messages) {
      if (err) {
        return res.status(404).json({
          message: 'No Messages'
        });
      }
      return res.json(messages);
    });
  }


  create = (req: any, res: express.Response) => {
    const userId = req.user._id;

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: any) => {
        obj.populate('dialog', (err: any, message: any) => {
          if (err) {
            return res.status(404).json({
              message: 'No Messages'
            });
          }
          res.json(message);
          this.io.emit('SERVER:NEW_MESSAGE', message)
        })

      })
      .catch(reason => {
        return res.json(reason);
      });
  }

  delete = (req: express.Request, res: express.Response) => {
    const id: string = req.params.id
    MessageModel.findOneAndRemove({_id: id})
      .then(message => {
        if (message) {
          res.json({
            message: `Message deleted!`
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'Not found message'
        })
      });
  }
}

export default MessageController;