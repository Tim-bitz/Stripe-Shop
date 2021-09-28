//get a list of all users

users = []

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
    const response = await fetch('/api/users', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            name: "per",
            password: "persson"
        })
    })

    let result = await response.json()
    
    console.log(result)

    //users.push(result)
}