const publicKey = "pk_test_51Jc4KaFYrsT4JzuLnxfWccQV75y84ogkUy5ptJoxmDaja5LIaydegbHC3I8kszcwiuHrWMa4XOsI6DwEFzsBlcGF00RMkCDsNF"

let stripe = Stripe(publicKey)
document.getElementById("testBtn").addEventListener("click", async () => {
    console.log("banan")
    const response = await fetch("/api/session/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
    const { id } = await response.json()
    console.log(stripe)
    stripe.redirectToCheckout({ sessionId: id });
})

