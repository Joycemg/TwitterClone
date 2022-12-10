import mongoose from 'mongoose';

const { Schema } = mongoose;

const hashtagSchema = new Schema(
  {
    content: {
      required: true,
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
      },
    ],
  },
  {
    collection: 'hashtags',
    versionKey: false,
  },
  { timestamps: true },
);

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
export default Hashtag;
