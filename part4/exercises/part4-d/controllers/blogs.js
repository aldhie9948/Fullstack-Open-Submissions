const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const userToken = request.user;

  const body = request.body;
  if (!body.likes) body.likes = 0;

  if (!body.title && !body.url)
    return response.status(400).send({ error: 'url & title is required' });

  const user = await User.findById(userToken.id);

  const blog = new Blog({
    url: body.url,
    author: body.author,
    likes: body.likes,
    title: body.title,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  const user = request.user;

  const blog = await Blog.findById(id);
  if (blog.user.toString() !== user.id)
    return response
      .status(401)
      .send({ error: 'blogs only can be deleted by the one who post it.' });

  await Blog.findByIdAndRemove(id);

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  if (!body.likes) return response.status(400).end();
  const blog = {
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate(
    'user',
    { username: 1, name: 1 }
  );
  response.json(result);
});

module.exports = blogsRouter;
