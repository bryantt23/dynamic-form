import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'

function Form() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required()
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const results = { name, email }

        try {
            const formData = await validationSchema.validate(results)
            dispatch(setFormData(formData))
            navigate("/results")
        } catch (error) {
            console.log("Validation failed:", error);
        }

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
                    <input type="text"
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