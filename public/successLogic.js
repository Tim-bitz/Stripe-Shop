function getProducts() {
    const getCartList = localStorage.getItem('cart')
    let cartlist = JSON.parse(getCartList)
    console.log(cartlist)
    
    return cartlist
}

let cart = getProducts()

async function success() {
    
    if (!cart) {
        alert('Köp redan avslutat')
    } else {
        
        let cartItems = Object.values(cart)
        //console.log(cartItems.price_data.product_data.name)
        
        let products = cartItems.map((item) => {
            return item.price_data.product_data.name + ' ' + item.quantity + "st"
        })
        console.log(products)

        let orderDate = new Date()
        const response = await fetch('/api/recet', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderDate,
                products
            })
            
        })
        localStorage.removeItem("cart")
    }
}
success()
