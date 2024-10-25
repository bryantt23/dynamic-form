import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import './Form.css'

function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validSectionCount, setValidSectionCount] = useState(0)

    const section1ValidationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required()
    })

    const section2ValidationSchema = Yup.object({
        age: Yup.number().required().min(1).max(130),
        occupation: Yup.string().required()
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

    const handleNext = (e) => {
        e.preventDefault()
        setValidSectionCount(1)
    }

    return (
        <div>
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "", email: "", age: '', occupation: '' }}
                onSubmit={handleSubmit}
                validationSchema={validSectionCount === 0 ? section1ValidationSchema : section2ValidationSchema}
                isInitialValid={false}
            >
                {({ dirty, isValid }) => {
                    return (
                        <FormikForm
                        >
                            <div className={`section ${validSectionCount > 1 && 'disabled'}`}>
                                <p>Section 1</p>
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
                            </div>
                            <div className={`section ${validSectionCount < 1 && 'disabled'}`}>
                                <p>Section 2</p>
                                <label>Age
                                    <Field
                                        name="age"
                                        type="number"
                                        placeholder="Enter your age"
                                    />
                                    <ErrorMessage name="age" render={renderError} />
                                </label>
                                <label>Occupation
                                    <Field
                                        name="occupation"
                                        type="text"
                                    />
                                    <ErrorMessage name="occupation" render={renderError} />
                                </label>
                            </div>
                            <button
                                disabled={!(isValid && dirty) || validSectionCount > 0}
                                onClick={e => {
                                    handleNext(e);
                                }}>
                                Next</button>
                            <button
                                disabled={(validSectionCount < 1) || !isValid}
                                type='submit'
                            >Submit</button>
                        </FormikForm>

                    )
                }}
            </Formik>
        </div>
    )
}

export default Form