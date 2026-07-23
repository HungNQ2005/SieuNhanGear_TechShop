# API Happy Path Test Cases Specification

This document provides comprehensive positive (happy path) test cases for **all 61 REST API endpoints** documented in the Swagger / OpenAPI 3.0 specification for the **SieuNhanGear TechShop Backend**. These test cases verify successful execution with valid inputs, proper authorization, and correct application state transitions.

---

## 1. Authentication (`/api/auth`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | Register new user account | Email & username not registered | `{ "name": "customer01", "email": "customer01@test.com", "password": "PassWord123"}` | 201 Created. Body contains user profile data. |
| `/api/auth/login` | POST | Login with valid credentials | User exists, valid credentials | `{ "email": "customer01@test.com", "password": "PassWord123" }` | 200 OK. Body contains `token`, `role`, and user details. |
| `/api/auth/logout` | POST | Logout current user session | User is logged in | N/A | 200 OK. Returns `{"success": true, "message": "Logged out successfully"}`. |
| `/api/auth/me` | GET | Get authenticated user profile | Valid JWT Token in Header | N/A | 200 OK. Returns authenticated user profile. |
| `/api/auth/me` | PUT | Update user profile | Valid JWT Token in Header | `{ "fullName": "Nguyễn Văn A (Updated)", "phone": "0987654321", "address": "123 Lê Lợi, TP.HCM" }` | 200 OK. Returns updated profile details. |
| `/api/auth/forgot-password` | POST | Request password reset | Registered email exists | `{ "email": "customer01@test.com","newPassword" :"123456" }` | 200 OK. Password reset email / response processed. |

---

## 2. Catalog (`/api/catalog`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/catalog/products` | GET | Retrieve storefront products catalog | Active products exist | N/A | 200 OK. List of storefront products returned. |
| `/api/catalog/categories` | GET | Retrieve catalog categories | Categories exist | N/A | 200 OK. List of categories returned. |
| `/api/catalog/banners` | GET | Retrieve active catalog banners | Banners exist | N/A | 200 OK. List of active banners returned. |
| `/api/catalog/manufacturers` | GET | Retrieve catalog manufacturers | Manufacturers exist | N/A | 200 OK. List of manufacturers returned. |

---

