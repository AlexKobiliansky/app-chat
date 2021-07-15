import express from 'express';
import UploadedFileModel from '../models/UploadedFile';
// import cloudinary from "../core/cloudinary";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'do1zs5utw',
  api_key: '987898297736552',
  api_secret: 'xYLoS-A4UCRn1XbfrxJ_GKYSiqE',
});


class UploadController {

  create = (req: any, res: express.Response) => {
    const userId = req.user._id
    const file: any = req.file;

    cloudinary.uploader
      .upload_stream({resource_type: "auto"}, (error: any, result: any) => {
        if (error) {
          throw new Error(error);
        }

        const fileData = {
          filename: result.original_filename,
          size: result.bytes,
          ext: result.format,
          url: result.path,
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
      }).end(file.buffer);
  }

  delete = (req: any, res: express.Response) => {

  }

}

export default UploadController;