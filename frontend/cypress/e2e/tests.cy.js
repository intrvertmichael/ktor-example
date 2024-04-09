const login = () => {
  cy.visit("http://localhost:3000/")

  cy.get('input[name="Email"]').type("test@email.com")
  cy.get('input[name="Password"]').type("password")
  cy.get('input[type="submit"]').click()
}

describe("Authentication", () => {
  it("Register", () => {
    cy.visit("http://localhost:3000/")

    cy.get("h1").contains("Log In")
    cy.get("button").contains("Register").click()

    cy.get('input[name="Username"]').type("test")
    cy.get('input[name="Email"]').type("test@email.com")
    cy.get('input[name="Password"]').type("password")
    cy.get('input[type="submit"]').click()

    cy.get("button").contains("Log Out").click()
  })

  it("Log In", () => {
    cy.visit("http://localhost:3000/")

    cy.get("h1").contains("Log In")
    cy.get("button").contains("Register")

    cy.get('input[name="Email"]').type("test@email.com")
    cy.get('input[name="Password"]').type("password")
    cy.get('input[type="submit"]').click()

    cy.get("button").contains("Log Out").click()
  })
})

describe("Note", () => {
  it("Create Note", () => {
    login()
    cy.get('input[name="noteCreate"]').type("this is a test note")
    cy.get('input[type="submit"]').click()
  })

  it("Edit Note", () => {
    login()
    cy.get("p").contains("this is a test note")
    cy.get("button").contains("Edit").click()
    cy.get('input[name="noteEdit"]').clear().type("edited test note")
    cy.get('[data-testid="noteEdit"]').click()
    cy.get("p").contains("edited test note")
  })

  it("Delete Note", () => {
    login()
    cy.get("p").contains("edited test note")
    cy.get("button").contains("Delete").click()
  })
})

describe("Theme", () => {
  it("Light Mode", () => {
    cy.visit("http://localhost:3000/")
    cy.get("button").contains("Dark Mode").should("exist")
    cy.get("body").should("satisfy", $el => {
      const classList = Array.from($el[0].classList)
      return classList.includes("bg-neutral-100")
    })
  })

  it("Dark Mode", () => {
    cy.visit("http://localhost:3000/")
    cy.get("button").contains("Dark Mode").should("exist")
    cy.get("button").contains("Dark Mode").click()
    cy.get("body").should("satisfy", $el => {
      const classList = Array.from($el[0].classList)
      return classList.includes("dark:bg-neutral-950")
    })
    cy.get("button").contains("Light Mode").should("exist")
  })
})
