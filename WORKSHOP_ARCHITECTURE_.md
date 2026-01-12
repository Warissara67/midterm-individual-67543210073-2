### ** Library Management System – Architecture**

### **C1: System Context Diagram**

<img width="499" height="451" alt="Screenshot 2569-01-12 at 13 46 19" src="https://github.com/user-attachments/assets/9d3a9c4b-75f3-4f25-a26c-b22bff0591fa" />

### **Actors**
System User: บรรณารักษ์หรือผู้ดูแลระบบที่ใช้จัดการหนังสือ
### **System**
Library Management System
เพิ่ม / แก้ไข / ลบ หนังสือ
ยืมและคืนหนังสือ
แสดงสถิติ (available, borrowed, total)
### **External Systems**
SQLite Database: ฐานข้อมูลสำหรับจัดเก็บข้อมูลหนังสือ

### **C2: Container Diagram – Layered Architecture**

<img width="290" height="779" alt="Screenshot 2569-01-12 at 13 47 58" src="https://github.com/user-attachments/assets/ca43243f-01ae-4a62-8c5d-33f8b0591ebe" />

### **Layer Responsibilities**
1️⃣ Presentation Layer

### **หน้าที่**

- รับ HTTP Request จาก Client
- Parse parameters และ request body
- เรียกใช้ Business Layer
- ส่ง HTTP Response
- จัดการ Error

### **ไฟล์**

- bookRoutes.js
- bookController.js
- errorHandler.js

### **ห้ามทำ**

❌ เขียน SQL
❌ เขียน Business Logic

2️⃣ Business Logic Layer

### **หน้าที่**

- ตรวจสอบความถูกต้องของข้อมูล
- บังคับใช้ Business Rules
- ประมวลผลข้อมูล (ยืม / คืน)
- คำนวณสถิติหนังสือ

### **ไฟล์**

- bookService.js
- bookValidator.js
- Business Rules
- Title, Author, ISBN ต้องไม่เป็นค่าว่าง
- ISBN ต้องเป็นตัวเลข 13 หลัก
- หนังสือที่ถูกยืมแล้วไม่สามารถยืมซ้ำได้
- หนังสือที่ถูกยืมอยู่ไม่สามารถลบได้

### **ห้ามทำ**

❌ เขียน SQL
❌ จัดการ HTTP

3️⃣ Data Access Layer

### **หน้าที่**

- เชื่อมต่อฐานข้อมูล
- ทำ CRUD Operations
- Execute SQL Queries
-ส่งข้อมูลกลับเป็น JavaScript Objects

### **ไฟล์**

- bookRepository.js
- connection.js
- Methods
- findAll(status)
- findById(id)
- create(bookData)
- update(id, bookData)
- updateStatus(id, status)
- delete(id)

### **ห้ามทำ**
❌ เขียน Business Logic

❌ เขียน Validation

### **Data Flow: Create Book**
```
Client → Controller → Service → Repository → Database
         ↓ parse     ↓ validate  ↓ SQL       ↓ insert
         ← response ← ← ← ← ← ← ← ← ← ←
```

### **ขั้นตอน**

- Client ส่ง POST /api/books
- Controller รับ request และเรียก Service
- Service ตรวจสอบข้อมูลหนังสือ
- Repository บันทึกข้อมูลลง Database
- ส่งผลลัพธ์กลับเป็น JSON

### **Summary**
Architecture Benefits
```
✅ แยกความรับผิดชอบชัดเจน (Separation of Concerns)
✅ โค้ดอ่านง่ายและบำรุงรักษาง่าย
✅ รองรับการทำงานเป็นทีม
✅ ขยายระบบได้ในอนาคต
```
Key Principles

- แต่ละ Layer มีหน้าที่ชัดเจน

- การเรียกใช้งานไหลจากบนลงล่าง

- Business Rules อยู่ที่ Business Layer เท่านั้น
