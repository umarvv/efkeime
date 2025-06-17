import { renderProductInCart } from "./renderProductInCart.js"

function calculateTotalPrice() {
    const orderTotal = document.querySelectorAll('.order__total__price')
    const priceTotalSpans = document.querySelectorAll('.product__in__cart__details__priceTotal') as NodeListOf<HTMLSpanElement>
    let totalPrice = 0
    priceTotalSpans.forEach((span) => {
        const textContent = span.textContent ?? ''
        const numericValue = parseFloat(textContent.replace(/[^0-9.]/g, '')) || 0
        totalPrice += numericValue
        
    })
    orderTotal.forEach((span) => {
        span.textContent = `$${totalPrice.toFixed(2)}`
    })
}

function calculateTotalQuantity() {
    const quantitySpans = document.querySelectorAll('.product__in__cart__details__quantity') as NodeListOf<HTMLSpanElement>
    let yourCartQuantity: HTMLTitleElement | null = document.querySelector('.desserts__cart__empty__cart__t')
    let totalQuantity = 0

    quantitySpans.forEach(span => {
        const textContent = span.textContent ?? ''
        const numericValue = parseFloat(textContent.replace(/[^0-9.]/g, '')) || 0
        totalQuantity += numericValue
    })

    if(yourCartQuantity) {
        yourCartQuantity.textContent = `Your Cart (${totalQuantity})`
    }
}

function removeByIcon(productInfos: HTMLDivElement, $quantityPickerContainer:HTMLDivElement ,cartQuantity: number) {
    const productInCart = document.querySelectorAll('.product__in__cart__infos') as NodeListOf<HTMLDivElement>
    
    productInCart.forEach((product) => {

        const productInCartContainer = product.closest('.product__in__cart__overview') as HTMLDivElement | null
        const productInCartInfos = productInCartContainer.querySelector('.product__in__cart__infos') as HTMLDivElement | null
        const iconRemove = productInCartContainer.querySelector('.product__in__cart__btnRemove') as HTMLButtonElement
        if(!productInCartContainer && !iconRemove) return

        iconRemove.addEventListener('click', () => {
            if(productInfos.dataset.name === productInCartInfos.dataset.name) {
                $quantityPickerContainer.style.display = 'none'
                const cart = document.querySelector('#product--in--cart')
                if(!cart) return
                cart.removeChild(productInCartContainer)
                cartEmpty(cartQuantity)
                calculateTotalQuantity()
                calculateTotalPrice()
            }
        })

    })
}

function quantityPicker(event:Event, operation: string) {
    const cart = document.querySelector('#product--in--cart')
    const productsInCart = document.querySelectorAll<HTMLDivElement>('.product__in__cart__infos')
    const productContainer = (event.currentTarget as HTMLElement).closest('.product')
    const productInfos = productContainer.querySelector<HTMLDivElement>('.product__infos')
    const productName = productInfos.dataset.name
    let productQuantity = parseFloat(productInfos.dataset.quantity)

    if(operation === '+') {
        productQuantity += 1
        productInfos.dataset.quantity = productQuantity.toString()
    } else if(operation === '-') {
        productQuantity -= 1
        productInfos.dataset.quantity = productQuantity.toString()
    }

    productsInCart.forEach((productInCart) => {
        const productInCartName = productInCart.dataset.name
        const productInCartPrice = parseFloat(productInCart.dataset.price)
        const productInCartQuantityContainer = productInCart.querySelector('.product__in__cart__details__quantity')
        const $product__in__cart__details__priceTotalContainer = productInCart.querySelector('.product__in__cart__details__priceTotal')
        const $counter = productContainer.querySelector('.product__quantity')
        const $quantityPickerContainer = productContainer.querySelector<HTMLDivElement>('.product__btns__decrement__increment')

        if(productName === productInCartName) {
            if(productQuantity < 1) {
                $quantityPickerContainer.style.display = 'none'
                cart.removeChild(productInCart.closest('.product__in__cart__overview'))
            }
            
            productInCart.dataset.quantity = productQuantity.toString()
            productInCartQuantityContainer.textContent = `${productQuantity}x`
            $product__in__cart__details__priceTotalContainer.textContent = `$${(productQuantity * productInCartPrice).toFixed(2)}`
            $counter.textContent = `${productQuantity}`
        }
    })
    cartEmpty(cart.querySelectorAll('.product__in__cart__overview').length)
    calculateTotalPrice()
    calculateTotalQuantity()
}

