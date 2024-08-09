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
const elements = require("./elements");
const utils = require("./utils");

Cypress.Commands.add('clear_session', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('/')
});

Cypress.Commands.add('seleciona_opcao_sidebar', (opcao) => {
    cy.visit('/')
    let opcao_formatada = utils.capitalize_first_letter(opcao)
    cy.get(elements.opcoes_sidebar(opcao_formatada)).should('be.visible')
    .click()
});
  