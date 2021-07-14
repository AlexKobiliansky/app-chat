import express from 'express';
import UploadedFileModel from '../models/UploadedFile';

class UploadController {

  create = (req: any, res: express.Response) => {
    const userId = req.user._id
    const file: any = req.file;
    const fileData = {
      filename: file.originalname,
      size: file.bytes,
      ext: file.format,
      url: file.path,
      user: userId
    };

    const uploadedFile = new UploadedFileModel(fileData);

    uploadedFile.save().then((fileObj: any) => {
      res.json({
        status: 'success',
        file: fileObj
      });
    }).catch((err: any) => {
      res.json({
        status: 'error',
        message: err
      });
    });

    // let image = {};
    // image.url = req.file.url;
    // image.id = req.file.public_id;
  }

  delete = (req: any, res: express.Response) => {

  }

}

export default UploadController;