## 3. Products, Categories & Manufacturers

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/products` | GET | Get products list with filtering | Products exist | `?category_id=1&search=gaming` | 200 OK. Matching list of products. |
| `/api/products/:id` | GET | Get product details by ID | Product ID exists | Path `id=1` | 200 OK. Product details object returned. |
| `/api/products` | POST | Create new product | Admin / Product Manager JWT | `{        "status": "active",        "id": 17,        "name": "New version",        "rating": 4.7,        "price": 36990000,        "category_id": 1,        "manufacturer_id": 1,        "stock": 15,        "img_URL": "src/asset/images/product/1.png" }` | 201 Created. New product created successfully. |
| `/api/products/:id` | PUT | Update product details by ID | Admin JWT, Product exists | Path `id=1`, Body: `{ "price": 2300000, "name": "Bàn Phím Cơ Custom SNG-01 (Sale)" }` | 200 OK. Product updated successfully. |
| `/api/products/:id` | DELETE | Delete product by ID | Admin JWT, Product exists | Path `id=1` | 200 OK. Product deleted successfully. |
| `/api/categories` | GET | List all categories | Categories exist | N/A | 200 OK. List of categories returned. |
| `/api/categories/:id` | GET | Get category details by ID | Category ID exists | Path `id=1` | 200 OK. Category details returned. |
| `/api/categories` | POST | Create new category | Admin JWT | `{ "name": "Bàn Phím Cơ", "description": "Danh mục bàn phím cơ các loại" }` | 201 Created. Category created successfully. |
| `/api/categories/:id` | PUT | Update category by ID | Admin JWT, Category exists | Path `id=1`, Body: `{ "name": "Bàn Phím Cơ Custom" }` | 200 OK. Category updated successfully. |
| `/api/categories/:id` | DELETE | Delete category by ID | Admin JWT, Category exists | Path `id=1` | 200 OK. Category deleted. |
| `/api/manufacturers` | GET | List all manufacturers | Manufacturers exist | N/A | 200 OK. List of manufacturers returned. |
| `/api/manufacturers/:id` | GET | Get manufacturer by ID | Manufacturer ID exists | Path `id=1` | 200 OK. Manufacturer details returned. |
| `/api/manufacturers` | POST | Create new manufacturer | Admin JWT | `{ "name": "Logitech G", "description": "Thương hiệu gaming gear Thụy Sĩ" }` | 201 Created. Manufacturer created. |
| `/api/manufacturers/:id` | PUT | Update manufacturer by ID | Admin JWT, Manuf. exists | Path `id=1`, Body: `{ "name": "Logitech G Official" }` | 200 OK. Manufacturer updated. |
| `/api/manufacturers/:id` | DELETE | Delete manufacturer by ID | Admin JWT, Manuf. exists | Path `id=1` | 200 OK. Manufacturer deleted. |

---

## 4. Cart (`/api/cart`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/cart` | GET | Get current cart | Cart exists or optional JWT | N/A | 200 OK. Cart contents returned. |
| `/api/cart` | POST | Sync / add items to cart | Product exists | `{ "productId": 1, "quantity": 1 }` | 200 OK. Cart synced & updated. |
| `/api/cart/:id` | PUT | Update cart details by ID | Cart session exists | Path `id=1`, Body: `{ "status": "active" }` | 200 OK. Cart details updated. |
| `/api/cart/:id` | DELETE | Remove cart session by ID | Cart session exists | Path `id=1` | 200 OK. Cart session removed. |
| `/api/cart` | DELETE | Clear entire shopping cart | Cart active | N/A | 200 OK. Cart cleared. |
| `/api/cart/items` | POST | Add item to cart | Valid product ID | `{ "productId": 1, "quantity": 2 }` | 200 OK. Item added to cart. |
| `/api/cart/items/:itemId` | PUT | Update item quantity in cart | Item exists in cart | Path `itemId=1`, Body: `{ "quantity": 3 }` | 200 OK. Item quantity updated. |
| `/api/cart/items/:itemId` | DELETE | Remove specific item from cart | Item exists in cart | Path `itemId=1` | 200 OK. Item removed from cart. |

---

## 5. Orders & Order Items (`/api/orders`, `/api/orderItems`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/orders` | GET | Retrieve orders list / lookup | Code parameter or Staff/Admin JWT | `?code=ORD12345` | 200 OK. Matching orders returned. |
| `/api/orders/statuses` | GET | Get order status enum list | Authenticated user | N/A | 200 OK. List of valid order statuses returned. |
| `/api/orders/report` | GET | View sales report | Sales Staff / Admin JWT | N/A | 200 OK. Sales report statistics returned. |
| `/api/orders/my` | GET | Get customer order history | Authenticated customer JWT | N/A | 200 OK. List of personal orders returned. |
| `/api/orders` | POST | Create new order (Checkout) | Cart contains items | `{ "items": [{ "productId": 1, "quantity": 1 }], "shippingAddress": { "street": "123 Lê Lợi", "ward": "Phường Bến Nghé", "city": "TP.HCM" }, "paymentMethod": "COD" }` | 201 Created. New order created. |
| `/api/orders/:id` | GET | Get order details by ID | Authenticated user | Path `id=1` | 200 OK. Detailed order info returned. |
| `/api/orders/:id/payment` | POST | Process order payment | Valid order ID | Path `id=1`, Body: `{ "paymentMethod": "VNPAY" }` | 200 OK. Payment response returned. |
| `/api/orders/:id/status` | PUT | Update order status | Sales Staff / Admin JWT | Path `id=1`, Body: `{ "status": "SHIPPED" }` | 200 OK. Order status updated. |
| `/api/orders/:id` | PUT | Edit order details | Sales Staff / Admin JWT | Path `id=1`, Body: `{ "note": "Giao giờ hành chính" }` | 200 OK. Order info updated. |
| `/api/orders/:id` | DELETE | Delete order | Sales Staff / Admin JWT | Path `id=1` | 200 OK. Order deleted. |
| `/api/orderItems` | GET | List order items by order ID | Order items exist | `?orderId=1` | 200 OK. List of order items returned. |

