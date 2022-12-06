import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const emailValidator = (value) => /^.+@.+\..+$/.test(value);

const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    name: { type: String, requiere: true },
    email: {
      type: String,
      requiere: true,
      unique: true,
      lowerclase: true,
      validate: [emailValidator, 'Incorrect email'],
    },
    password: { type: String, requiere: true },
    description: {
      default: '',
      required: false,
      type: String,
    },
    profileImg: {
      default: 'https://i.imgur.com/iV7Sdgm.jpg',
      required: false,
      type: String,
    },
    banner: {
      default: 'https://i.imgur.com/CAFy1oY.jpg',
      required: false,
      type: String,
    },
    location: {
      default: '',
      required: false,
      type: String,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'List',
      },
    ],
    notifications: {
      required: false,
      default: [],
      type: Array,
    },
  },

  {
    collection: 'Users',
    versionKey: false,
  },
  { timestamps: true },
);

userSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(this.password, salt);
  if (!passwordHash) throw new Error('error save password');
  this.password = passwordHash;
});

userSchema.methods.isPasswordValid = async function (value) {
  const valid = await bcrypt.compare(value, this.password);
  if (!valid) throw new Error('Invalid password');
  return valid;
};

const User = mongoose.model('User', userSchema);
export default User;
