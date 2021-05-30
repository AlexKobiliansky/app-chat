import express from 'express';
import MessageModel from '../models/Message';

class MessageController {
  index(req: express.Request, res: express.Response) {
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


  create(req: express.Request, res: express.Response) {
    const userId = '60b0c6c3f199114df1e6bded';

    const postData = {
      text: req.body.text,
      dialog: req.body.dialog_id,
      user: userId
    };

    const message = new MessageModel(postData);

    message
      .save()
      .then((obj: any) => {
        res.json(obj);
      })
      .catch(reason => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
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