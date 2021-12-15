import React from 'react';
import { useData, useDispatch } from './../DataContex';

export default function Result() {
    const data = useData();
    const dispatch = useDispatch();

    function handleChange(e) {
        const input = e.target.value;
        if (isNaN(input)) return;
        dispatch('SET_TEST', input);
    }

    return (
        <div className='w-full rounded-lg bg-gray-300 text-center py-5 px-7 mb-10'>
            <h1 className='underline text-white font-bold text-2xl'>Result</h1>
            <div className='w-full h-20 bg-gray-400 my-4 rounded-md flex justify-center items-center'>
                <h2
                    className='text-white font-bold text-xl font-mono'
                    dangerouslySetInnerHTML={{ __html: data.str }}
                ></h2>
            </div>
            <ResultField >
                <h3 className='font-semibold text-lg'>Test</h3>
                <input
                    type="text"
                    className='rounded-r-md text-white text-center bg-gray-200'
                    value={data.test}
                    onChange={handleChange}
                />
            </ResultField>
            <ResultField>
                <h3 className='font-semibold text-lg'>Answer</h3>
                <p
                    className='rounded-r-md text-white text-center bg-gray-400 leading-field'
                >{data.answer}</p>
            </ResultField>
        </div>
    )
}

const ResultField = ({ children }) => (
    <div className='w-52 h-field my-4 grid grid-rows-1 grid-cols-2 m-auto bg-blue border-blue border-2 rounded-md'>
        {children}
    </div>
)