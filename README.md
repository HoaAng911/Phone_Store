Phone Store Backend
Giới thiệu dự án
Dự án Phone Store Backend là một API RESTful được xây dựng để hỗ trợ hệ thống bán điện thoại trực tuyến. Dự án tập trung vào việc quản lý các chức năng cơ bản như người dùng, sản phẩm, đơn hàng và các tính năng liên quan. Đây là một dự án cá nhân nhằm thực hành phát triển backend với các công nghệ hiện đại, phù hợp cho sinh viên, fresher hoặc intern backend muốn học hỏi và áp dụng kiến thức thực tế.
Dự án sử dụng kiến trúc module của NestJS để tổ chức code, giúp dễ dàng mở rộng và bảo trì.
Mục tiêu học tập của dự án
Dự án được phát triển với mục tiêu chính là học tập và thực hành các khái niệm backend cơ bản đến nâng cao, bao gồm:

Xây dựng API RESTful với NestJS.
Sử dụng TypeORM để tương tác với cơ sở dữ liệu MySQL.
Triển khai xác thực và phân quyền với JWT.
Xử lý các tính năng thực tế như upload file, logging, và quản lý dữ liệu liên quan đến thương mại điện tử.
Áp dụng các thực hành tốt trong phát triển phần mềm, như sử dụng middleware và tổ chức code theo module.

Dự án giúp người học hiểu rõ hơn về quy trình phát triển backend, từ thiết kế database đến triển khai API an toàn.
Công nghệ sử dụng
Dự án sử dụng các công nghệ và thư viện chính sau:

NestJS: Framework chính để xây dựng API, hỗ trợ kiến trúc module và dependency injection.
TypeORM: ORM để quản lý cơ sở dữ liệu, hỗ trợ migration và query builder.
MySQL: Cơ sở dữ liệu quan hệ để lưu trữ dữ liệu.
JWT (JSON Web Tokens): Để xác thực và phân quyền người dùng.
Winston: Thư viện logging để ghi log ứng dụng qua middleware.
Multer: Để xử lý upload file (tích hợp trong module Upload).
Các thư viện hỗ trợ khác: Class-validator, Class-transformer cho validation; RxJS cho xử lý asynchronous.

Danh sách chức năng
Dự án bao gồm các chức năng sau, được phân loại theo trạng thái (đã hoàn thành hoặc đang phát triển). Lưu ý rằng một số chức năng đang trong giai đoạn thử nghiệm và có thể cần cải thiện thêm.
Đã hoàn thành:

Auth Module: Đăng ký tài khoản, đăng nhập, xác thực JWT, phân quyền dựa trên roles (sử dụng Guards).
User Module: Quản lý thông tin người dùng (tạo, cập nhật, xóa, lấy danh sách).
Product Module: Quản lý sản phẩm (thêm/sửa/xóa sản phẩm, quản lý hình ảnh và thông số kỹ thuật).
Upload Module: Upload file (hình ảnh sản phẩm, avatar người dùng).
Logger Middleware: Ghi log các request/response sử dụng Winston.

Đang phát triển:

Review Module: Đánh giá sản phẩm (thêm đánh giá, lấy danh sách đánh giá theo sản phẩm).
Cart Module: Quản lý giỏ hàng (thêm/xóa sản phẩm, tính tổng giá).
Order Module: Quản lý đơn hàng (tạo đơn, cập nhật trạng thái, tích hợp thanh toán cơ bản).
Address Module: Quản lý địa chỉ giao hàng (thêm/sửa/xóa địa chỉ cho người dùng).
Article Module: Quản lý bài viết/tin tức (thêm bài viết, lấy danh sách).

Các chức năng đang phát triển có thể gặp lỗi hoặc chưa được tối ưu hóa hoàn toàn.
Mô tả kiến trúc backend
Backend được tổ chức theo kiến trúc module của NestJS, giúp phân tách trách nhiệm rõ ràng. Mỗi module chịu trách nhiệm cho một phần chức năng cụ thể, bao gồm controller, service, entity (nếu có), và các provider liên quan.

