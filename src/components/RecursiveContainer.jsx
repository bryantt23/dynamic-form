import { ErrorMessage, Field } from "formik"
import { RenderError } from "./RenderError"

export const RecursiveContainer = ({ config }) => {
    console.log("🚀 ~ RecursiveContainer ~ config:", config)
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
                        <ErrorMessage name={individualConfig.name} render={RenderError} />
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
                        <ErrorMessage name={individualConfig.name} render={RenderError} />
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
                        <ErrorMessage name={individualConfig.name} render={RenderError} />
                    </div>
                )
            case 'text':
                return (
                    <label>{individualConfig.title}
                        <Field
                            name={individualConfig.name}
                            type="text"
                            placeholder={individualConfig.placeholder}
                        />
                        <ErrorMessage name={individualConfig.name} render={RenderError} />
                    </label>
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