const secretKey = "sk_test_51Jc4KaFYrsT4JzuLSlN2TI0R3GT2Z9m1r7wSyqHmaYKyM8sikFVBs9BDUQPlTeUTbn4IY6hOG7ts8lkb3gP4mbMu00cWKPINRj"

const express = require('express')
const stripe = require('stripe')(secretKey)

const app = express()

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
        cancel_url: "http://localhost:3000/index.html",
    })
    console.log(session)
    res.status(200).json({ id: session.id })

    //if success från stripe
        //skicka köpdata till kvitto.json
        //rensa global variabel ""

})

app.use(express.static("public"))

app.listen(3000, () => {
    console.log("server is running")
})