import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import './Form.css'

const occupations = ["Developer", "Manager"]

function Form() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [validSectionCount, setValidSectionCount] = useState(0)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [selectedOccupation, setSelectedOccupation] = useState("")

    const section1ValidationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required()
    })

    const section2ValidationSchema = Yup.object({
        age: Yup.number().required().min(1).max(130),
        occupation: Yup.string().required()
    })

    const section3ManagerValidationSchema = Yup.object({
        subordinates: Yup.number().required().min(1).max(7)
    })

    const section3DeveloperValidationSchema = Yup.object({
        language: Yup.string().required()
    })

    const languages = ["", "Ruby", "JavaScript", "C#"]

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
        if (validSectionCount < 2) {
            e.preventDefault()
            setValidSectionCount(prev => prev + 1)
            setNextButtonDisabled(true)
        }
    }

    const validateForm = async (values) => {
        if (validSectionCount === 0) {
            try {
                await section1ValidationSchema.validate(values)
                setNextButtonDisabled(false)
                setSubmitButtonDisabled(true)
            } catch (error) {
                console.error(error)
                setNextButtonDisabled(true)
            }
        }
        else if (validSectionCount === 1) {
            try {
                await section2ValidationSchema.validate(values)
                setNextButtonDisabled(false)
                setSubmitButtonDisabled(true)
            } catch (error) {
                console.error(error)
                setNextButtonDisabled(true)
            }
        }

        setSelectedOccupation(values.occupation)
    }

    const getValidationSchema = () => {
        if (validSectionCount === 0) {
            return section1ValidationSchema
        }
        else if (validSectionCount === 1) {
            return section2ValidationSchema
        }
        else {
            if (selectedOccupation === 'Manager') {
                return section3ManagerValidationSchema
            }
            else {
                return section3DeveloperValidationSchema
            }
        }
    }

    return (
        <div>
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "", email: "", age: '', occupation: '' }}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
                isInitialValid={false}
            >
                {({ dirty, isValid, values }) => {
                    validateForm(values)
                    const selectOptions = ["", ...occupations]
                    return (
                        <FormikForm
                        >
                            <div className={`section ${validSectionCount > 0 && 'disabled'}`}>
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
                                        as="select"
                                    >
                                        {
                                            selectOptions.map((occupation, index) => (
                                                <option key={index}>
                                                    {occupation}
                                                </option>))
                                        }
                                    </Field>
                                    <ErrorMessage name="occupation" render={renderError} />
                                </label>
                            </div>
                            {validSectionCount > 1 && (
                                <div className={"section"}>
                                    <p>Section 3</p>
                                    {selectedOccupation === 'Developer' ? (<label>Language
                                        <Field
                                            name="language"
                                            as="select"
                                        >
                                            {
                                                languages.map((language, index) => (
                                                    <option key={index}>
                                                        {language}
                                                    </option>))
                                            }
                                        </Field>
                                        <ErrorMessage name="language" render={renderError} />
                                    </label>) :
                                        (
                                            <label>Number of subordinates
                                                <Field
                                                    name="subordinates"
                                                    type="number"
                                                    placeholder="Enter your subordinates"
                                                />
                                                <ErrorMessage name="subordinates" render={renderError} />
                                            </label>
                                        )}

                                </div>

                            )}
                            <button
                                disabled={nextButtonDisabled}
                                onClick={e => {
                                    handleNext(e);
                                }}>
                                Next</button>
                            <button
                                disabled={submitButtonDisabled}
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