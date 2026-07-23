const swaggerJsdoc = require("swagger-jsdoc");
const { env } = require("./env");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SieuNhanGear TechShop API",
      version: "1.0.0",
      description:
        "RESTful API Documentation cho hệ thống SieuNhanGear TechShop Backend.",
      contact: {
        name: "SieuNhanGear TechShop Team",
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Nhập JWT Token theo định dạng: Bearer <token>",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: [
      { name: "Health", description: "Kiểm tra trạng thái hệ thống" },
      { name: "Auth", description: "Xác thực & phân quyền người dùng" },
      { name: "Catalog", description: "Danh mục và tổng quan catalog" },
      { name: "Products", description: "Quản lý sản phẩm" },
      { name: "Categories", description: "Quản lý danh mục sản phẩm" },
      { name: "Manufacturers", description: "Quản lý nhà sản xuất / thương hiệu" },
      { name: "Cart", description: "Quản lý giỏ hàng" },
      { name: "Orders", description: "Quản lý đơn hàng" },
      { name: "Accounts", description: "Quản lý tài khoản người dùng" },
      { name: "Vouchers", description: "Quản lý mã giảm giá" },
      { name: "Showrooms", description: "Quản lý cửa hàng / showroom" },
      { name: "Warehouses", description: "Quản lý kho hàng" },
      { name: "Stock", description: "Quản lý tồn kho" },
      { name: "Banners", description: "Quản lý banner quảng cáo" },
      { name: "News", description: "Quản lý tin tức / bài viết" },
      { name: "Comments", description: "Quản lý bình luận & đánh giá" },
      { name: "Promotions", description: "Quản lý khuyến mãi" },
      { name: "Specifications", description: "Quản lý thông số kỹ thuật" },
      { name: "Statistics", description: "Thống kê & báo cáo" },
      { name: "AI", description: "Tích hợp trợ lý AI" },
    ],
  },
  apis: [
    "./src/routes/*.js",
    "./src/features/**/*.routes.js",
    "./src/features/**/*.js",
    "./src/app.js",
    "./src/config/swagger.config.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec };
