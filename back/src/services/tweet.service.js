import Tweet from '../schemas/tweet.schema.js';
import User from '../schemas/user.schema.js';

const postTweet = async (body) => {
  const user = await User.findById(body.user);
  if (!user) throw new Error('No found user');
  const tweet = await Tweet.create(body);
  user.tweets.unshift(tweet);
  user.save();

  let parent;
  if (body.parent) {
    parent = await Tweet.findById(body.parent).populate('user', 'username name profileImg');
    parent.replies.unshift(tweet);
    parent.save();
    console.log(parent);
  }

  const returnTweet = tweet.toObject();
  returnTweet.user = { username: user.username, name: user.name, profileImg: user.profileImg, _id: user._id };
  if (parent) returnTweet.parent = parent;

  return returnTweet;
};
const postLike = async () => {};

const service = {
  postTweet,
  postLike,
};

export default service;
