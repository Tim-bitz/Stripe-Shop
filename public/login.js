//get a list of all users

users = []

document.getElementById('SignUp').addEventListener('click', newUsers)

document.getElementById('loginBtn').addEventListener('click', login)

async function getNewCustomerValues() {
    let userName = document.getElementById('username')
    let passWord = document.getElementById('password')
    let ePost = document.getElementById('epost')
    let adress = document.getElementById('adress')

    const userInfo = [userName.value, passWord.value, ePost.value, adress.value]
    console.log(userInfo)
    /* 
        userName.value = ""
        passWord.value = ""
        ePost.value = ""
        adress.value = "" */

}


async function fetchUsers() {
    const response = await fetch('/api/users', {
        method: "GET",
        headers: { "content-type": "application/json" }
    })

    let result = await response.json()

    console.log(result)

    //users.push(result)
}

fetchUsers()

async function stripeCustomerID() {
    const response = await fetch('/v1/customers', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: 'cooltext'
    })

    let result = await response.json()

    console.log(result)
}

async function newUsers() {
    let customerid = await stripeCustomerID()

    let userName = document.getElementById('username').value
    let passWord = document.getElementById('password').value
    let ePost = document.getElementById('epost').value
    let adress = document.getElementById('adress').value



    //const userInfo = [userName.value, passWord.value, ePost.value, adress.value]
    const response = await fetch('/api/users/', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: userName,
            password: passWord,
            ePost: ePost,
            adress: adress,
            customerID: customerid,
        })
    })

    let result = await response.json()

    console.log(result)

    //users.push(result)
}

async function login() {

    let name = document.getElementById('inputUsername').value
    let password = document.getElementById('inputPassword').value

    const response = await fetch('/api/login', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })

    let result = await response.json()

    console.log(result)
    return result
}

document.getElementById('logoutBtn').addEventListener('click', logout)

async function logout() {

    const response = await fetch('/api/delete', {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    })

    console.log('hallihallå')
    alert('Du är nu utloggad')

}