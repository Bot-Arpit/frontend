Cypress.Commands.add('DoLogin',(username,password)=>{
    cy.visit('practice-test-login/')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#submit').click()
})