---

## 6. Inventory & Warehouses (`/api/warehouses`, `/api/stock`, `/api/stock-history`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/warehouses` | GET | List all warehouses | Warehouses exist | N/A | 200 OK. List of warehouses. |
| `/api/warehouses/:id` | GET | Get warehouse details | Warehouse ID exists | Path `id=1` | 200 OK. Warehouse details returned. |
| `/api/warehouses` | POST | Create new warehouse | Admin JWT | `{ "name": "Kho Tổng TP.HCM", "location": "Quận 7, TP.HCM" }` | 201 Created. Warehouse created. |
| `/api/warehouses/:id` | PUT | Update warehouse | Admin JWT, Warehouse exists | Path `id=1`, Body: `{ "name": "Kho Tổng TP.HCM (Mở Rộng)" }` | 200 OK. Warehouse updated. |
| `/api/warehouses/:id` | DELETE | Delete warehouse | Admin JWT, Warehouse exists | Path `id=1` | 200 OK. Warehouse deleted. |
| `/api/stock` | GET | Check stock levels | Stock entries exist | `?productId=1&warehouseId=1` | 200 OK. List of stock levels. |
| `/api/stock/:id` | GET | Get specific stock entry | Stock ID exists | Path `id=1` | 200 OK. Stock entry details. |
| `/api/stock` | POST | Create stock record | Admin / Stock Manager JWT | `{ "warehouseId": 1, "productId": 1, "quantity": 50 }` | 201 Created. Stock record created. |
| `/api/stock/:id` | PUT | Update / Restock inventory quantity | Admin JWT, Stock exists | Path `id=1`, Body: `{ "quantity": 100 }` | 200 OK. Stock level updated. |
| `/api/stock/:id` | PATCH | Partial update stock quantity | Admin JWT, Stock exists | Path `id=1`, Body: `{ "quantity": 75 }` | 200 OK. Stock level patched. |
| `/api/stock/:id` | DELETE | Delete stock entry | Admin JWT, Stock exists | Path `id=1` | 200 OK. Stock entry deleted. |
| `/api/stock-history` | GET | View stock history logs | Stock history exists | `?productId=1` | 200 OK. Stock history list. |
| `/api/stock-history/:id` | GET | Get stock history log details | History ID exists | Path `id=1` | 200 OK. Details of history log. |
| `/api/stock-history` | POST | Record stock transaction log | Admin JWT | `{ "warehouseId": 1, "productId": 1, "changeType": "IMPORT", "quantity": 50, "note": "Nhập hàng từ NCC" }` | 201 Created. History log saved. |

---

