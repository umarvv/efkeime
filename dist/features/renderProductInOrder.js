export function renderProductInOrder(image, name, price, quantity) {
    const img = document.createElement('img');
    img.src = image;
    img.classList.add('product__in__order__infos__img');
    img.alt = '';
    const nameProductInOrder = document.createElement('span');
    nameProductInOrder.classList.add('product__in__order__infos__name');
    nameProductInOrder.textContent = name;
    const quantityProductInOrder = document.createElement('span');
    quantityProductInOrder.classList.add('product__in__order__details__quantity');
    quantityProductInOrder.textContent = `${quantity}x`;
    const priceProductInOrder = document.createElement('span');
    priceProductInOrder.classList.add('product__in__order__details__price');
    priceProductInOrder.textContent = `@$${price.toFixed(2)}`;
    const priceTotalProductInOrder = document.createElement('span');
    priceTotalProductInOrder.classList.add('product__in__order__details__priceTotal');
    priceTotalProductInOrder.textContent = `$${(price * quantity).toFixed(2)}`;
    const divProductInOrderDetails = document.createElement('div');
    divProductInOrderDetails.classList.add('product__in__order__details');
    divProductInOrderDetails.append(quantityProductInOrder, priceProductInOrder);
    const divProductInOrderInfos = document.createElement('div');
    divProductInOrderInfos.classList.add('product__in__order__infos');
    divProductInOrderInfos.append(nameProductInOrder, divProductInOrderDetails);
    const line = document.createElement('hr');
    line.classList.add('line__in__order');
    const divProductInOrder = document.createElement('div');
    divProductInOrder.classList.add('product__in__order');
    divProductInOrder.append(img, divProductInOrderInfos, priceTotalProductInOrder, line);
    const divProductInOrderOverview = document.createElement('div');
    divProductInOrderOverview.classList.add('product__in__order__overview');
    divProductInOrderOverview.append(divProductInOrder);
    const orderContainer = document.querySelector('#product--in--order');
    if (orderContainer) {
        orderContainer.append(divProductInOrderOverview);
    }
}
