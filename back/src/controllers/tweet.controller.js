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

export const likeTweet = async (_, res) => {};
