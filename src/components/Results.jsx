import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Results() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [occupation, setOccupation] = useState("")

    const results = useSelector((state) => state.form)

    useEffect(() => {
        const { name, email, occupation, age } = results
        setName(name)
        setEmail(email)
        setAge(age)
        setOccupation(occupation)
    }, [])

    return (
        <div>
            <h1>Results</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
            <p>Occupation: {occupation}</p>
        </div>
    )
}

export default Results