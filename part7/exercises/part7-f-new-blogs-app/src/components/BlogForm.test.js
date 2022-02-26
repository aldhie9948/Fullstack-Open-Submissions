import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

const newBlog = {
  author: 'Aldi Gunawan',
  url: 'https://example.com',
  title: 'This is testing DOM React',
};

describe('blog form', () => {
  test('make sure that form event handlers gets the props with the right details', () => {
    const mockHandleCreate = jest.fn();

    const component = render(<BlogForm handleCreate={mockHandleCreate} />);

    const inputAuthor = component.container.querySelector('#author');
    const inputTitle = component.container.querySelector('#title');
    const inputUrl = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(inputAuthor, { target: { value: newBlog.author } });
    fireEvent.change(inputTitle, { target: { value: newBlog.title } });
    fireEvent.change(inputUrl, { target: { value: newBlog.url } });

    fireEvent.submit(form);

    expect(mockHandleCreate.mock.calls[0][0]).toEqual(newBlog);
  });
});