function showOrHideCart(showOrHide: string) {
    const cart: HTMLDivElement | null = document.querySelector('#product--in--cart')!
    const emptyCartMessage: HTMLDivElement | null = document.querySelector('#desserts--cart--empty--cart')
    const cartWithItems: HTMLDivElement | null = document.querySelector('#desserts--cart--with--items')
    if(!emptyCartMessage || !cartWithItems) return

    if(showOrHide === 'hide') {
        cartWithItems.style.display = 'none'
        emptyCartMessage.style.display = 'flex'
        cart.innerHTML = ''
    } else {
        cartWithItems.style.display = 'flex'
        emptyCartMessage.style.display = 'none'
    }
}

function cartEmpty(cartQuantity:number) {
    const cart: HTMLDivElement | null = document.querySelector('#product--in--cart')!
    const updatedProductsInCart = cart.querySelectorAll('.product__in__cart__overview')
    cartQuantity = updatedProductsInCart.length

    if (cartQuantity < 1) {
        showOrHideCart('hide')
    }
}

export function addToCart() {
    const btnsAddToCart = document.querySelectorAll('.product__btn__add__to__cart')
    btnsAddToCart.forEach((button) => {

        button.addEventListener('click', (event) => {
            const cart: HTMLDivElement | null = document.querySelector('#product--in--cart')
            let productsInCart = cart.querySelectorAll('.product__in__cart__overview')
            const cartQuantity = productsInCart.length + 1

            showOrHideCart('show')

            const productContainer = (event.currentTarget as HTMLDivElement).closest('.product')
            const productInfosContainer = productContainer.querySelector<HTMLDivElement>('.product__infos')
            const $quantityPickerContainer = productContainer.querySelector<HTMLDivElement>('.product__btns__decrement__increment')
            const productName = productInfosContainer.dataset.name || ''
            const productPrice = parseFloat(productInfosContainer.dataset.price)
            productInfosContainer.dataset.quantity = '1'

            const $btnDecrement = $quantityPickerContainer.querySelector<HTMLButtonElement>('.product__btn__decrement')
            const $counter = $quantityPickerContainer.querySelector<HTMLButtonElement>('.product__quantity')
            const $btnIncrement = $quantityPickerContainer.querySelector<HTMLButtonElement>('.product__btn__increment')

            if(!productContainer) return
            if(!productInfosContainer || !$quantityPickerContainer ) return
            if(!cart) return
            if(!$btnDecrement || !$btnIncrement) return


            $btnDecrement.replaceWith($btnDecrement.cloneNode(true))
            $btnIncrement.replaceWith($btnIncrement.cloneNode(true))

            const $newBtnDecrement = $quantityPickerContainer.querySelector<HTMLButtonElement>('.product__btn__decrement')
            const $newBtnIncrement = $quantityPickerContainer.querySelector<HTMLButtonElement>('.product__btn__increment')

            
            $quantityPickerContainer.style.display = 'flex'
            $counter.textContent = '1'

            renderProductInCart(productName, productPrice)
            cartEmpty(cartQuantity)
            calculateTotalPrice()
            calculateTotalQuantity()
            removeByIcon(productInfosContainer, $quantityPickerContainer, cartQuantity)
            $newBtnDecrement.addEventListener('click', (event) => {
                quantityPicker(event, '-')
            })
            $newBtnIncrement.addEventListener('click', (event) => {
                quantityPicker(event, '+')
            })
        })
    })
}