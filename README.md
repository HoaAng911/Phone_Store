# Phone Store Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-262627?style=flat&logo=typeorm&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## Giới thiệu

**Phone Store Backend** là một RESTful API cho hệ thống bán điện thoại trực tuyến.  
Dự án được xây dựng nhằm **thực hành phát triển backend với NestJS**, phù hợp cho **sinh viên / fresher / intern backend**.

> ⚠️ Dự án đang trong quá trình phát triển, chưa hoàn thiện toàn bộ chức năng.

---

## Mục tiêu

- Xây dựng RESTful API với **NestJS**
- Làm việc với **MySQL** thông qua **TypeORM**
- Triển khai **JWT Authentication & Authorization**
- Tổ chức code theo **kiến trúc module**
- Thực hành các chức năng backend thực tế (auth, product, order, cart…)

---

## Công nghệ sử dụng

- **NestJS**
- **Node.js**
- **TypeORM**
- **MySQL**
- **JWT**
- **Winston** (logging)
- **Multer** (upload file)

---

## Chức năng chính

### Đã có
- Auth: đăng ký, đăng nhập, JWT, phân quyền (Roles, Guard)
- User: CRUD người dùng
- Product: CRUD sản phẩm, hình ảnh, thông số kỹ thuật
- Upload: upload hình ảnh
- Logger middleware (Winston)

### Đang phát triển
- Review sản phẩm
- Giỏ hàng (Cart)
- Đơn hàng (Order)
- Địa chỉ giao hàng (Address)
- Bài viết / tin tức (Article)

---

## Kiến trúc Backend

Backend được tổ chức theo **kiến trúc module của NestJS**.  
Mỗi module tách biệt rõ **Controller – Service – DTO – Entity**, giúp dễ bảo trì và mở rộng.

---

## Cấu trúc thư mục (rút gọn)

```txt
src/
├─ auth/
├─ user/
├─ product/
├─ review/
├─ cart/
├─ order/
├─ address/
├─ article/
├─ upload/
├─ common/
│  └─ logger.middleware.ts
├─ app.module.ts
└─ main.ts