## 7. Showroom, Vouchers, Promotions & Banners

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/showroom` | GET | List all showrooms | Showrooms exist | N/A | 200 OK. Showrooms list returned. |
| `/api/showroom/:id` | GET | Get showroom details | Showroom ID exists | Path `id=1` | 200 OK. Showroom details returned. |
| `/api/showroom` | POST | Create new showroom | System Admin JWT | `{ "name": "Showroom Quận 1", "address": "99 Nguyễn Huệ, Q.1, TP.HCM", "phone": "0281234567" }` | 201 Created. Showroom created. |
| `/api/showroom/:id` | PUT | Update showroom info | System Admin JWT | Path `id=1`, Body: `{ "name": "Showroom Flagship Q.1" }` | 200 OK. Showroom updated. |
| `/api/showroom/:id` | DELETE | Delete showroom | System Admin JWT | Path `id=1` | 200 OK. Showroom deleted. |
| `/api/vouchers` | GET | List all vouchers | Vouchers exist | N/A | 200 OK. List of vouchers. |
| `/api/vouchers/:id` | GET | Get voucher details | Voucher ID exists | Path `id=1` | 200 OK. Voucher details returned. |
| `/api/vouchers` | POST | Create new discount voucher | Admin JWT | `{ "code": "SNGSUMMER","description": "Giảm 50% cho đơn từ 100.000.000đ","discountPercentage": 50,"minOrderValue": 500000, "isActive": true }` | 201 Created. Voucher created. |
| `/api/vouchers/:id` | PUT | Update voucher | Admin JWT, Voucher exists | Path `id=1`, Body: `{  "isActive": false}` | 200 OK. Voucher updated. |
| `/api/vouchers/:id` | DELETE | Delete voucher | Admin JWT, Voucher exists | Path `id=1` | 200 OK. Voucher deleted. |
| `/api/promotions` | GET | List active promotions / Flash Sales | Promotions exist | N/A | 200 OK. List of promotions returned. |
| `/api/promotions/:id` | GET | Get promotion details | Promotion ID exists | Path `id=1` | 200 OK. Promotion details. |
| `/api/promotions` | POST | Create promotion campaign | Admin JWT | `{  "id": 6,"name": "Flash Sale Khai Trương","discountPercent": 15,"productIds": [1,2],"startDate": "2026-07-24T00:00:00.000Z","endDate": "2026-07-26T23:59:59.000Z","status": "active"}` | 201 Created. Promotion created. |
| `/api/promotions/:id` | PUT | Update promotion campaign | Admin JWT | Path `id=1`, Body: `{ "discountPercent": 25 }` | 200 OK. Promotion updated. |
| `/api/promotions/:id` | DELETE | Delete promotion campaign | Admin JWT | Path `id=1` | 200 OK. Promotion deleted. |
| `/api/banners` | GET | List advertising banners | Banners exist | N/A | 200 OK. List of banners. |
| `/api/banners/:id` | GET | Get banner details | Banner ID exists | Path `id=1` | 200 OK. Banner details returned. |
| `/api/banners` | POST | Create banner | Admin JWT | `{ "imageUrl": "/asset/images/banner/b1.png", "targetUrl": "/api/promotions/1" }` | 201 Created. Banner created. |
| `/api/banners/:id` | PUT | Update banner | Admin JWT | Path `id=1`, Body: `{ "targetUrl": "/api/catalog/products" }` | 200 OK. Banner updated. |
| `/api/banners/:id` | DELETE | Delete banner | Admin JWT | Path `id=1` | 200 OK. Banner deleted. |

---

## 8. News & Comments (`/api/news`, `/api/comments`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/news` | GET | List news articles | Articles exist | N/A | 200 OK. News list returned. |
| `/api/news/:id` | GET | Get news article details | Article ID exists | Path `id=1` | 200 OK. News article details. |
| `/api/news` | POST | Create news article | Admin JWT | `{ "title": "Đánh giá Bàn Phím Cơ Custom SNG-01", "content": "Bài viết đánh giá chi tiết..." }` | 201 Created. News created. |
| `/api/news/:id` | PUT | Update news article | Admin JWT | Path `id=1`, Body: `{ "title": "Đánh giá Bàn Phím Cơ Custom SNG-01 (Chi Tiết)" }` | 200 OK. Article updated. |
| `/api/news/:id` | DELETE | Delete news article | Admin JWT | Path `id=1` | 200 OK. Article deleted. |
| `/api/comments` | GET | Get product comments | Product ID provided | `?productId=1` | 200 OK. List of product comments. |
| `/api/comments` | POST | Post new product review/comment | Authenticated customer JWT | `{ "productId": 1, "content": "Sản phẩm gõ rất êm, đóng gói cẩn thận!", "rating": 5 }` | 201 Created. Comment posted. |
| `/api/comments/:id` | DELETE | Delete comment | Comment owner or Admin JWT | Path `id=1` | 200 OK. Comment deleted. |

---

## 9. Accounts & Users (`/api/accounts`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/accounts` | GET | List all user & staff accounts | System Admin JWT | N/A | 200 OK. List of user accounts. |
| `/api/accounts/:id` | GET | Get user account profile by ID | System Admin JWT or Account Owner | Path `id=1` | 200 OK. Account profile details returned. |
| `/api/accounts` | POST | Create staff / admin account | System Admin JWT | `{ "username": "staff01", "email": "staff01@sng.vn", "password": "StaffPassWord123", "role": "sales_staff" }` | 201 Created. New staff account created. |
| `/api/accounts/:id` | PUT | Update account role / information | System Admin JWT | Path `id=1`, Body: `{ "role": "product_manager" }` | 200 OK. Account updated successfully. |
| `/api/accounts/:id` | DELETE | Delete account | System Admin JWT | Path `id=1` | 200 OK. Account deleted. |

