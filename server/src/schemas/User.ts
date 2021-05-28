import mongoose, {Schema} from 'mongoose';


const UserSchema = new Schema({
  email: String,
  avatar: String,
  fullName: String,
  password: String,
  confirmed: Boolean,
  confirmed_hash: String,
  last_seen: Date,
}, {
  timestamps: true
});

const User = mongoose.model('User', UserSchema);

export default User;