const fs = require('fs');
const secretKey = "sk_test_51Jc4KaFYrsT4JzuLSlN2TI0R3GT2Z9m1r7wSyqHmaYKyM8sikFVBs9BDUQPlTeUTbn4IY6hOG7ts8lkb3gP4mbMu00cWKPINRj"


const express = require('express');
const stripe = require('stripe')(secretKey)
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

let stripeCustomerID = {};

let wholeSession = {};

let theCookie

const app = express()
app.use("/api", express.json())

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

})

app.post("/api/session/verify/:id", async (req, res) => {
    //sparar sessions ID som kommer från client till server
    const sessionId = req.params.id

    const session = await stripe.checkout.sessions.retrieve(sessionId)


    //Kollar ifall kund gör köpet eller ej
    res.status(200).json({ id: session.id })
    res.json({ sessionId })
})


app.use(express.static("public"))



//login

app.use(cookieSession({
    secret: '1234',
    maxAge: 1000 * 60,
    sameSite: 'strict',
    httpOnly: true,
    secure: false
}))

app.post('/api/login', async (req, res) => {

    let rawData = fs.readFileSync("./users.json")
    let users = JSON.parse(rawData)

    const user = users.find(user => user.name === req.body.name)

    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).json('Wrong password or username')
    }

    if (theCookie != null  /* req.session.id */) {
        return res.json('Already logged in')
    }

    req.session.id = uuid.v4()
    req.session.username = user.name
    req.session.loginDate = new Date()
    res.json('successful login')

    theCookie = req.session
})

app.post('/v1/customers', async (req, res) => {
    const customer = await stripe.customers.create({
        description: '',
    });
    stripeCustomerID = customer.id
    res.json(stripeCustomerID)
    console.log(customer)
})

app.get('/api/users', (req, res) => {

    let data = fs.readFileSync("./users.json")
    let userList = JSON.parse(data)
    userNames = userList.map(name => {
        return name.name
    })
    res.json(userNames)

    //ska skicka tillbaka användarna från user.json
})


app.post('/api/users', async (req, res) => {

    //hämta datan från users.json, spara i variablen users för att använda i följande if sats

    let rawData = fs.readFileSync("./users.json")
    let users = JSON.parse(rawData)

    //kollar om användare finns
    if (users.find(user => user.name === req.body.name)) {
        //ska stämma av mot users.json genom en local users variabel
        return res.status(409).json('Username already in use')
    } else {
        //ska pusha in ny användare i users variabel och sedan skicka users till users.json 


        //kalla på create stripe customer här
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({ name: req.body.name, password: hashedPassword, ePost: req.body.ePost, customerID: stripeCustomerID, })
        fs.writeFileSync("users.json", JSON.stringify(users))
        res.json(users)
        console.log(users)
        //users skickas till users.json
        //res.status(201).send(hashedPassword)
    }

})


app.get('/api/usercheck/', async (req, res) => {
    console.log("kör userCheck")
    console.log(req.session.id)
    console.log(req.session + "usercheck Id")


    if (theCookie != null  /* req.session.id */) {
        return res.json(true)
    } else {
        return res.json(false)
    }

    /* if (!req.session.id || req.session.id == null || req.session.id == undefined) {
        console.log("142")
        res.json(false)
        return
    } else {
        console.log("session hamna i else", req.session.id)

        return res.json(true)
    } */


})

app.post('/api/recet', (req, res) => {

    let today = new Date()
    let date = today.getFullYear() + " " + (today.getMonth() + 1) + "-" + today.getDate()

    console.log(req.session.username)

    let order = {
        customerID: "",
        orderId: wholeSession.id,
        amountTotal: wholeSession.amount_total,
        stuff: date,
        products: req.body.products,
        orderId: wholeSession.payment_intent,
        userID: req.session.username
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

app.get('/api/getrecet', (req, res) => {
    let raw = fs.readFileSync("kvitton.json")
    let kvitton = JSON.parse(raw)


    let kvittoList = []

    let kvitto = kvitton.map((kvitto) => {
        console.log(kvitto.userID == req.session.username)
        if (kvitto.userID == req.session.username) {
            kvittoList.push(kvitto)
        }
    })

    res.json(kvittoList)

})

app.delete('/api/delete', async (req, res) => {

    theCookie = null

    res.json(true)

})

app.listen(3000, () => {
    console.log("server is running")
})
