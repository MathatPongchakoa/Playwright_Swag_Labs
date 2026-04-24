import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage'; // Import ตัวใหม่เข้ามา

test.describe('Feature: Logout System', () => {
  test('TC-Logout-01: ออกจากระบบสำเร็จและกลับไปยังหน้า Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page); // สร้าง object ของ Sidebar

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    // เรียกใช้ logout จาก sidebarPage
    await sidebarPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});