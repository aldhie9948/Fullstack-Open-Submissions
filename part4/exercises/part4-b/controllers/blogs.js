const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if (!request.body.likes) request.body.likes = 0;

  if (!request.body.title && !request.body.url)
    return response.status(400).send({ error: 'url & title is required' });

  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
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
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
  response.json(result);
});

module.exports = blogsRouter;
