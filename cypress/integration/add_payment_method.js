//<reference types="cypress" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  //should work return cy.get(`[data-test*=${selector}]`, ...args)
  return cy.get(`[data-testid=${selector}]`, ...args)
})

describe('osome', () => {
  it('login', () => {
    cy.visit("/")

    const phone = Cypress.env('phone')
    const code = Cypress.env('code')
  
    expect(phone, 'username was set').to.be.a('string').and.not.be.empty
    expect(code, 'password was set').to.be.a('string').and.not.be.empty

    cy.getBySel('LoginPhoneNumber')
      .clear()
      .type(phone)

    cy.getBySel('submit')
      .click()

    cy.getBySel('LoginCode')
      .type(code)
    
    cy.getBySel('submit')
      .click()
  })

  it('navigate to payment method', () => {
    cy.get('[data-test="SettingsButton"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="header-link-billing"]')
      .click()

    cy.getBySel('info-panel')
      .wait(800)
      .should('be.visible')
      .click()

    cy.getBySel('payment-method::change-payment-method')
    //check current method
    //close open equal 

  })

  it('check availability of invoice and card', () => {
    //check post request with choosen methods
  })

  it('add new card', () => {
    //data, negative positive, 
    //on click save check request
  })
})