---

## 10. Specifications & Attributes (`/api/specifications`, `/api/attributeGroups`, `/api/attributes`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/specifications` | GET | Get product specifications list | Specs exist | N/A | 200 OK. List of specifications. |
| `/api/specifications/groups` | GET | List specification attribute groups | Groups exist | N/A | 200 OK. Specification groups list. |
| `/api/specifications/groups` | POST | Create specification group | Admin JWT | `{ "name": "Thông Số Kết Nối" }` | 201 Created. Group created. |
| `/api/specifications/groups/:id` | PUT | Update specification group | Admin JWT | Path `id=1`, Body: `{ "name": "Kết Nối & Pin" }` | 200 OK. Group updated. |
| `/api/specifications/groups/:id` | PATCH | Partial update spec group | Admin JWT | Path `id=1`, Body: `{ "name": "Kết Nối & Pin" }` | 200 OK. Group patched. |
| `/api/specifications/groups/:id` | DELETE | Delete specification group | Admin JWT | Path `id=1` | 200 OK. Group deleted. |
| `/api/specifications/attributes` | GET | List detailed attributes | Attributes exist | N/A | 200 OK. List of attributes. |
| `/api/specifications/attributes` | POST | Create attribute | Admin JWT | `{ "groupId": 1, "name": "Bluetooth Version", "value": "5.3" }` | 201 Created. Attribute created. |
| `/api/specifications/attributes/:id` | PUT | Update attribute | Admin JWT | Path `id=1`, Body: `{ "value": "5.4" }` | 200 OK. Attribute updated. |
| `/api/specifications/attributes/:id` | PATCH | Partial update attribute | Admin JWT | Path `id=1`, Body: `{ "value": "5.4" }` | 200 OK. Attribute patched. |
| `/api/specifications/attributes/:id` | DELETE | Delete attribute | Admin JWT | Path `id=1` | 200 OK. Attribute deleted. |
| `/api/attributeGroups` | GET | List attribute groups endpoint | Groups exist | N/A | 200 OK. Groups list returned. |
| `/api/attributes` | GET | List attributes endpoint | Attributes exist | N/A | 200 OK. Attributes list returned. |

---

## 11. Statistics & Reports (`/api/statistics`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/statistics/overview` | GET | Get admin dashboard statistical overview | Admin / Product Manager JWT | N/A | 200 OK. Dashboard revenue, total orders, sales analytics summary. |

---

## 12. Geolocation & Metadata

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/provinces` | GET | Fetch Vietnam provinces list | External proxy available | N/A | 200 OK. Array of Vietnam provinces. |
| `/api/provinces/:code/wards` | GET | Fetch wards for province code | Valid province code | Path `code=79` | 200 OK. List of wards in province. |
| `/api/orderStatus` | GET | Get order status enum list | Metadata available | N/A | 200 OK. Statuses list returned. |
| `/api/paymentMethods` | GET | Get supported payment methods | Metadata available | N/A | 200 OK. Payment methods list (COD, VNPAY, Bank). |
| `/api/shippingAddresses` | GET | Get user saved shipping addresses | Authenticated user | N/A | 200 OK. Saved shipping addresses array. |

---

## 13. AI Assistant (`/api/ai`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/ai/chat` | POST | Send message to AI Assistant | Valid user request | `{ "message": "Tư vấn cho tôi bàn phím cơ gõ êm dưới 2 triệu" }` | 200 OK. AI recommendation response text returned. |

---

## 14. System Health (`/health`)

| Endpoint | Method | Test Case Name | Preconditions | Input / Request Body | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/health` | GET | Verify backend system health | Backend server running | N/A | 200 OK. Returns `{"status": "up"}`. |
