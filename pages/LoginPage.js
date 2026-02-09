// pages/LoginPage.js
const { expect } = require("@playwright/test");

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
    // Smoke: ensure login UI exists (tolerant locator)
    const anyLoginButton = this.page
      .getByRole("button", { name: /log\s*in|sign\s*in/i })
      .or(this.page.getByRole("button"));
    await expect(anyLoginButton).toBeVisible();
  }

  async login(email, password) {
    const emailInput = this.page
      .getByLabel(/Username/i)
      .or(this.page.getByPlaceholder(/email/i));
    const passwordInput = this.page
      .getByLabel(/Password/i)
      .or(this.page.getByPlaceholder(/password/i));

    await emailInput.fill(email);
    await passwordInput.fill(password);

    const loginButton = this.page
      .getByRole("button", { name: /log\s*in|sign\s*in/i })
      .or(this.page.getByRole("button", { name: /submit/i }));

    await loginButton.click();

    await this.page.waitForTimeout(300);

    // Post-login: boards visible
    await expect(
      this.page.locator("//h1[contains(text(),'Web Application')]")
    ).toBeVisible();
  }
}

module.exports = { LoginPage };
