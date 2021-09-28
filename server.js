const fs = require('fs');
const secretKey = "sk_test_51Jc4KaFYrsT4JzuLSlN2TI0R3GT2Z9m1r7wSyqHmaYKyM8sikFVBs9BDUQPlTeUTbn4IY6hOG7ts8lkb3gP4mbMu00cWKPINRj"


const express = require('express');
const stripe = require('stripe')(secretKey)
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt')
const uuid = require('uuid')


let wholeSession = {};


const app = express()
app.use("/api", express.json())

/* app.get('api/admin/purchases', async (req, res) => {
    res.status[200].json(jsonDB)
}) */

/* const productsDB = {
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
} */


//global variabel senaste köpet

app.get("/api", (req, res) => {
    res.status(200).send("Välkommen")
})

app.post("/api/session/new/", async (req, res) => {

    //let item = JSON.stringify
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.line_items,
        success_url: "http://localhost:3000/checkout_success.html",
        cancel_url: "http://localhost:3000/checkout_canceled.html",
    })
    wholeSession = session
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
    /* if (session.payment.status == "paid") {
        //spara info i json

        key = session.payment_intent
        if (!jsonDB[key]) {
            jsonDB[key] = session
        }

        res.status(200).json({ verified: true })
    } else {
        res.status(200).json({ verified: false })
    } */

    res.status(200).json({ id: session.id })
    res.json({ sessionId })
    console.log(sessionId)
})


app.use(express.static("public"))

app.listen(3000, () => {
    console.log("server is running")
})

app.post('/api/recet', (req, res) => {
    console.log(wholeSession, req.body.number)

    let order = {
        orderId: wholeSession.id,
        amountTotal: wholeSession.amount_total,
        stuff: "en cool text",
        quantity: req.body.number,
    }


    //    console.log('Post thing från success', session.id)

    try {
        let raw = fs.readFileSync("kvitton.json")
        let kvitton = JSON.parse(raw)
        kvitton.push(order)
        fs.writeFileSync("kvitton.json", JSON.stringify(kvitton))
        res.json("sparat")
        console.log("en order", order, req.body.number)
    } catch (err) {

    }

})

//login



app.use(cookieSession({
    secret: '1234',
    maxAge: 1000*10,
    sameSite: 'strict',
    httpOnly: true,
    secure: false
}))

app.get('/api/users', (req, res) => {
    //res.json(users)
    let  data = fs.readFileSync("./users.json")
    let userList = JSON.parse(data)
    userNames = userList.map(name => {
        return name.name
    })
    res.json(userNames)
    
    //ska skicka tillbaka användarna från user.json
})


app.post('/api/users', async (req, res) => {

    //hämta datan från users.json, spara i variablen users för att använda i följande if sats

    let  rawData = fs.readFileSync("./users.json")
    let users = JSON.parse(rawData)
    console.log(users)

    
    //kollar om användare finns
    if(users.find(user => user.name === req.body.name)) {
        //ska stämma av mot users.json genom en local users variabel
        return res.status(409).send('Username already in use')
    } else {
        //ska pusha in ny användare i users variabel och sedan skicka users till users.json 
        /*  const hashedPassword = await bcrypt.hash(req.body.password, 10) */
        
        users.push({ name: req.body.name/*  password: hashedPassword */})
        fs.writeFileSync("users.json", JSON.stringify(users))
        res.json(users)
        //users skickas till users.json
       // res.status(201).send(hashedPassword)
    }
     
})