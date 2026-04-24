import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Feature: Login System', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-Login-01: กรอกข้อมูลเข้าสู่ระบบกรณีข้อมูลถูกต้อง', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('TC-Login-02: กรอกข้อมูลเข้าสู่ระบบกรณีรหัสผ่านไม่ถูกต้อง', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC-Login-03: กรอกข้อมูลเข้าสู่ระบบกรณี Username ไม่ถูกต้อง', async () => {
    await loginPage.login('wrong_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC-Login-04: กรอกข้อมูลเข้าสู่ระบบกรณีไม่กรอกข้อมูลเลย (Empty fields)', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
  });

  test('TC-Login-05: กรอกข้อมูลเข้าสู่ระบบกรณีไม่กรอก Password', async () => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required');
  });

  test('TC-Login-06: กรอกข้อมูลเข้าสู่ระบบกรณีไม่กรอก Username', async () => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
  });
});