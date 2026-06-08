export const API = {
    //Navigate to back-end
    BASE_API_URL: 'http://localhost:3521/',
    GET_CATEGORY: 'api/categories',
    GET_MANUFACTURER: 'api/manufacturers',
    GET_BANNER: 'api/banners',
    GET_PRODUCT: 'api/products',
    GET_PRODUCT_BY_ID: (id) => `api/products/${id}`,
    GET_NEWS: 'api/news',
};