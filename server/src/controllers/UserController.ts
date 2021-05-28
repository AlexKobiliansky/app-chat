import express from 'express';
import UserModel from '../models/User';

class UserController {
  show(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'Not found user'
        });
      }
      return res.json(user);
    })
  }

  getMe() {

  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
    }

    const user = new UserModel(postData);

    user.save().then((obj: any) => {
      return res.json(obj);
    }).catch(reason => {
      res.json(reason)
    });
  }

  delete(req: express.Request, res: express.Response) {
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
}

export default UserController;