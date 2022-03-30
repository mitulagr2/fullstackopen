// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => sum + likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (maxSoFar, current) =>
      +maxSoFar.likes > +current.likes
        ? {
          title: maxSoFar.title,
          author: maxSoFar.author,
          likes: maxSoFar.likes,
        }
        : {
          title: current.title,
          author: current.author,
          likes: current.likes,
        },
    {}
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};
  let freq = {};
  let mostFreq = blogs[0];

  for (let blog of blogs) {
    freq[blog.author] = freq[blog.author] ? ++freq[blog.author] : 1;
    freq[blog.author] > freq[mostFreq.author] && (mostFreq = blog);
  }
  return {
    author: mostFreq.author,
    blogs: freq[mostFreq.author],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};
  let sum = {};
  let mostLikes = blogs[0];

  for (let blog of blogs) {
    sum[blog.author] = sum[blog.author]
      ? sum[blog.author] + blog.likes
      : blog.likes;
    sum[blog.author] > sum[mostLikes.author] && (mostLikes = blog);
  }
  return {
    author: mostLikes.author,
    likes: sum[mostLikes.author],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
