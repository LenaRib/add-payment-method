/// <reference types="cypress" />

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

  it('navigate to side block info-panel', () => {
    cy.get('[data-test="SettingsButton"]')
      .should('be.visible')
      .click()

    cy.get('[data-test="header-link-billing"]')
      .click()
      .wait(5000)

    cy.getBySel('info-panel')
      .should('be.visible')
      .click({ multiple: true })
  })

  const ButtonTextForSaveChanges = 'Change'

  const closeEditPaymentWindow = () => {
    cy.get('body').then($body => {
      if ($body.find('[data-testid="modal"]').length === 1) {
        cy.get('[data-testid="closeModal"]')
          .click()
          .wait(4000)
      }
    })
  }

  const openEditPaymentWindow = () => {
    cy.getBySel('payment-method\\:\\:change-payment-method')
    .click()
  }

  it('change payment method to Card', () => {

    openEditPaymentWindow()

    cy.getBySel('RadioActive-card')
      .check({force: true})

    cy.getBySel('card-item')
      .first()
      .click()

    cy.intercept('POST','/api/v2/payment').as('paymentMethodCheck')
    
    cy.get('button')
      .contains(ButtonTextForSaveChanges)
      .click()
      .wait(5000)

    cy.wait('@paymentMethodCheck', {timeout: 30000}).its('response.statusCode').should('eq', 200)

    openEditPaymentWindow()

    cy.getBySel('RadioActive-card')
      .should('be.checked')

    closeEditPaymentWindow()
  })

  it('change payment method to Invoice', () => {
    //what payment method should be by default?

    openEditPaymentWindow()

    cy.getBySel('RadioActive-invoice')
      .check({force: true})

    cy.get('button').contains(ButtonTextForSaveChanges)
      .click()
      .wait(5000)

    openEditPaymentWindow()

    cy.getBySel('RadioActive-invoice')
      .should('be.checked')

    closeEditPaymentWindow()
  })


  it('add new card', () => {
    const cardNumber = Cypress.env('card_number')
    openEditPaymentWindow()

    cy.getBySel('RadioActive-card')
      .check({force: true})
    cy.get('button').contains('add new card').click().wait(9000)
    cy.get('[name="cardnumber"]')
      .then(el => el.val(cardNumber))
      .type('{enter}')
      .wait(10000)
    cy.get('button')
      .first()
      .click()
  })

  it('add new card', () => {
    //data, negative, positive, 
    //on click save check request
  })
})
