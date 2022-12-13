import service from '../services/tweet.service.js';

export const createTweet = async (_, res) => {
  const tweet = {
    description: _.body.description,
    images: _.body.images,
    user: _.user._id,
    parent: _.body.parent ? _.body.parent : null,
    hashtags: Array.isArray(_.body.hashtags) && !!_.body.hashtags.length ? _.body.hashtags : null,
    username: _.user.username,
    name: _.user.name,
  };

  try {
    const createdTweet = await service.postTweet(tweet);
    return res.status(201).json({ message: 'created Tweet', createdTweet });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};
export const likeTweet = async (_, res) => {
  const body = {
    userID: _.user.id,
    tweetID: _.params.id,
  };

  try {
    const like = await service.postLike(body);
    return res.status(201).json({ message: like });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};
export const retweet = async (_, res) => {
  const body = {
    userID: _.user.id,
    tweetID: _.params.id,
    username: _.user.username,
    name: _.user.name,
  };

  try {
    const retweet = await service.postRetweet(body);
    return res.status(201).json({ message: retweet });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};
export const removeTweet = async (_, res) => {
  const body = {
    userID: _.user.id,
    tweetID: _.params.id,
    username: _.user.username,
    name: _.user.name,
  };
  try {
    const remove = await service.deleteTweet(body);
    return res.status(201).json({ message: remove });
  } catch (error) {
    const { message } = error;
    return res.status(404).json({ message });
  }
};
