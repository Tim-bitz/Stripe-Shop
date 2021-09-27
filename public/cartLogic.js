productCard()
document.getElementById('homeBtn').addEventListener('click', productCard)
document.getElementById('cartBtn').addEventListener('click', cartCard)


function getProducts() {
    const getCartList = localStorage.getItem('cart')

    let cartlist = JSON.parse(getCartList)
    return cartlist
}



function productCard() {

    const item = productsDB
    let products = Object.values(item)

    let cartDiv = document.getElementById('mainContainer')
    cartDiv.innerHTML = ""

    let cardDiv = document.createElement('div')
    cardDiv.id = "cardDiv"

    let produktdiv = document.createElement('div')
    produktdiv.id = "produktdiv"

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        let productCard = document.createElement('div')
        let produktTitle = document.createElement('h3')
        let productImg = document.createElement('img')
        let produktDesc = document.createElement('p')
        let produktPrice = document.createElement('p')
        let br = document.createElement("br")
        let addbtn = document.createElement('button')

        productCard.style.borderBottom = "1px solid black"

        productImg.src = product.price_data.product_data.metadata.img

        produktTitle.style.borderBottom = "1px solid black"
        productCard.id = "productCard"
        produktTitle.innerText = product.price_data.product_data.name
        produktDesc.innerText = product.description
        produktPrice.innerText = "price: " + product.price_data.unit_amount / 100 + "kr"
        produktPrice.style.padding = "10px 0px"
        addbtn.innerText = "add to cart"
        addbtn.id = "checkOutBtn"
        addbtn.style.width = "100%"
        addbtn.addEventListener('click', () => {
            addProduct(product.price_data.product_data.name)
        })


        productCard.append(productImg, produktTitle, produktDesc, br, produktPrice, addbtn, br)
        produktdiv.append(productCard)
    }

    cardDiv.append(produktdiv)
    cartDiv.appendChild(cardDiv)


}


function cartCard() {
    let cartDiv = document.getElementById('mainContainer')
    cartDiv.innerHTML = ""
    const product = getProducts()
    if (!product) {
        let text = document.createElement('h3')
        text.innerText = "There is nothing added to the cart"

        cartDiv.append(text)
        return
    }
    let cartItems = Object.values(product)


    let cardDiv = document.createElement('div')
    cardDiv.id = "cardDiv"

    let produktdiv = document.createElement('div')
    produktdiv.classList.add = "produktdiv"

    let checkoutPrice

    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];

        let produktTitle = document.createElement('h3')
        let produktAmount = document.createElement('p')
        let produktPrice = document.createElement('p')
        let removebtn = document.createElement('button')
        let br = document.createElement("br")

        produktTitle.style.borderBottom = "1px solid black"
        produktTitle.innerText = item.price_data.product_data.name
        produktAmount.innerText = "Amount: x" + item.quantity
        produktPrice.style.borderBottom = "1px solid black"
        produktPrice.innerText = "price: " + item.price_data.unit_amount / 100 + " kr"
        removebtn.id = "removebtn"
        removebtn.innerText = "Remove"
        removebtn.addEventListener('click', () => {

            cartItems.splice.item
            console.log(cartItems)
        })

        checkoutPrice = item.quantity * item.price_data.unit_amount / 100

        produktdiv.append(produktTitle, produktAmount, produktPrice, removebtn, br)

    }


    let priceTotal = document.createElement("div")
    let checkoutBtn = document.createElement("button")

    checkoutBtn.id = "checkoutBtn"

    priceTotal.innerText = "Price Total: " + checkoutPrice
    checkoutBtn.innerText = "Checkout"
    checkoutBtn.addEventListener('click', () => checkout())

    cardDiv.append(produktdiv, priceTotal, checkoutBtn)
    cartDiv.appendChild(cardDiv)

}