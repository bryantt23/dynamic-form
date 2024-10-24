import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Results() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const results = useSelector((state) => state.form)

    useEffect(() => {
        const { name, email } = results
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