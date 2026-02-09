// tests/work-items.spec.js
const { test } = require("@playwright/test");
const cases = require("../test-data/test-cases.json");
const { LoginPage } = require("../pages/LoginPage");
const { BoardPage } = require("../pages/BoardPage");

const EMAIL = "admin";
const PASSWORD = "password123";

test.describe("Data-driven validations", () => {
  for (const c of cases) {
    test(`${c.id} | ${c.board} | ${c.column} | ${c.item}`, async ({ page }) => {
      const login = new LoginPage(page);
      const board = new BoardPage(page);

      await login.goto();
      await login.login(EMAIL, PASSWORD);

      await board.openBoard(c.board);
      await board.expectCardInColumn(c.column, c.item);
      await board.expectTagsOnCard(c.column, c.item, c.tags);
    });
  }
});
