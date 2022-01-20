const _ = require('lodash');

const dummy = (blogs) => {
  return blogs ? 1 : 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0;
  return blogs.map((b) => b.likes).reduce((a, b) => a + b, 0);
};

const favoriteBlogs = (blogs) => {
  const arrayLikes = blogs.map((blog) => (!blog.likes ? 0 : blog.likes));
  const bigLikes = Math.max(...arrayLikes);
  const mostLikes = blogs
    .filter((b) => b.likes >= bigLikes)
    .map((b) => {
      return {
        title: b.title,
        author: b.author,
        likes: b.likes,
      };
    })[0];
  return mostLikes;
};

const mostBlogs = (blogs) => {
  const blog = _.groupBy(blogs, 'author');
  const formattedBlog = _.map(blog, (b) => {
    return {
      author: b[0].author,
      blogs: b.length,
    };
  });
  const mostBlogs = _.maxBy(formattedBlog, 'blogs');
  return mostBlogs;
};

const mostLikes = (blogs) => {
  const blog = _.groupBy(blogs, 'author');
  const formattedBlog = _.map(blog, (b, i) => {
    return {
      author: i,
      likes: _.sumBy(b, 'likes'),
    };
  });
  return _.maxBy(formattedBlog, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
