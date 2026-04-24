import { Page, Locator } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly allItemsLink: Locator;
  readonly resetStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
    this.resetStateLink = page.locator('#reset_sidebar_link');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
  
  async goToAllItems() {
    await this.menuButton.click();
    await this.allItemsLink.click();
  }
}