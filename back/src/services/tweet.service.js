import Tweet from '../schemas/tweet.schema.js';
import User from '../schemas/user.schema.js';
import Hashtag from '../schemas/hashtag.schema.js';

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
  }
  let hashtags;
  if (body.hashtags) {
    hashtags = body.hashtags;
    hashtags.forEach(async (hashtag) => {
      let hash = await Hashtag.findOne({ content: hashtag });
      if (!hash) {
        const newHashtag = { content: hashtag };
        hash = await Hashtag.create(newHashtag);
      }
      hash.tweets.unshift(tweet);
      hash.count = hash.count + 1;
      hash.save();
    });
  }

  const returnTweet = tweet.toObject();
  returnTweet.user = { username: user.username, name: user.name, profileImg: user.profileImg, _id: user._id };
  if (parent) returnTweet.parent = parent;
  if (hashtags) returnTweet.hashtags = hashtags;

  return returnTweet;
};
const postLike = async () => {};

const service = {
  postTweet,
  postLike,
};

export default service;
