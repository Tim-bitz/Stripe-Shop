function getProducts(){
    const getCartList = localStorage.getItem('cart')
    
    let cartlist = JSON.parse(getCartList)
    console.log(cartlist)
    return cartlist
}

function ProductCard(){
     const product = getProducts()
   /*  let produkt = cart.map((produkt)=>{
        produkt.
    }) */
    let cartDiv = document.getElementById('cartcontainer')

    let produktdiv = document.createElement('div')
    produktdiv.id ="produktdiv"

    let produktTitle = document.createElement('h3')
    produktTitle.innerText = product.name + " Amount:" + product.amount + "st " + "price: " + product.price

    let produktAmount = document.createElement('p')
    produktAmount.innerText = "nope"

    document.getElementById("totalAmount").innerText = "total amount: " + product.amount* product.price + "sek"

 /*    let produktPrice = document.createElement('p')
    produktPrice.innerText ="produkt price" */


    produktdiv.appendChild(produktTitle, produktAmount)
    cartDiv.appendChild(produktdiv)

}

ProductCard()