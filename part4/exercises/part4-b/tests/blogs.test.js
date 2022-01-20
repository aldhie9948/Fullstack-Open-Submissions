const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blogs = require('../models/blog');

const api = supertest(app);

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blogs.deleteMany({});

  for (const blog of blogs) {
    let blogObject = new Blogs(blog);
    await blogObject.save();
  }
});

describe('api test', () => {
  test('get list of blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(blogs.length);
  });

  test('id is unique identifier', async () => {
    const response = await api.get('/api/blogs');
    // expect(response.body[0].id).toBeDefined();
    // response.body[1]._id = '3123123123';
    // delete response.body[1].id;
    // console.log(response.body);
    response.body.forEach((b) => expect(b.id).toBeDefined());
  });

  test('post new blog is successfully', async () => {
    const newBlog = {
      author: 'Aldi Gunawan Sila',
      url: 'https://example.com/new-blogs',
      likes: 23432,
      title: 'ini adalah test post blog',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogsList = await api.get('/api/blogs');
    expect(blogsList.body.length).toBe(blogs.length + 1);
  });

  test('missing property likes, it will default 0', async () => {
    const newBlog = {
      author: 'Aldi Gunawan Sila',
      url: 'https://example.com/new-blogs',
      title: 'blog ini tanpa likes',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.body.likes).toBe(0);
  });

  test('return bad request if missing url & title', async () => {
    const newBlog = {
      author: 'Aldi Gunawan Sila',
      likes: 23432,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });

  test('delete one blog', async () => {
    const id = blogs[0]._id;
    await api.delete(`/api/blogs/${id}`).expect(204);
  });

  test('update blogs likes', async () => {
    const id = blogs[0]._id;
    const blog = {
      likes: 999,
    };
    await api
      .put(`/api/blogs/${id}`)
      .send(blog)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
