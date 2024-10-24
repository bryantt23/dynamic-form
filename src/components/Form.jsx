import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'

function Form() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const results = { name, email }
        dispatch(setFormData(results))
        navigate("/results")
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