window.onload('load', ProductCard())

function ProductCard(){
    /* let produkt = cart.map((produkt)=>{
        produkt.
    }) */
    let cartDiv = document.getElementById('cart')

    let produktdiv = document.createElement('div')

    let produktTitle = document.createElement('h3')
    produktTitle.innerText = "Produkt titlen"

    let produktPrice = document.createElement('p')
    produktPrice.innerText =" produkt price"


    produktdiv.append(produktTitle,produktPrice)

    cartDiv.appendChild(produktdiv)


}