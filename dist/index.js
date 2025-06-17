import { getProducts } from "./features/getProducts.js";
import { processCart } from "./features/processCart.js";
import { renderProductInOrder } from "./features/renderProductInOrder.js";
function confirmOrder() {
    const confirmOrder = document.querySelector('#confirm--order');
    if (!confirmOrder)
        return;
    confirmOrder.addEventListener('click', () => {
        processCart();
        setTimeout(() => {
            window.location.href = 'orderConfirmed.html';
        }, 1 * 1000);
    });
}
function savedProduct() {
    const savedProduct = JSON.parse(localStorage.getItem('product')) || [];
    const orderTotal = document.querySelector('.order__total__price');
    const totalPrice = savedProduct.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
    savedProduct.forEach((product) => {
        const img = product.img;
        const name = product.name;
        const quantity = product.quantity;
        const price = product.price;
        renderProductInOrder(img, name, price, quantity);
    });
    orderTotal.textContent = `$${totalPrice.toFixed(2)}`;
}
function newOrder() {
    const newOrder = document.querySelector('#start--new--order');
    if (!newOrder)
        return;
    newOrder.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}
document.addEventListener('DOMContentLoaded', () => {
    savedProduct();
    newOrder();
    confirmOrder();
    getProducts('data.json');
});
