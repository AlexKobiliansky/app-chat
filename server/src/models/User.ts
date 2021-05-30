import mongoose, {Schema, Document} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export interface IUser extends Document {
  email: string;
  fullName: string;
  password: string;
  confirmed: boolean;
  avatar: string;
  confirm_hash: string;
  last_seen: Date;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email address is required!',
    validate: [isEmail, 'Enter correct email!'],
    unique: true
  },
  avatar: String,
  fullName: {
    type: String,
    required: 'fullName address is required!'
  },
  password: {
    type: String,
    required: 'Password address is required!'
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  confirmed_hash: String,
  last_seen: Date,
}, {
  timestamps: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;