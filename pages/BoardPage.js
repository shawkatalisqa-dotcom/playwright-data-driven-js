// pages/BoardPage.js
const { expect } = require("@playwright/test");

class BoardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async openBoard(boardName) {
    //await this.page.getByText(boardName, { exact: true }).click();
    await this.page.locator("//h2[contains(text(),\'"+boardName+"\')]",{exact:true}).click();

    // Prefer heading if present; fallback to visible text
    const heading = this.page.locator("//h1[contains(text(),\'"+boardName+"\')]");
    try {
      await expect(heading).toBeVisible();
    } catch (error) {
      await expect(this.page.locator("//h2[contains(text(),\'"+boardName+"\')]")).toBeVisible();
    }
  }

  columnContainer(columnName) {
    // Column title -> nearest container section/div
    const columnTitle = this.page.locator("//h2[contains(text(),\'"+columnName+"\')]");
    return columnTitle.locator(
      "xpath=ancestor::*[self::section or self::div][1]"
      //"//h1[contains(text(),\'"+columnName+"\')]"
    );
  }

  cardInColumn(columnName, cardTitle) {
    const col = this.columnContainer(columnName);
    // Card title inside column -> nearest article/div container
    return col
      .locator("//h3[contains(text(),\'"+cardTitle+"\')]")
      .locator("xpath=ancestor::*[self::article or self::div][1]");
      //.locator("//h3[contains(text(),\'"+cardTitle+"\')]");
  }

  async expectCardInColumn(columnName, cardTitle) {
    const cardTitleLocator = this.columnContainer(columnName).locator("//h3[contains(text(),\'"+cardTitle+"\')]",
      { exact: true }
    );
    await expect(
      cardTitleLocator,
      `Expected "${cardTitle}" in column "${columnName}"`
    ).toBeVisible();
  }

  async expectTagsOnCard(columnName, cardTitle, tags) {
    const card = this.cardInColumn(columnName, cardTitle);

    for (const tag of tags) {
      await expect(
        //card.getByText(tag, { exact: true }),
        card.locator("//span[contains(text(),\'"+tag+"\')]"),
        `Expected tag "${tag}" on card "${cardTitle}" in column "${columnName}"`
      ).toBeVisible();
    }
  }
}

module.exports = { BoardPage };
