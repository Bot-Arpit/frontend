describe('Login Functionality', () => {
 
  it('Incorrect Username', () => {
    // using base Url in cy.visit
    cy.visit('practice-test-login/')
    cy.get('#username').type("incorrectUser")
    cy.get('#password').type("Password123")
    cy.get('#submit').click()

    //using "should" to verify error text message. 
    cy.get('#error').should('have.text', "Your username is invalid!")
    //another way to verify text
    //using "contains" to verify error text message. 
    cy.contains("#error","Your username is invalid!")
  })
  it('Incorrect Password', () => {
    // using custom command DoLogin to login into system
    // syntax of custom command cy.DoLogin("username","password")
    cy.DoLogin("student","incorrectPassword")

    //using "should" to verify error text message. 
    cy.get('#error').should('have.text', "Your password is invalid!")
    //another way to verify text
    //using "contains" to verify error text message. 
    cy.contains("#error","Your password is invalid!")
  })
   it('Successful Login', () => {
    // using base Url in cy.visit
    cy.visit(Cypress.env('path'))
    cy.get('#username').type(Cypress.env('username'))
    cy.get('#password').type(Cypress.env('password'))
    cy.get('#submit').click()

    //using "should" to verifynew Url after successfull Login
    //Method 1
    cy.url().should('includes',"/logged-in-successfully/")
    //Method 2
    cy.url().should('eq',"https://practicetestautomation.com/logged-in-successfully/")
    //Method 3
    cy.url().should('contain',"/logged-in-successfully/")
    //Method 4
    cy.url().should('eq',Cypress.config().baseUrl + "logged-in-successfully/")

    //verify webpage contain 'successfully logged in or Congratulation'.
    //method 1 using contains.
    cy.get('strong').contains('Congratulations')
    //method 2
    //verify text using conditional testing.
    cy.get('strong').then((txt)=>{
      var t = txt.text()
      if(t.includes('successfully logged in'))
      {
        cy.log('Login Successfully')
      }
    })

    //verify Logout button is present and should be visible and includes text 'Logout'.
    cy.get('.wp-block-button__link')
    .should('exist') // check if element exists in DOM.
    .should('be.visible') // check element is visible or NOT.
    .should('have.text',"Log out") //check element contains text "LOGOUT".

  
  })
  it('verifying post title',()=>{

    // login using different type where credentials saved in fixture file
    // Calling fixture file using cy.fixture we can alternatively achieve this using cy.readfile
    // This below function also enable to test login functionality using different credentials by simply putting more credentials in json file.

    cy.fixture("credentials.json").then( (js) => {
      let uname = js.username // extracting username from file saved in fixtures.
      let password = js.password // extracting  password from file saved in fixtures.
      cy.DoLogin(uname,password) // login using custom command
    })
    // verify if title exist, visible and  have certain text .
    cy.get('.post-title')
    .should('exist')
    .should('be.visible')
    .should('have.text','Logged In Successfully')
  })
})