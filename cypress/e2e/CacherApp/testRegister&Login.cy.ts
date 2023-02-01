/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.max-w-sm > .flex > :nth-child(2)').click()
    cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > .css-view-175oi2r > .grid > .col-start-2 > .max-w-sm > :nth-child(1) > #email-input')

      // .type() with special character sequences
      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      // .type() with key modifiers
      .type('{alt}{option}') 
      .type('{ctrl}{control}')
      .type('{meta}{command}{cmd}')
      .type('{shift}')
      .type('fake@email.com').should('have.value', 'fake@email.com')

      
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

      cy.get(':nth-child(3) > #password-input')
      
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

      cy.get('#registerCheckbox').click()

      cy.get('.justify-center > .bg-custom-blue').click()

      cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > .css-view-175oi2r > .grid > .col-start-2 > .max-w-sm > :nth-child(1) > #email-input')
      .type('testusername123').should('have.value', 'testusername123')

      cy.get(':nth-child(2) > #password-input')
      .type('password123').should('have.value', 'password123')

      cy.get('[style="background-color: rgb(242, 242, 242); display: flex;"] > :nth-child(1) > .css-view-175oi2r > .grid > .col-start-2 > .max-w-sm > .flex > :nth-child(1)').click()

  })

})
