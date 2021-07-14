import mongoose, {Schema, Document} from 'mongoose';

export interface IUploadedFile extends Document {
  filename: string;
  size: number;
  ext: string;
  url: string;
  message: string;
  user: string;
}

// attachments:
const UploadedFileSchema = new Schema(
  {
      filename: String,
      size: Number,
      ext: String,
      url: String,
      message: { type: Schema.Types.ObjectId, ref: "Message", require: true },
      user: { type: Schema.Types.ObjectId, ref: "User", require: true },
  },
  {
    timestamps: true
  }
);

const UploadedFileModel = mongoose.model<IUploadedFile>("UploadedFile", UploadedFileSchema);

export default UploadedFileModel;