import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm } from 'formik'

function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required()
    })

    const handleSubmit = (values) => {
        // async (e) =>
        // e.preventDefault()

        console.log("🚀 ~ handleSubmit ~ values:", values)
        // const results = { name, email }

        // try {
        //     const formData = await validationSchema.validate(results)
        //     dispatch(setFormData(formData))
        //     navigate("/results")
        // } catch (error) {
        //     console.log("Validation failed:", error);
        // }

    }

    return (
        <div>
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "", email: "" }}
                onSubmit={handleSubmit}>
                <FormikForm>
                    <label>Name
                        <Field
                            name="name"
                            type="text"
                        />
                    </label>
                    <label>Email
                        <Field
                            name="email"
                            type="text"
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </FormikForm>
            </Formik>
        </div >
    )
}

export default Form