# Swag Labs E2E Testing with Playwright 🚀

โปรเจกต์ทดสอบระบบอัตโนมัติ (Automated E2E Testing) สำหรับเว็บไซต์ [Swag Labs](https://www.saucedemo.com/) ด้วย Playwright Framework โดยใช้โครงสร้างการเขียนโค้ดแบบ Page Object Model (POM) เพื่อให้อ่านง่ายและบำรุงรักษาได้สะดวก

---

## 🛠️ ข้อกำหนดเบื้องต้น (Prerequisites)
ก่อนเริ่มต้นใช้งาน กรุณาตรวจสอบให้แน่ใจว่าเครื่องของคุณได้ติดตั้งโปรแกรมเหล่านี้แล้ว:
- [Node.js](https://nodejs.org/) (แนะนำเวอร์ชัน LTS)
- Git สำหรับจัดการ Version Control

---

## ⚙️ วิธีติดตั้งและใช้งาน (Installation & Setup)

ทำตามขั้นตอนด้านล่างนี้เพื่อรันโปรเจกต์ในเครื่องของคุณ:

**1. โคลนโปรเจกต์ลงมาที่เครื่อง (Clone the repository)**
```bash
git clone https://github.com/MathatPongchakoa/Playwright_Swag_Labs.git

**2. รันคำสั่ง cd Playwright_Swag_Labs ใน Terminal เพื่อเข้าถึงโปรเจค
**3. รันคำสั่ง npm install ใน Terminal
**4. รันคำสั่ง npx playwright install ใน Terminal
**5. รันคำสั่ง npx playwright test --ui เพื่อเปิดหน้าเว็ปไซต์ของ Playwright
**6. กดปุ่มรันเพื่อทดสอบระบบ

Test Coverage
การทดสอบครอบคลุมระบบหลักทั้งหมด 15 Test Cases ดังนี้:

Login: ทดสอบการเข้าระบบทั้งกรณีสำเร็จและไม่สำเร็จ (รหัสผิด, ชื่อผู้ใช้ผิด, ไม่กรอกข้อมูล)

Product Listing: ตรวจสอบการแสดงผลและการใช้ฟิลเตอร์เรียงลำดับสินค้า (ตัวอักษร และ ราคา)

Cart Management: ทดสอบการเพิ่มและลบสินค้าออกจากตะกร้า

Checkout: ทดสอบขั้นตอนการกรอกข้อมูลและสั่งซื้อสินค้าจนเสร็จสมบูรณ์

Logout: ทดสอบการออกจากระบบและกลับสู่หน้าหลัก

Assumptions / Notes

Test Data: ใช้บัญชีผู้ใช้ standard_user ในการทดสอบการทำงานปกติ (Happy Path)

Network Mocking: มีการใช้ page.route() จำลอง HTTP Status 200 เพื่อข้าม Error 401 จากเซิร์ฟเวอร์จำลองของระบบหลังบ้าน ช่วยให้ทดสอบ UI ได้อย่างสมบูรณ์โดยไม่มี Error รบกวน
