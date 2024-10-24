import React, { useState } from 'react'

function Form() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Name
                    <input type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </label>
                <label>Email
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form