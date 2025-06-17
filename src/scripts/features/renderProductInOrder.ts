export function renderProductInOrder(image:string, name:string, price:number, quantity:number) {
    const img: HTMLImageElement | null = document.createElement('img')
    img.src = image
    img.classList.add('product__in__order__infos__img')
    img.alt = ''

    const nameProductInOrder: HTMLSpanElement | null = document.createElement('span')
    nameProductInOrder.classList.add('product__in__order__infos__name')
    nameProductInOrder.textContent = name

    const quantityProductInOrder: HTMLSpanElement | null = document.createElement('span')
    quantityProductInOrder.classList.add('product__in__order__details__quantity')
    quantityProductInOrder.textContent = `${quantity}x`

    const priceProductInOrder: HTMLSpanElement | null = document.createElement('span')
    priceProductInOrder.classList.add('product__in__order__details__price')
    priceProductInOrder.textContent = `@$${price.toFixed(2)}`

    const priceTotalProductInOrder: HTMLSpanElement | null = document.createElement('span')
    priceTotalProductInOrder.classList.add('product__in__order__details__priceTotal')
    priceTotalProductInOrder.textContent = `$${(price * quantity).toFixed(2)}`

    const divProductInOrderDetails: HTMLDivElement | null = document.createElement('div')
    divProductInOrderDetails.classList.add('product__in__order__details')
    divProductInOrderDetails.append(quantityProductInOrder, priceProductInOrder)

    const divProductInOrderInfos: HTMLDivElement | null = document.createElement('div')
    divProductInOrderInfos.classList.add('product__in__order__infos')
    divProductInOrderInfos.append(nameProductInOrder, divProductInOrderDetails)

    const line: HTMLHRElement | null = document.createElement('hr')
    line.classList.add('line__in__order')

    const divProductInOrder: HTMLDivElement | null = document.createElement('div')
    divProductInOrder.classList.add('product__in__order')
    divProductInOrder.append(img, divProductInOrderInfos, priceTotalProductInOrder, line)

    const divProductInOrderOverview: HTMLDivElement | null = document.createElement('div')
    divProductInOrderOverview.classList.add('product__in__order__overview')
    divProductInOrderOverview.append(divProductInOrder)

    const orderContainer: HTMLDivElement | null = document.querySelector('#product--in--order')
    if(orderContainer) {
        orderContainer.append(divProductInOrderOverview)
    }
}