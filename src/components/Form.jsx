import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import './Form.css'

const occupations = ["Developer", "Manager", "Radio"]
const languages = ["", "Ruby", "JavaScript", "C#"]
const tvGenres = ["Sitcom", "Reality", "Sports"]

const section2ManagerValidationSchema = Yup.object({
    subordinates: Yup.number().required().min(1).max(7)
})

const section2DeveloperValidationSchema = Yup.object({
    language: Yup.string().required()
})

const section2RadioValidationSchema = Yup.object({
    radio: Yup.string().required()
})

const renderError = (message) => <p>{message}</p>

const RecursiveContainer = ({ config }) => {
    const builder = (individualConfig) => {
        switch (individualConfig.type) {
            case 'dropdown':
                return (
                    <label>{individualConfig.title}
                        <Field
                            name={individualConfig.name}
                            as="select"
                        >
                            {
                                individualConfig.array.map((item, index) => (
                                    <option key={index}>
                                        {item}
                                    </option>))
                            }
                        </Field>
                        <ErrorMessage name={individualConfig.name} render={renderError} />
                    </label>
                )
            case 'number':
                return (
                    <label>{individualConfig.title}
                        <Field
                            name={individualConfig.name}
                            type="number"
                            placeholder={individualConfig.placeholder}
                        />
                        <ErrorMessage name={individualConfig.name} render={renderError} />
                    </label>
                )
            case 'radio':
                return (
                    <div
                        name={individualConfig.name}
                    >
                        <p>
                            {individualConfig.title}
                        </p>
                        {
                            individualConfig.array.map((item, index) => (
                                <label key={index}>
                                    <Field
                                        type="radio"
                                        value={item}
                                        name={individualConfig.name}
                                    />
                                    {item}
                                </label>
                            ))
                        }
                        <ErrorMessage name={individualConfig.name} render={renderError} />

                    </div>
                )
            case 'array':
                return (
                    <RecursiveContainer config={individualConfig.children || []} />
                )
            default:
                return <div>Unsupported field</div>
        }
    }

    return (
        <>
            {config.map(c => {
                return builder(c)
            })}
        </>
    )
}

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

    const strategyMap = {
        "Developer": {
            schema: section2DeveloperValidationSchema,
            name: 'language',
            array: languages,
            title: 'Languages',
            type: 'dropdown'
        },
        "Manager": {
            schema: section2ManagerValidationSchema,
            name: 'subordinates',
            title: 'Number of subordinates',
            placeholder: "Enter your subordinates",
            type: 'number'
        },
        "Radio": {
            schema: section2RadioValidationSchema,
            name: 'radio',
            title: 'Radio selection',
            array: tvGenres,
            type: 'radio'
        }
    }


    const handleSubmit = (values) => {
        try {
            dispatch(setFormData(values))
            navigate("/results")
        } catch (error) {
            console.log("Validation failed:", error);
        }
    }

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
            const fields = strategyMap[selectedOccupation].schema.fields
            return Yup.object().shape({
                ...section1ValidationSchema.fields,
                ...fields
            })
        }
    }


    return (
        <div>
            <h1>Form</h1>
            <Formik
                initialValues={{ name: "bbb", email: "b@g.com", age: '42', occupation: 'Radio' }}
                onSubmit={handleSubmit}
                validationSchema={getValidationSchema()}
                isInitialValid={false}
            >
                {({ values }) => {
                    validateForm(values)
                    const selectOptions = occupations
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
                                <label>Category
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
                                    <RecursiveContainer config={[strategyMap[selectedOccupation]]} />
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