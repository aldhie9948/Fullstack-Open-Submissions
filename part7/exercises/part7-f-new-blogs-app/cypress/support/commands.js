// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogsappUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', function ({ title, author, url }) {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogsappUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('createUser', function ({ username, password, name }) {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username,
    password,
    name,
  });
  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('likeBlog', function (title, total = 1) {
  cy.contains(title).as('theBlog');
  cy.get('@theBlog').find('.buttonShow').click();
  for (let i = 0; i < total; i++) {
    cy.get('@theBlog').find('.buttonLikes').click();
    cy.get('@theBlog')
      .find('.likes')
      .then((res) => {
        if (res[0].outerText < i)
          cy.get('@theBlog').find('.buttonLikes').click();
      });
  }
});
