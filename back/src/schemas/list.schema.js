import mongoose from 'mongoose';

const { Schema } = mongoose;

const listSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      required: false,
      default: '',
      type: String,
    },
    banner: {
      required: false,
      default: 'https://pbs-o.twimg.com/media/EXZ3BXhUwAEFNBE?format=png&name=small',
      type: String,
    },
    users: [
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
  },
  {
    collection: 'lists',
    versionKey: false,
  },
  { timestamps: true },
);

const List = mongoose.model('List', listSchema);
export default List;
