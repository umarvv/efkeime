import { addToCart } from "./addToCart.js";
import { renderProduct } from "./renderProduct.js";
export async function getProducts(url) {
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error('Products not found.');
        }
        const products = await resp.json();
        products.forEach(product => {
            const image = product.image.desktop;
            const category = product.category;
            const name = product.name;
            const price = product.price;
            renderProduct(image, category, name, price);
        });
        addToCart();
    }
    catch (error) {
        const errorSpan = document.querySelector('#error');
        if (errorSpan) {
            errorSpan.textContent = `${error}`;
        }
    }
}