App Module: Module chính, import tất cả các module khác và cấu hình middleware (như logger).
Auth Module: Xử lý xác thực, sử dụng Passport.js với strategy JWT.
User Module: Quản lý entity User và các service liên quan.
Product Module: Quản lý entity Product, bao gồm quan hệ với hình ảnh và thông số.
Review Module: Liên kết với Product và User để quản lý đánh giá.
Cart Module: Quản lý giỏ hàng tạm thời cho người dùng.
Order Module: Xử lý đơn hàng, tích hợp với Cart và Address.
Address Module: Quản lý địa chỉ, liên kết với User.
Article Module: Quản lý nội dung bài viết.
Upload Module: Cung cấp service upload file chung cho các module khác.

Kiến trúc này tuân thủ nguyên tắc SOLID, với dependency injection để dễ test và mở rộng.
Cấu trúc thư mục backend
Cấu trúc thư mục chính (ở mức module) như sau:
textsrc/
├── app.module.ts
├── main.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── guards/
├── user/
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.entity.ts
├── product/
│   ├── product.module.ts
│   ├── product.controller.ts
│   ├── product.service.ts
│   └── product.entity.ts
├── review/
│   ├── review.module.ts
│   ├── review.controller.ts
│   ├── review.service.ts
│   └── review.entity.ts
├── cart/
│   ├── cart.module.ts
│   ├── cart.controller.ts
│   ├── cart.service.ts
│   └── cart.entity.ts
├── order/
│   ├── order.module.ts
│   ├── order.controller.ts
│   ├── order.service.ts
│   └── order.entity.ts
├── address/
│   ├── address.module.ts
│   ├── address.controller.ts
│   ├── address.service.ts
│   └── address.entity.ts
├── article/
│   ├── article.module.ts
│   ├── article.controller.ts
│   ├── article.service.ts
│   └── article.entity.ts
├── upload/
│   ├── upload.module.ts
│   ├── upload.controller.ts
│   └── upload.service.ts
├── common/
│   └── logger.middleware.ts
└── config/
    └── typeorm.config.ts
Các thư mục khác như dist/, node_modules/ là do build và install tạo ra.
Hướng dẫn cài đặt và chạy dự án
Yêu cầu hệ thống:

Node.js phiên bản >= 14.x
npm hoặc yarn
MySQL server (có thể dùng Docker hoặc cài đặt local)

Các bước cài đặt:

Clone repository: git clone <repo_url>
Chạy cd phone-store-backend để vào thư mục dự án.
Cài đặt dependencies: npm install
Tạo file .env dựa trên .env.example và điền thông tin:
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=phone_store
JWT_SECRET=your_secret_key

Tạo database MySQL: Sử dụng công cụ như phpMyAdmin hoặc command line để tạo database phone_store.
Chạy migration: npm run typeorm:migration:run (nếu có migration đã định nghĩa).
Chạy dự án ở mode development: npm run start:dev
API sẽ chạy tại http://localhost:3000. Sử dụng Postman hoặc công cụ tương tự để test.

Nếu gặp lỗi kết nối database, kiểm tra lại thông tin trong .env.
Ghi chú về trạng thái dự án
Dự án đang trong quá trình phát triển và chưa hoàn thiện. Một số chức năng như Order và Review chỉ ở mức cơ bản, có thể thiếu xử lý lỗi chi tiết hoặc tích hợp với frontend. Các tính năng mới có thể được thêm dần, và code có thể cần refactor để tối ưu hơn. Đây là dự án học tập, không khuyến khích sử dụng trong production mà không kiểm tra kỹ lưỡng.
Thông tin tác giả

Tác giả: [Tran Ngoc Hoang]
Email: [hoangdtntaluoi@gmail.com]
GitHub: [github.com/username]

Liên hệ nếu bạn có góp ý hoặc muốn đóng góp vào dự án.
