import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async removeItem() {
    await this.removeButton.click();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}