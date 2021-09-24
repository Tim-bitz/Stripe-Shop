
async function success() {
    const response = await fetch('/api/recet', {
        method: "POST",
        headers:{'Contenet-Type': 'application/json'},
    })
    
}

success()
