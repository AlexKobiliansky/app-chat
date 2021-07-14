import express from 'express';
import MessageModel from '../models/Message';
import DialogModel from '../models/Dialog';
import socket from "socket.io";

class MessageController {

  io: socket.Server;

  constructor(io: socket.Server) {
    this.io = io;
  }

  index = (req: any, res: express.Response) => {
    const dialogId: any = req.query.dialog;
    const userId = req.user._id;

    MessageModel.updateMany(
        { dialog: dialogId, user: { $ne: userId } },
        { $set: { readed: true } },
    );

    MessageModel.find({dialog: dialogId})
      .populate(['dialog', 'user', 'attachments'])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: 'error',
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
      user: userId,
      attachments: req.body.attachments
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: any) => {
        obj.populate(['dialog', 'user', 'attachments'], (err: any, message: any) => {
          if (err) {
            return res.status(404).json({
              status: 'error',
              message: 'No Messages'
            });
          }

          DialogModel.findOneAndUpdate(
            {_id: postData.dialog},
            {lastMessage: message._id},
            {upsert: true},
            function (err) {
              if (err) {
                return res.status(404).json({
                  status: 'error',
                  message: err
                });
              }
            });

          res.json(message);
          this.io.emit('SERVER:NEW_MESSAGE', message)
        })

      })
      .catch(reason => {
        return res.json(reason);
      });
  }

  delete = (req: any, res: express.Response) => {
    const id: string = req.params.id
    const userId: string = req.user._id

    MessageModel.findById(id, (err: any, message: any) => {
      if (err || !message) {
        return res.status(404).json({
          status: 'error',
          message: err
        })
      }

      if (message.user.toString() === userId) {

        const dialogId = message.dialog
        message.remove();


        MessageModel.findOne({dialog: dialogId}, {}, {sort: {'created_at': -1}}, (err, lastMessage) => {
          if (err) {
            return res.status(500).json({
              status: 'error',
              message: err
            })
          }

          DialogModel.findById(dialogId, (err: any, dialog: any) => {
            if (err) {
              return res.status(500).json({
                status: 'error',
                message: err
              })
            }

            dialog.lastMessage = lastMessage;
            dialog.save();
          });
        });

        return res.json({
          status: 'success',
          message: 'Message deleted'
        })
      } else {
        return res.status(404).json({
          status: 'success',
          message: 'You cannot delete alien message'
        })
      }
    })


  }
}

export default MessageController;