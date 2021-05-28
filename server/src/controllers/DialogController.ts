import express from 'express';
import DialogModel from '../models/Dialog';
import User from "../models/User";

class DialogController {
  index(req: express.Request, res: express.Response) {
    const authorId: any = req.params.id
    DialogModel.find({author: authorId}).exec(function(err, dialogs) {
      if (err) {
        return res.status(404).json({
          message: 'No Dialogs'
        });
      }
      return res.json(dialogs);
    });
  }

  show(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    DialogModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'Not found dialog'
        });
      }
      return res.json(user);
    })
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      author: req.body.author,
      partner: req.body.partner,
    }

    const dialog = new DialogModel(postData);

    dialog.save().then((obj: any) => {
      return res.json(obj);
    }).catch(reason => {
      res.json(reason)
    });
  }
}

export default DialogController;