import React from 'react'
import { useSelector } from 'react-redux'

function Results() {
    const results = useSelector((state) => state.form)

    return (
        <div>
            <h1>Results</h1>
            <ul>
                {
                    Object.entries(results).map((entry, index) => <li key={index}>{entry[0]}: {entry[1] || "N/A"}</li>)
                }
            </ul>
        </div>
    )
}

export default Results