import mongoose, {Schema, Document} from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import generatePasswordHash from '../utils/generatePasswordHash';
import differenceInMinutes from 'date-fns/differenceInMinutes'

export interface IUser extends Document {
  email?: string;
  fullName?: string;
  password?: string;
  confirmed?: boolean;
  avatar?: string;
  confirm_hash?: string;
  last_seen?: Date;
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
  confirm_hash: String,
  last_seen: {
    type: Date,
    default: new Date()
  },
}, {
  timestamps: true
});

UserSchema.virtual('online').get(function(this: any) {
  return differenceInMinutes(new Date(Date.now()), this.last_seen) < 5;
});

UserSchema.set('online', {
  virtuals: true
})

UserSchema.pre('save', function(next) {
  const user: IUser = this;

  if (!user.isModified('password')) return next();

  generatePasswordHash(user.password)
    .then(hash => {
      user.password = String(hash);
      generatePasswordHash(+new Date() + '').then(confirmHash => {
        user.confirm_hash = String(confirmHash);
        next();
      });
    })
    .catch(err => {
      next(err);
    });
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;