import React, { useEffect, useState } from 'react'

function Results() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const results = localStorage.getItem("results")
        const { name, email } = JSON.parse(results)
        setName(name)
        setEmail(email)
    }, [])

    return (
        <div>
            <h1>Results</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
    )
}

export default Results