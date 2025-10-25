export { getPaginatedProductWithImages } from './products/product-pagination';
export { getProductBySlug } from './products/get-product-by-slug';
export { getStockBySlug } from './products/get-stock-by-slug';
export { createUpdateProduct } from './products/create-update-product';
export { deleteProductImage } from './products/delete-product-image';
export { findProductsBySlug } from './products/find-products-by-slug';

export { login, authenticate } from './auth/login';
export { logout } from './auth/logout';
export { registerUser } from './auth/register';

export { getCountries } from './country/getCountries';
export { setUserAddress } from './address/set-user-address';
export { deleteUserAddress } from './address/delete-user-address';
export { getUserAddress } from './address/get-user-address';

export { placeOrder } from './order/place-order';
export { getOrderById } from './order/get-order-by-id';
export { getPaginatedOrders } from './order/get-paginated-orders';

export { setTransactionId } from './payments/set-transaction-id';
export { paypalCheckPayment } from './payments/paypal-check-payment';

export { getPaginaterUser } from './users/get-paginater-user';
export { changeUserRole } from './users/change-user-role';

export { default as getCategories } from './categories/getCategories';