# Swag Labs E2E Testing with Playwright

โปรเจกต์ทดสอบระบบอัตโนมัติ (Automated E2E Testing) สำหรับเว็บไซต์ Swag Labs ด้วย Playwright Framework โดยใช้โครงสร้างการเขียนโค้ดแบบ Page Object Model (POM) เพื่อให้อ่านง่ายและบำรุงรักษาได้สะดวก

## ข้อกำหนดเบื้องต้น (Prerequisites)

ก่อนเริ่มต้นใช้งาน กรุณาตรวจสอบให้แน่ใจว่าเครื่องของคุณได้ติดตั้งโปรแกรมเหล่านี้แล้ว:
- Node.js (แนะนำเวอร์ชัน LTS)
- Git สำหรับจัดการ Version Control

## วิธีติดตั้งและใช้งาน (Installation & Setup)

1. โคลนโปรเจกต์ลงมาที่เครื่อง:
git clone https://github.com/MathatPongchakoa/Playwright_Swag_Labs.git

2. เข้าไปในโฟลเดอร์โปรเจกต์:
cd Playwright_Swag_Labs

3. ติดตั้ง Dependencies ทั้งหมด:
npm install

4. ติดตั้งเบราว์เซอร์สำหรับ Playwright:
npx playwright install

5. รันเทสแบบเปิดหน้าต่าง UI:
npx playwright test --ui

6. เริ่มการทดสอบ:
เมื่อหน้าต่างโปรแกรม Playwright แสดงขึ้นมา ให้กดปุ่ม Run เพื่อเริ่มการทดสอบระบบ

---

## 📄 เอกสารการทดสอบ (Test Documentation)
เพื่อเป็นทางเลือกในการตรวจสอบรายละเอียดการทดสอบ สามารถเข้าชมเอกสารฉบับเต็มได้ที่ลิงก์ด้านล่างนี้:
- **Manual Test Cases & Bug Report:** [คลิกเพื่อดูเอกสารบน Google Sheets](https://docs.google.com/spreadsheets/d/1nXqQTWxme4MqTz34TXwdbC5uP4ARlKtzphBM_SG8WkU/edit?usp=sharing)

---

## ขอบเขตการทดสอบ (Test Coverage)

การทดสอบครอบคลุมระบบหลักทั้งหมด 15 Test Cases ดังนี้:
- Login: ทดสอบการเข้าระบบทั้งกรณีสำเร็จและไม่สำเร็จ (รหัสผิด, ชื่อผู้ใช้ผิด, ไม่กรอกข้อมูล)
- Product Listing: ตรวจสอบการแสดงผลและการใช้ฟิลเตอร์เรียงลำดับสินค้าตามตัวอักษรและราคา
- Cart Management: ทดสอบการเพิ่มและลบสินค้าออกจากตะกร้าทั้งจากหน้าหลักและหน้าตะกร้า
- Checkout: ทดสอบขั้นตอนการกรอกข้อมูลผู้รับและสั่งซื้อสินค้าจนเสร็จสมบูรณ์
- Logout: ทดสอบการออกจากระบบและตรวจสอบการกลับสู่หน้าหลัก

---

## สมมติฐานและหมายเหตุ (Assumptions / Notes)

- Test Data: ใช้บัญชีผู้ใช้ standard_user ในการทดสอบกรณีการทำงานปกติ (Happy Path)
- Network Mocking: มีการใช้คำสั่ง page.route() เพื่อจำลอง HTTP Status 200 แทนการตอบกลับ 401 Unauthorized จากเซิร์ฟเวอร์จำลองของระบบหลังบ้าน เพื่อให้การทดสอบส่วน UI ดำเนินไปได้อย่างถูกต้อง