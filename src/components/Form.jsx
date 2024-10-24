import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'

function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required()
    })

    const handleSubmit = (values) => {
        try {
            dispatch(setFormData(values))
            navigate("/results")
        } catch (error) {
            console.log("Validation failed:", error);
        }

    }

    const renderError = (message) => <p>{message}</p>

    return (
        <div>
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "", email: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormikForm>
                    <label>Name
                        <Field
                            name="name"
                            type="text"
                        />
                        <ErrorMessage name="name" render={renderError} />
                    </label>
                    <label>Email
                        <Field
                            name="email"
                            type="text"
                        />
                        <ErrorMessage name="email" render={renderError} />
                    </label>
                    <button type='submit'>Submit</button>
                </FormikForm>
            </Formik>
        </div >
    )
}

export default Form