const publicKey = "pk_test_51Jc4KaFYrsT4JzuLnxfWccQV75y84ogkUy5ptJoxmDaja5LIaydegbHC3I8kszcwiuHrWMa4XOsI6DwEFzsBlcGF00RMkCDsNF"


let cart = {}

let stripe = Stripe(publicKey)

const productsDB = {
    "LiquidIce": {
        description: "En kul produkt som du bara måste ha",
        price_data: {
            currency: "sek",
            product_data: {
                name: "LiquidIce",
                metadata: {
                    img: "./resources/glassOfWater.jpg",
                }
            },
            unit_amount: 500,
        }
    },
    "IceMarble": {
        description: "Marbles of Ice",
        price_data: {
            currency: "sek",
            product_data: {
                name: "IceMarble",
                metadata: {
                    img: "./resources/iceMarble.jpg",
                },
            },
            unit_amount: 45000,
        }
    },
    "RedSoda": {
        description: "Carbonated Liquid in the color of red",
        price_data: {
            currency: "sek",
            product_data: {
                name: "RedSoda",
                metadata: {
                    img: "./resources/sodaGlass.jpg",
                },
            },
            unit_amount: 29900,
        }
    }
}

const addProduct = async (productKey) => {
    const product = productsDB[productKey];

    if (!product) {
        throw new Error('Product does not Exist')
    }

    cart[productKey] = cart[productKey] || product;
    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;
    let getCart = localStorage.getItem('cart')
    let setCart = localStorage.setItem("cart", JSON.stringify(cart))

}

const checkout = async () => {
    try {
        if (Object.keys(cart).length == 0) {
        }
        const response = await fetch("/api/session/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                line_items: Object.values(cart)
            })
        })
        const { id } = await response.json()
        localStorage.setItem("session", id)
        stripe.redirectToCheckout({ sessionId: id });
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

async function main() {

    localStorage.removeItem("session")
}
main()

