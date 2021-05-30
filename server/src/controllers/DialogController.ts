import express from 'express';
import DialogModel from '../models/Dialog';
import MessageModel from '../models/Message';

class DialogController {
  index(req: express.Request, res: express.Response) {
    const authorId: any = req.params.id
    DialogModel.find({author: authorId})
      .populate(['author', 'partner'])
      .exec(function(err, dialogs) {
      if (err) {
        return res.status(404).json({
          message: 'No Dialogs'
        });
      }
      return res.json(dialogs);
    });
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner
    };
    const dialog = new DialogModel(postData);

    dialog
      .save()
      .then((dialogObj: any) => {
        const message = new MessageModel({
          text: req.body.text,
          user: req.body.author,
          dialog: dialogObj._id
        });

        message
          .save()
          .then(() => {
            return res.json(dialogObj);
          })
          .catch(reason => {
            return res.json(reason);
          });
      })
      .catch(reason => {
        res.json(reason);
      });
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    DialogModel.findOneAndRemove({_id: id})
      .then(dialog => {
        if (dialog) {
          res.json({
            message: `Dialog deleted!`
          });
        }
      })
      .catch(() => {
        res.json({
          message: 'Not found dialog'
        })
      });
  }
}

export default DialogController;