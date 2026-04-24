import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productSortContainer: Locator;
  readonly inventoryItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  
  // 🛒 Locators สำหรับจัดการตะกร้า
  readonly addToCartBackpack: Locator;
  readonly removeBackpack: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortContainer = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    
    // ประกาศ Locators ให้ครบตามที่เทสเรียกใช้
    this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async selectSortOption(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSortContainer.selectOption(optionValue);
  }

  async getAllProductNames() {
    return await this.productNames.allTextContents();
  }

  async getAllProductPrices() {
    const prices = await this.productPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  // 👇 เพิ่มฟังก์ชันสำหรับ Cart Management 👇
  async addBackpackToCart() {
    await this.addToCartBackpack.click();
  }

  async removeBackpackFromList() {
    await this.removeBackpack.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}