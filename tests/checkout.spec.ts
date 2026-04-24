import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
// ถ้าคุณสร้าง CartPage ไว้ด้วย สามารถ import เข้ามาใช้ร่วมกันได้นะครับ

test.describe('Feature: Checkout Process', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login ให้เรียบร้อยก่อนเริ่มเทส
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // รอให้หน้าสินค้ารันเสร็จ (แก้ปัญหา 401 ที่เราเจอกันก่อนหน้านี้)
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
  });

  test('TC-Checkout-01: สั่งซื้อสินค้าจนเสร็จสมบูรณ์', async ({ page }) => {
    // 1. เพิ่มสินค้าลงตะกร้า
    await inventoryPage.addBackpackToCart();

    // 2. ไปที่หน้าตะกร้าสินค้า (กดที่ไอคอนตะกร้า)
    await inventoryPage.cartBadge.click();
    await page.waitForURL('https://www.saucedemo.com/cart.html');

    // 3. กดปุ่ม Checkout 
    // (หมายเหตุ: ถ้าคุณทำฟังก์ชันคลิก Checkout ไว้ใน CartPage สามารถปรับเป็น cartPage.clickCheckout() ได้เลยครับ)
    await page.locator('[data-test="checkout"]').click();
    await page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');

    // 4. กรอกข้อมูลลูกค้าแล้วกด Continue
    await checkoutPage.fillInformation('Somchai', 'Jaidee', '10110');
    await page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');

    // 5. กดยืนยันการสั่งซื้อในหน้ารูปแบบสินค้า (Overview)
    await checkoutPage.clickFinish();
    await page.waitForURL('https://www.saucedemo.com/checkout-complete.html');

    // 6. ตรวจสอบผลลัพธ์: ต้องมีข้อความขอบคุณสำหรับการสั่งซื้อ
    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});