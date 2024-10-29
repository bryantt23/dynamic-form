import React, { Children, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { resetStore, setFormData } from '../features/form/formSlice'
import * as Yup from 'yup'
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik'
import './Form.css'
import { RecursiveContainer } from './RecursiveContainer'
import { RenderError } from './RenderError'


const occupations = ["Developer", "Manager", "Radio", "Writer", "RadioWriter"]
const languages = ["", "Ruby", "JavaScript", "C#"]
const tvGenres = ["Sitcom", "Reality", "Sports"]

const section2ManagerValidationSchema = Yup.object({
    subordinates: Yup.number().required().min(1).max(7)
})

const section2DeveloperValidationSchema = Yup.object({
    language: Yup.string().required()
})

const section2RadioValidationSchema = Yup.object({
    radioSelection: Yup.string().required()
})

const section2TextValidationSchema = Yup.object({
    text: Yup.string().required().min(1)
})

const section2RadioWriterValidationSchema = Yup.object({
    radioWriterRadio: Yup.string().required(),
    radioWriterText: Yup.string().required().min(1)
})

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
            name: 'radioSelection',
            title: 'Radio selection',
            array: tvGenres,
            type: 'radio'
        },
        "Writer": {
            schema: section2TextValidationSchema,
            name: 'writerText',
            title: 'Text',
            placeholder: "Enter your text",
            type: 'text'
        },
        "RadioWriter": {
            schema: section2RadioWriterValidationSchema,
            name: ['radioWriterRadio', 'radioWriterText'],
            title: 'Radio writer',
            placeholder: "Enter your data",
            type: 'array',
            children: [
                {
                    schema: section2RadioValidationSchema,
                    name: 'radioWriterRadio',
                    title: 'Radio selection',
                    array: tvGenres,
                    type: 'radio'
                },
                {
                    schema: section2TextValidationSchema,
                    name: 'radioWriterText',
                    title: 'Text',
                    placeholder: "Enter your text",
                    type: 'text'
                }
            ]
        }
    };

    const handleSubmit = (values) => {
        try {
            dispatch(resetStore())
            // Base fields for all sections
            const baseFields = {
                name: values.name,
                email: values.email,
                age: values.age,
                occupation: values.occupation,
            };

            // Get the schema and fields based on selected occupation from strategyMap
            const occupationSchema = strategyMap[values.occupation]

            // Extract only the relevant fields for the selected occupation
            let specificFields = {}
            if (occupationSchema) {
                if (Array.isArray(occupationSchema.name)) {
                    // For occupations like RadioWriter with multiple fields
                    specificFields = occupationSchema.name.reduce((acc, fieldName) => {
                        if (values[fieldName] !== undefined) {
                            acc[fieldName] = values[fieldName]
                        }
                        return acc
                    }, {})
                }
                else {
                    // For occupations with a single field
                    specificFields = { [occupationSchema.name]: values[occupationSchema.name] }
                }
            }

            const finalValues = { ...baseFields, ...specificFields }

            dispatch(setFormData(finalValues))
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
                initialValues={{ name: "bbb", email: "b@g.com", age: '42', occupation: 'RadioWriter' }}
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
                                    <ErrorMessage name="name" render={RenderError} />
                                </label>
                                <label>Email
                                    <Field
                                        name="email"
                                        type="text"
                                    />
                                    <ErrorMessage name="email" render={RenderError} />
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
                                    <ErrorMessage name="age" render={RenderError} />
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
                                    <ErrorMessage name="occupation" render={RenderError} />
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