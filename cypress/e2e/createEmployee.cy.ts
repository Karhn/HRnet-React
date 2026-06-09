/// <reference types="cypress" />

describe("Create Employee page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173")
  });

  it("creates an employee and displays the confirmation modal", () => {
    cy.get("#firstName").type("John")
    cy.get("#lastName").type("Doe")
    cy.get("#dateOfBirth").type("1990-05-10")
    cy.get("#startDate").type("2024-01-15")
    cy.get("#street").type("10 Main Street")
    cy.get("#city").type("New York")
    cy.get("#state").select("NY")

    cy.get("#zipCode").type("10001")

    cy.get("button[type='submit']").click()

    cy.contains("Employee Created").should("be.visible")
  });

  it("refuses an employee who is under 18 years old on the start date", () => {
    cy.get("#firstName").type("Young")
    cy.get("#lastName").type("Employee")
    cy.get("#dateOfBirth").type("2010-01-01")
    cy.get("#startDate").type("2025-01-01")
    cy.get("#street").type("10 Main Street")
    cy.get("#city").type("New York")
    cy.get("#state").select("NY")
    cy.get("#zipCode").type("10001")

    cy.get("button[type='submit']").click()

    cy.contains("Employee must be at least").should("be.visible")
  })

  it("refuses an invalid zip code", () => {
    cy.get("#firstName").type("John")
    cy.get("#lastName").type("Doe")
    cy.get("#dateOfBirth").type("1990-05-10")
    cy.get("#startDate").type("2024-01-15")
    cy.get("#street").type("10 Main Street")
    cy.get("#city").type("New York")
    cy.get("#state").select("NY")
    cy.get("#zipCode").type("123")

    cy.get("button[type='submit']").click()

    cy.contains("Zip code must contain between 5 and 8 digits").should("be.visible")
  })
})