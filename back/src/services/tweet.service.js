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
const postLike = async (body) => {
  const { userID, tweetID } = body;
  const user = await User.findById(userID);
  if (!user) throw new Error('No found user');
  const tweet = await Tweet.findById(tweetID);
  if (!tweet) throw new Error('No found tweet');

  if (user.likes.includes(tweetID)) {
    const idIlikeUser = user.likes.indexOf(tweetID);
    if (idIlikeUser !== -1) user.likes.splice(idIlikeUser, 1);
    const idIlikeTweet = tweet.likes.indexOf(userID);
    if (idIlikeTweet !== -1) tweet.likes.splice(idIlikeTweet, 1);
    user.save();
    tweet.save();
    return 'I dont Like';
  }

  tweet.likes.push(userID);
  user.likes.unshift(tweet);
  user.save();
  tweet.save();
  return 'I Like';
};
const postRetweet = async (body) => {
  const { userID, tweetID } = body;
  const user = await User.findById(userID);
  if (!user) throw new Error('No found user');
  const tweet = await Tweet.findById(tweetID);
  if (!tweet) throw new Error('No found tweet');

  if (user.retweets.includes(tweetID)) {
    await Tweet.findOneAndDelete({ retweet: tweetID });

    var idUserRetweet = user.retweets.indexOf(tweetID);
    if (idUserRetweet !== -1) user.retweets.splice(idUserRetweet, 1);

    var idTRetweet = tweet.retweets.indexOf(userID);
    if (idTRetweet !== -1) tweet.retweets.splice(idTRetweet, 1);

    user.save();
    tweet.save();
    return 'undo retweet';
  }

  const templateRetweet = {
    user: userID,
    retweet: tweet._id,
    username: body.username,
    name: body.name,
    description: `${'retweeted from ' + tweet._id}`,
  };

  const retweet = await Tweet.create(templateRetweet);
  user.retweets.unshift(tweetID);
  user.tweets.unshift(retweet);
  tweet.retweets.unshift(userID);
  user.save();
  tweet.save();
  return 'retweeted';
};
const deleteTweet = async (body) => {
  const { userID, tweetID } = body;
  const tweet = await Tweet.findById(tweetID);
  if (!tweet) throw new Error('No found tweet');
  if (userID === tweet.user.toString()) {
    if (tweet.parent) {
      const idParent = tweet.parent;
      const parent = await Tweet.findById(idParent);
      if (!parent) throw new Error('No found tweet');
      const idReplies = parent.replies.indexOf(tweetID);
      if (idReplies !== -1) parent.replies.splice(idReplies, 1);
      parent.save();
    }
    await Tweet.findByIdAndDelete(tweetID);
    return 'tweet deleted';
  }

  return 'No delete';
};
const service = {
  postTweet,
  postLike,
  postRetweet,
  deleteTweet,
};

export default service;
