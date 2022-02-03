import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

let newBlog = {};
let user = {
  username: 'root',
  name: 'Aldi Gunawan',
};

describe('blog list', () => {
  beforeEach(() => {
    newBlog = {
      author: 'Aldi Gunawan',
      likes: 1000,
      url: 'https://example.com',
      title: 'This is testing DOM React',
      user,
    };
  });

  test('blog should render blogs title and author and not render its url or likes', () => {
    const component = render(<Blog blog={newBlog} />);
    const detailsDiv = component.container.querySelector('.detailsDiv');
    expect(detailsDiv).toBeEmptyDOMElement();
  });

  test('blog urls and number of likes shown when click show button', () => {
    const component = render(<Blog blog={newBlog} user={newBlog.user}></Blog>);
    const buttonShow = component.container.querySelector('.buttonShow');
    fireEvent.click(buttonShow);

    const urlDiv = component.container.querySelector('.url');
    const likesDiv = component.container.querySelector('.likes');

    expect(urlDiv).toBeDefined();
    expect(likesDiv).toBeDefined();
  });

  test('ensure that if button like is clicked twice, event handler is called twice', () => {
    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={newBlog} user={user} handleUpdate={mockHandler} />
    );

    const buttonShow = component.container.querySelector('.buttonShow');
    fireEvent.click(buttonShow);

    const buttonLike = component.container.querySelector('.buttonLikes');

    for (let i = 0; i < 2; i++) {
      fireEvent.click(buttonLike);
    }

    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
