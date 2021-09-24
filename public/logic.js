const publicKey = "pk_test_51Jc4KaFYrsT4JzuLnxfWccQV75y84ogkUy5ptJoxmDaja5LIaydegbHC3I8kszcwiuHrWMa4XOsI6DwEFzsBlcGF00RMkCDsNF"
//const sessionId = localStorage.getItem(session)



let cart = []

let testCart = [
    {'boxedIce':{
    description:'boxed in liquid form',
    price_data:{
        currency:'sek',
        product_data:{
            name: 'boxedIce'
        },
        unit_amount:5000
    }
}}
]

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

const checkout = async () =>{
    try {
        
        if (Object.keys(testCart).length == 0) {
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
        stripe.redirectToCheckout({ sessionId: id }); 
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

let list = "detta är en cool lista av våra is produkter"

async function verify() {
    try{
        
        const sessionId = localStorage.getItem("session")
        
        if(!sessionId){
            console.log('No session ID to verify')
            //session ID finns inte i Localstorage
        } //Delete
        //console.log(sessionId)

        const response = await fetch('/api/session/verify/' + sessionId,  {
            method: "POST",
            headers:{'Contenet-Type': 'application/json'},
            body: JSON.stringify({list: list})       
        })
        /*     body:
            JSON.stringify({
                sessionId: sessionId 
            }) */
    
        const result = await response.json()
        
        console.log(result)
        const { paid } = await response.json()

        return paid;

    }catch (err) {
        console.error(err)
        return false
    }
}


let quantity = 0
function addProduct(){   
    quantity++
    cart = {'Liquid Ice':{
        name:"Liquid Ice",
        description:'boxed in liquid form',
        price_data:{
            currency:'sek',
            product_data:{
                name: 'boxedIce'
            },
            unit_amount:quantity
        }
    }} 
    let getCart = localStorage.getItem('cart')

    let setCart = localStorage.setItem("cart",JSON.stringify(cart))
    
}


async function main(){
    //document.getElementById('addbtn').addEventListener('click', addProduct)
    document.getElementById('checkOutBtn').addEventListener('click', ()=> checkout())
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
