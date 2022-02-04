// note_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Aldi Gunawan',
      username: 'aldi',
      password: 'horcrux',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });
  it('user can login', function () {
    cy.contains('log-in').click();
    cy.get('#username').type('aldi');
    cy.get('#password').type('horcrux');
    cy.get('#login-button').click();

    cy.contains('Aldi Gunawan logged-in');
  });

  it('login fails with wrong password', function () {
    cy.contains('log-in').click();
    cy.get('#username').type('aldi');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error').should('contain', 'wrong credentials');
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('.error').should('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Aldi Gunawan logged-in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aldi', password: 'horcrux' });
    });

    it('a new note can be created', function () {
      cy.contains('create note').click();
      cy.get('#input-note').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'another note cypress', important: false });
      });

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .parent()
          .find('button')
          .as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').contains('make not important');
      });
    });

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'third note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
