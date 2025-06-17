export function renderProduct(image:string, category:string, name:string, price:number) {
    const img = document.createElement('img')
    img.src = image
    img.classList.add('product__img')
    img.alt = ''

    const btnAddToCart = document.createElement('button')
    btnAddToCart.textContent = `Add to Cart`
    btnAddToCart.classList.add('product__btn__add__to__cart')
    const btnAddtoCartIcon = document.createElement('img')
    btnAddtoCartIcon.src = 'src/assets/images/icon-add-to-cart.svg'
    btnAddtoCartIcon.alt = 'Decrement quantity'
    btnAddToCart.append(btnAddtoCartIcon)

    const btnDecrement = document.createElement('button')
    btnDecrement.classList.add('product__btn__decrement')
    const btnDecrementIcon = document.createElement('img')
    btnDecrementIcon.src = 'src/assets/images/icon-decrement-quantity.svg'
    btnDecrementIcon.alt = 'Decrement quantity'
    btnDecrement.append(btnDecrementIcon)

    const counter = document.createElement('span')
    counter.classList.add('product__quantity')
    counter.textContent = `${1}`

    const btnIncrement = document.createElement('button')
    btnIncrement.classList.add('product__btn__increment')
    const btnIncrementIcon = document.createElement('img')
    btnIncrementIcon.src = 'src/assets/images/icon-increment-quantity.svg'
    btnIncrementIcon.alt = 'Increment quantity'
    btnIncrement.append(btnIncrementIcon)

    const divBtnDecrementIncrement = document.createElement('div')
    divBtnDecrementIncrement.classList.add('product__btns__decrement__increment')
    divBtnDecrementIncrement.append(btnDecrement, counter, btnIncrement)

    const divBtnsCart = document.createElement('div')
    divBtnsCart.classList.add('product__btns__cart')
    divBtnsCart.append(btnAddToCart, divBtnDecrementIncrement)

    const divBtnsCartImg = document.createElement('div')
    divBtnsCartImg.classList.add('product__btns__cart__img')
    divBtnsCartImg.append(img, divBtnsCart)

    const categoryP = document.createElement('span')
    categoryP.classList.add('product__infos__category')
    categoryP.textContent = `${category}`

    const nameP = document.createElement('h2')
    nameP.classList.add('product__infos__name')
    nameP.textContent = `${name}`
   

    const priceP = document.createElement('span')
    priceP.classList.add('product__infos__price')
    priceP.textContent = `$${price.toFixed(2)}`

    const divProductInfos = document.createElement('div')
    divProductInfos.classList.add('product__infos')
    divProductInfos.append(categoryP, nameP, priceP)
    divProductInfos.dataset.category = category
    divProductInfos.dataset.name = name
    divProductInfos.dataset.price = price.toFixed(2)
    divProductInfos.dataset.quantity = '1'

    const divProduct = document.createElement('div')
    divProduct.classList.add('product')
    divProduct.append(divBtnsCartImg, divProductInfos)

    const productsContainer: HTMLDivElement | null = document.querySelector('#products')

    if(productsContainer) {
        productsContainer.append(divProduct)
    }
}