function getProducts() {
    const getCartList = localStorage.getItem('cart')

    let cartlist = JSON.parse(getCartList)
    console.log(cartlist)
    return cartlist
}
async function success() {
    let cart = getProducts()
    let cartItems = Object.values(cart)

    let amountKey = cartItems[0].quantity
    console.log(amountKey)
    const response = await fetch('/api/recet', {
        method: "POST",
        headers: { 'Contenet-Type': 'application/json' },
        body: JSON.stringify({
            amountKey
        })

    })
    localStorage.removeItem("cart")
}
success()
