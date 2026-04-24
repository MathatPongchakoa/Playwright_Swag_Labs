import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Feature: Cart Management', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await page.route('**/submit?universe*', route => route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'ok'
    }));
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-AddToCart-01: เพิ่มสินค้าเข้าไปในตะกร้าจากหน้า Product List', async () => {
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(inventoryPage.removeBackpack).toBeVisible();
  });

  test('TC-Remove_from_cart-01: ลบสินค้าออกจากตะกร้า จากหน้า Product List', async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.removeBackpackFromList();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('TC-Remove_from_cart-02: ลบสินค้าออกจากตะกร้า จากหน้า Cart', async () => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.goToCart();
    await cartPage.removeItem();
    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});