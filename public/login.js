//get a list of all users

users = []
document.getElementById('SignUp').addEventListener('click', newUsers)

document.getElementById('loginBtn').addEventListener('click',  login)

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
        headers: {"content-type": "application/json"}
    })

    let result = await response.json()
    
    console.log(result)

    //users.push(result)
}

fetchUsers()

async function newUsers() {

    let userName = document.getElementById('username').value
    let passWord = document.getElementById('password').value
    let ePost = document.getElementById('epost').value
    let adress = document.getElementById('adress').value



   //const userInfo = [userName.value, passWord.value, ePost.value, adress.value]

    const response = await fetch('/api/users/', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: userName,
            password: passWord,
            ePost: ePost,
            adress: adress
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
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: name,
            password: password
        })
    })

    let result = await response.json()
    
    console.log(result)
}