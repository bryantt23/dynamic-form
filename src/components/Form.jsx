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
    const [validInitialSections, setValidInitialSections] = useState(false)
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true)
    const [selectedOccupation, setSelectedOccupation] = useState("")

    const section1ValidationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        age: Yup.number().required().min(1).max(130),
        occupation: Yup.string().required()
    })

    const section2ManagerValidationSchema = Yup.object({
        subordinates: Yup.number().required().min(1).max(7)
    })

    const section2DeveloperValidationSchema = Yup.object({
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

    const validateForm = async (values) => {
        if (!validInitialSections) {
            try {
                await section1ValidationSchema.validate(values)
                setSubmitButtonDisabled(true)
                setValidInitialSections(true)
            } catch (error) {
                console.error(error)
                setValidInitialSections(false)
            }
        }
        else {
            try {
                await getValidationSchema().validate(values)
                setSubmitButtonDisabled(false)
            } catch (error) {
                console.error(error)
                setSubmitButtonDisabled(true)
            }
        }

        setSelectedOccupation(values.occupation)
    }

    const getValidationSchema = () => {
        if (!validInitialSections) {
            return section1ValidationSchema
        }
        else {
            return Yup.object().shape({
                ...section1ValidationSchema.fields,
                ...(selectedOccupation === 'Manager' ? section2ManagerValidationSchema.fields : section2DeveloperValidationSchema.fields)
            })
        }
    }

    return (
        <div>
            {validInitialSections ? 'y' : 'n'}
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "bbb", email: "b@g.com", age: '', occupation: '' }}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
                isInitialValid={false}
            >
                {({ values }) => {
                    validateForm(values)
                    const selectOptions = ["", ...occupations]
                    return (
                        <FormikForm
                        >
                            <div className={'section'}>
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
                            <div className={'section'}>
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
                            {validInitialSections && (
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