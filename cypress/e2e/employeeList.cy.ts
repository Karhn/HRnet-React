/// <reference types="cypress" />

describe("Employee List page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get("#firstName").type("John");
    cy.get("#lastName").type("Doe");
    cy.get("#dateOfBirth").type("1990-05-10");
    cy.get("#startDate").type("2024-01-15");
    cy.get("#street").type("10 Main Street");
    cy.get("#city").type("New York");
    cy.get("#state").select("NY");
    cy.get("#zipCode").type("10001");
    cy.get("button[type='submit']").click();

    cy.contains("Employee Created").should("be.visible");
    cy.get(".modal-close-button").click();
    cy.contains("View Current Employees").click();
  });

  it("displays the created employee in the table", () => {
    cy.contains("John").should("be.visible");
    cy.contains("Doe").should("be.visible");
    cy.contains("Sales").should("be.visible");
  });

  it("filters employees with the search input", () => {
    cy.get("input[type='search']").type("John");

    cy.contains("John").should("be.visible");
    cy.contains("Doe").should("be.visible");
  });

  it("displays an empty table message when the search has no result", () => {
  cy.get("input[type='search']").type("Alice");

  cy.contains("No matching records found").should("be.visible");
  cy.contains("John").should("not.exist");
  cy.contains("Doe").should("not.exist");
  })

  it("sorts the table when clicking on a column header", () => {
    cy.contains("First Name").click();

    cy.contains("John").should("be.visible");
  });

  it("changes the number of entries displayed", () => {
    cy.get("select").first().select("25");

    cy.contains("entries").should("be.visible");
  });
});