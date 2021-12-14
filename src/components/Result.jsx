import React, { useState } from 'react';

export default function Result() {

    const [error, setError] = useState(false);

    return (
        <div className='w-full rounded-lg bg-gray-300 text-center py-5 px-7 mb-10'>
            <h1 className='underline text-white font-bold text-2xl'>Result</h1>
            <div className='w-full h-20 bg-gray-400 my-4 rounded-md'></div>
            <TestField error={error} setError={setError} />
            <AnswerField error={error} />
        </div>
    )
}

const TestField = ({ error, setError }) => {

    const [search, setSearch] = useState(0);

    function handleChange(e) {
        setError(isNaN(e.target.value));
        setSearch(e.target.value);
    }

    return (
        <div className={`w-52 h-field my-4 grid grid-rows-1 grid-cols-2 m-auto bg-blue border-blue border-2 rounded-md ${error && 'border-red bg-red'}`}>
            <h3 className='font-semibold text-lg'>Test</h3>
            <input
                type="text"
                className='rounded-r-md text-white text-center bg-gray-200'
                value={search}
                onChange={handleChange}
            />
        </div>
    )
}
const AnswerField = ({ error }) => {

    const [answer, setAnswer] = useState(0);

    return (
        <div className={`w-52 h-field my-4 grid grid-rows-1 grid-cols-2 m-auto bg-blue border-blue border-2 rounded-md ${error && 'border-red bg-red'}`}>
            <h3 className='font-semibold text-lg'>Answer</h3>
            <p
                className='rounded-r-md text-white text-center bg-gray-400 leading-field'
            >{answer}</p>
        </div>
    )
}