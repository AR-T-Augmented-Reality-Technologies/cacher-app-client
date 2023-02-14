/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('#register-button').click()
    cy.get('#email-input-register')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}')
      .type('{meta}{command}{cmd}')
      .type('{shift}')
      .type('testuser@email.com').should('have.value', 'testuser@email.com')

      
      cy.get('#username-input')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}') 
      .type('{meta}{command}{cmd}') 
      .type('{shift}')
      .type('testusername123').should('have.value', 'testusername123')

      cy.get('#password-input-register')
      
      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}') 
      .type('{meta}{command}{cmd}') 
      .type('{shift}')
      .type('password123').should('have.value', 'password123')

      cy.get('#confirmPassword-input')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}')
      .type('{meta}{command}{cmd}') 
      .type('{shift}')
      .type('password123').should('have.value', 'password123')

      cy.get('#fname-input')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}') 
      .type('{meta}{command}{cmd}') 
      .type('{shift}')
      .type('John').should('have.value', 'John')

      cy.get('#lname-input')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}') 
      .type('{meta}{command}{cmd}') 
      .type('{shift}')
      .type('Doe').should('have.value', 'Doe')

      cy.get('#dob-input')

      .type('2000-12-01').should('have.value', '2000-12-01')

      cy.get('#register-checkbox').click()

      cy.get('#register-button-register').click()

      cy.get('#email-input')
      .type('testuser@email.com').should('have.value', 'testuser@email.com')

      cy.get(':nth-child(2) > #password-input')
      .type('password123').should('have.value', 'password123')

      cy.get('#sign-in-button').click()

  })

})
