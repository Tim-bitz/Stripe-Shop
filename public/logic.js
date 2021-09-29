const publicKey = "pk_test_51Jc4KaFYrsT4JzuLnxfWccQV75y84ogkUy5ptJoxmDaja5LIaydegbHC3I8kszcwiuHrWMa4XOsI6DwEFzsBlcGF00RMkCDsNF"
//const sessionId = localStorage.getItem(session)

let cart = {}

let stripe = Stripe(publicKey)
//document.getElementById("testBtn").addEventListener("click", async () => {

/*     if (Object.keys(testCar).length == 0) {
        console.log("No products")
    }

    const response = await fetch("/api/session/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
            line_items: Object.values(testCart)
        })
    })
    const { id } = await response.json()
    localStorage.setItem("session", id)
    alert(id)
    stripe.redirectToCheckout({ sessionId: id }); */
//})


/* const verify = async () => {
    
} */

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

/* let quantity = 0
function addProduct() {
    quantity++
    cart = {
        'Liquid Ice': {
            name: "Liquid Ice",
            description: 'boxed in liquid form',
            price_data: {
                currency: 'sek',
                product_data: {
                    name: 'boxedIce'
                },
                unit_amount: quantity
            }
        }
    }
    let getCart = localStorage.getItem('cart')

    let setCart = localStorage.setItem("cart", JSON.stringify(cart))

} */


const addProduct = async (productKey) => {
    const product = productsDB[productKey];

    console.log(product)

    if (!product) {
        throw new Error('Product does not Exist')
    }

    cart[productKey] = cart[productKey] || product;
    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;
    let getCart = localStorage.getItem('cart')
    let setCart = localStorage.setItem("cart", JSON.stringify(cart))
    console.log({ cart, line_items: Object.values(cart), setCart })


}

const checkout = async () => {
    try {
        if (Object.keys(cart).length == 0) {
            console.log("No products")
        }
        console.log(cart)
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

let list = "detta är en cool lista av våra is produkter"

async function verify() {
    try {

        const sessionId = localStorage.getItem("session")

        if (!sessionId) {
            console.log('No session ID to verify')
            //session ID finns inte i Localstorage
        } //Delete
        //console.log(sessionId)

        const response = await fetch('/api/session/verify/' + sessionId, {
            method: "POST",
            headers: { 'Contenet-Type': 'application/json' },
            body: JSON.stringify({ list: list })
        })
        /*     body:
            JSON.stringify({
                sessionId: sessionId 
            }) */

        const result = await response.json()

        console.log(result)
        const { paid } = await response.json()

        return paid;

    } catch (err) {
        console.error(err)
        return false
    }
}



async function main() {

    //document.getElementById('addbtn').addEventListener('click', addProduct)
    //document.getElementById('addbtn').addEventListener('click', () => addProduct('liquidIce'))


    /*     if (document.getElementById('checkOutBtn')) {
            document.getElementById('checkOutBtn').addEventListener('click', () => checkout())
        } */
    //console.log("isVerified", isVerified)
    localStorage.removeItem("session")
}
main()
/* const addProduct = async (productKey) => {
    const product = productsDB[productKey];
    if (!product) {
        throw new Error('Product does not Exist')
    }


    cart[productKey] = cart[productKey] || product;
    cart[productKey].quantity = cart[productKey].quantity || 0;
    cart[productKey].quantity++;
    console.log({ cart, line_items: Object.values(testCart)})
} */
