import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Feature: Product Listing & Sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-Product_List-01: ตรวจสอบการแสดงผลรายละเอียดสินค้าและการเรียง A to Z', async () => {
    // 1. ตรวจสอบว่าสินค้าแต่ละชิ้นมีข้อมูลครบถ้วน (รูป, ชื่อ, รายละเอียด, ราคา, ปุ่ม)
    const firstItem = inventoryPage.inventoryItems.first();
    await expect(firstItem.locator('img')).toBeVisible();
    await expect(firstItem.locator('.inventory_item_name')).not.toBeEmpty();
    await expect(firstItem.locator('.inventory_item_desc')).not.toBeEmpty();
    await expect(firstItem.locator('.inventory_item_price')).not.toBeEmpty();
    await expect(firstItem.locator('button:has-text("Add to cart")')).toBeVisible();

    // 2. ตรวจสอบการเรียงลำดับ A to Z (ค่าเริ่มต้น)
    const names = await inventoryPage.getAllProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  });

  test('TC-Product_List-02: ตรวจสอบการเรียงลำดับตามตัวอักษร Z to A', async () => {
    await inventoryPage.selectSortOption('za');
    
    const names = await inventoryPage.getAllProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  });

  test('TC-Product_List-03: ตรวจสอบการเรียงลำดับราคาจากน้อยไปมาก', async () => {
    await inventoryPage.selectSortOption('lohi');
    
    const prices = await inventoryPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('TC-Product_List-04: ตรวจสอบการเรียงลำดับราคาจากมากไปน้อย', async () => {
    await inventoryPage.selectSortOption('hilo');
    
    const prices = await inventoryPage.getAllProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});