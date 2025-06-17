import { addToCart } from "./addToCart.js";
import { renderProduct } from "./renderProduct.js";

interface Product {
    image: {
        desktop: string
        [key: string] : string
    }
    category: string
    name:string
    price:number
}

export async function getProducts(url: string) {
    try {
        const resp = await fetch(url)

        if(!resp.ok) {
            throw new Error('Products not found.')
        }

        const products: Product[] = await resp.json()

        products.forEach(product => {
            
            const image = product.image.desktop
            const category = product.category
            const name = product.name
            const price = product.price
            renderProduct(image, category, name, price)
        })

        addToCart()

    } catch (error) {
        const errorSpan: HTMLSpanElement | null = document.querySelector('#error')
        if(errorSpan) {
            errorSpan.textContent = `${error}`
        }
    }
}