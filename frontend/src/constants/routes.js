export const ROUTES = {
    //Navigate to front-end
    ROOT: '/',
    HOME: '/home',
    PRODUCT_PAGE: '/product/:id',
    //Navigate to back-end
    BASE_API_URL: 'http://localhost:3521/',
    GET_CATEGORY: '/categories',
    GET_MANUFACTURER: '/manufacturers',
    GET_BANNER: '/banners',
    GET_PRODUCT: '/products',
    GET_PRODUCT_BY_ID: (id) => `/products/${id}`,
    GET_NEWS: '/news',
};