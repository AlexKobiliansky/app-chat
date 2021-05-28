import mongoose, {Schema, Document} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IMessage extends Document {
  email: string,
  fullName: string,
  password: string,
  confirmed: boolean,
  avatar: string,
  confirm_hash: string,
  last_seen: Date
}

const MessageSchema = new Schema({
  author: String,
  partner: String,
  text: String,
  dialog: String,
  unread: Boolean
}, {
  timestamps: true
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;