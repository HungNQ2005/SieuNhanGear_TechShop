export const API = {
    //Navigate to back-end
    BASE_API_URL: 'http://localhost:3521/',
    GET_CATEGORY: 'api/categories',
    GET_CATEGORY_BY_ID:(id) => `api/categories/${id}`,
    GET_MANUFACTURER: 'api/manufacturers',
    GET_MANUFACTURE_BY_ID: (id) => `api/manufacturers/${id}`,
    GET_BANNER: 'api/banners',
    GET_BANNER_BY_ID: (id) => `api/banners/${id}`,
    GET_PRODUCT: 'api/products',
    GET_PRODUCT_BY_ID: (id) => `api/products/${id}`,
    GET_NEWS: 'api/news',
    GET_NEWS_BY_ID: (id) => `api/news/${id}`,
    GET_ACCOUNTS: 'api/accounts',
    GET_ACCOUNT_BY_ID: (id) => `api/accounts/${id}`,
    GET_COMMENTS: 'api/comments',
    GET_COMMENT_BY_ID: (id) => `api/comments/${id}`,
};