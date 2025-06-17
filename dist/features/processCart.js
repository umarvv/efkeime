export function processCart() {
    const productsInMenu = document.querySelectorAll('.product__infos');
    const productsInCart = document.querySelectorAll('.product__in__cart__overview');
    const productsToSave = [];
    productsInCart.forEach((product) => {
        const productInCartInfos = product.querySelector('.product__in__cart__infos');
        if (!productInCartInfos)
            return;
        const productNameInCart = productInCartInfos.dataset.name;
        const productPriceInCart = parseFloat(productInCartInfos.dataset.price);
        const productQuantityInCart = parseFloat(productInCartInfos.dataset.quantity);
        const priceTotal = productPriceInCart * productQuantityInCart;
        productsInMenu.forEach((productMenu) => {
            if (productMenu.dataset.name === productNameInCart) {
                const productContainer = productMenu.closest('.product');
                const productImg = productContainer.querySelector('.product__img');
                if (!productImg || !productContainer)
                    return;
                const productImgUrl = `src/assets${productImg.src.split('assets')[1] || ''}`;
                const product = {
                    img: productImgUrl,
                    name: productNameInCart,
                    quantity: productQuantityInCart,
                    price: parseFloat(productPriceInCart.toFixed(2))
                };
                productsToSave.push(product);
                localStorage.setItem('product', JSON.stringify(productsToSave));
            }
        });
    });
}
