// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const newUser = {
      username: 'aldi',
      password: 'horcrux',
      name: 'Aldi Gunawan',
    };
    cy.createUser(newUser);

    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.get('#form-login');
    cy.get('#username');
    cy.get('#password');
  });

  describe('Login', function () {
    it('succeds with correct credentials', function () {
      cy.get('#username').type('aldi');
      cy.get('#password').type('horcrux');
      cy.get('#form-login').find('button[type="submit"]').click();
      cy.contains('Aldi Gunawan logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('aldi');
      cy.get('#password').type('wrong');
      cy.get('#form-login').find('button[type="submit"]').click();

      cy.get('.error').should('contain', 'wrong username or password');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('.error').should('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Aldi Gunawan logged in');
    });
  });

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'aldi', password: 'horcrux' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();

      cy.get('#title').type('new blog by cypress');
      cy.get('#author').type('Aldi Gunawan');
      cy.get('#url').type('https://example.com');
      cy.get('#create-button').click();
    });

    it('user can like the blog', function () {
      cy.createBlog({
        title: 'another blog cypress',
        author: 'Aldi Gunawan',
        url: 'http://example.com',
      });
      cy.createBlog({
        title: '2. another blog cypress',
        author: 'Aldi Gunawan',
        url: 'http://example.com',
      });
      cy.createBlog({
        title: '3. another blog cypress',
        author: 'Aldi Gunawan',
        url: 'http://example.com',
      });

      // element blog "another blog cypress"
      cy.contains('another blog cypress').as('theBlog');

      cy.get('@theBlog').find('.buttonShow').click();
      cy.get('@theBlog').find('.likes').should('contain', 0);

      cy.get('@theBlog').find('.buttonLikes').as('buttonLikes');
      cy.get('@buttonLikes').click();

      cy.get('@theBlog').find('.likes').should('contain', 1);
    });

    describe('condition to delete blog', () => {
      beforeEach(function () {
        const newUser = {
          username: 'riski',
          password: 'horcrux',
          name: 'Riski Utomo',
        };
        cy.createUser(newUser);
      });

      it('only the user that created a blog can delete it', function () {
        cy.login({ username: 'aldi', password: 'horcrux' });
        cy.createBlog({
          author: 'Aldi Gunawan',
          title: 'blog created by aldi',
          url: 'http://example.com',
        });
        cy.contains('blog created by aldi').as('theBlog');
        cy.get('@theBlog').find('.buttonShow').click();
        cy.get('@theBlog').should('contain', 'remove');
        cy.get('@theBlog').find('.remove-button').click();
        cy.get('.error').contains(
          'remove blog "blog created by aldi" by Aldi Gunawan'
        );
      });

      describe('user that didnt create a blog', () => {
        beforeEach(function () {
          cy.login({ username: 'aldi', password: 'horcrux' });
          cy.createBlog({
            author: 'Aldi Gunawan',
            title: 'blog created by aldi',
            url: 'http://example.com',
          });
          cy.createBlog({
            author: 'Aldi Gunawan',
            title: '2. blog created by aldi',
            url: 'http://example.com',
          });
          cy.createBlog({
            author: 'Aldi Gunawan',
            title: '3. blog created by aldi',
            url: 'http://example.com',
          });
          cy.get('#logout-button').click();
          cy.login({ username: 'riski', password: 'horcrux' });
        });
        it('user that did not create a blog cannot delete it', function () {
          cy.contains('blog created by aldi').as('theBlog');
          cy.get('@theBlog').find('.buttonShow').click();
          cy.get('@theBlog').find('.remove-button').should('not.to.exist');
        });
      });
    });

    describe.only('order blogs', () => {
      beforeEach(function () {
        cy.login({ username: 'aldi', password: 'horcrux' });
        cy.createBlog({
          author: 'Aldi Gunawan',
          title: 'blog created by aldi',
          url: 'http://example.com',
        });
        cy.createBlog({
          author: 'Aldi Gunawan',
          title: 'another blog created by aldi',
          url: 'http://example.com',
        });
        cy.createBlog({
          author: 'Aldi Gunawan',
          title: 'another one blog created by aldi',
          url: 'http://example.com',
        });
      });

      it('make sure that blogs ordered by total likes', function () {
        cy.likeBlog('blog created by aldi', 5);
        cy.likeBlog('another blog created by aldi', 4);
        cy.likeBlog('another one blog created by aldi', 6);
        cy.contains('blog created by aldi').parent().as('blogParent');
        cy.get('@blogParent')
          .find('.likes')
          .then((blogs) => {
            const sortedBlog = blogs.sort((a, b) => {
              if (a.innerText < b.innerText) return 1;
              if (a.innerText > b.innerText) return -1;
              return 0;
            });
            cy.wrap(blogs).should('eql', sortedBlog);
          });
      });
    });
  });
});
