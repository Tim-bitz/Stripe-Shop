const secretKey = "sk_test_51Jc4KaFYrsT4JzuLSlN2TI0R3GT2Z9m1r7wSyqHmaYKyM8sikFVBs9BDUQPlTeUTbn4IY6hOG7ts8lkb3gP4mbMu00cWKPINRj"

const { json } = require('express')
const express = require('express')
const stripe = require('stripe')(secretKey)

const app = express()

jsonDB = {
    //"payment_id": sessionObject
}

app.get('api/admin/purchases', async (req,res)=>{
    res.status[200].json(jsonDB)
})

const productsDB = {
    'Liquid Ice': {
        description: 'Ice in liquid form',
        price_data: {
            currency: 'sek',
            product_data: {
                name: 'Liquid Ice',
            },
            unit_amount: 500
        },

    },
    'boxIce': {
        description: 'Boxed Ice in liquid form',
        price_data: {
            currency: 'sek',
            product_data: {
                name: 'Liquid Ice',
            },
            unit_amount: 50000
        },
    }
}


//global variabel senaste köpet

app.get("/api", (req, res) => {
    res.status(200).send("Välkommen")
})

app.post("/api/session/new", async (req, res) => {
  
    

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                description: "En kul produkt",
                price_data: {
                    currency: "sek",
                    product_data: {
                        name: "Water"
                    },
                    unit_amount: 500,
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: "http://localhost:3000/checkout_success.html",
        cancel_url: "http://localhost:3000/checkout_canceled.html",
    })
    console.log(session)
    res.status(200).json({ id: session.id })

    //if success från stripe
        //skicka köpdata till kvitto.json
        //rensa global variabel ""

})

app.post("/api/session/verify/:id", async (req, res) => {
    //sparar sessions ID som kommer från client till server
    const sessionId = req.params.id

    const session = await stripe.checkout.sessions.retrieve(sessionId)


    //Kollar ifall kund gör köpet eller ej
    if(session.payment.status == "paid") {
        //spara info i json
        key = session.payment_intent
        if(!jsonDB[key]) {
            jsonDB[key] = session
        }
        
        res.status(200).json({ verified: true})
    } else {
        res.status(200).json({ verified: false})
    }
    
    res.status(200).json({ id:session.id }) 
    res.json({sessionId})
    console.log(sessionId)
})


app.use(express.static("public"))

app.listen(3000, () => {
    console.log("server is running")
})

/* if(jsonDB[key]){
    jsonDB[key] = sesson;
}
res.status(200).json()
else{

} */