import React, { useState } from 'react';
import { useData, useDispatch } from './../DataContex';
import ErrorMessage from './ErrorMessage';

export default function FootPanel() {
    const data = useData();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    function calculate() {
        const feedSet = new Set(
            data.feed.map(
                arr => parseInt(`1${arr[0]}2${arr[1]}`)
            )
        )
        if ([...feedSet].length === data.feed.length) {
            setError(false);
            dispatch('EXECUTE');
        }
        else setError(true);
    }

    return (
        <div className='w-full flex justify-between items-center text-2xl gap-5'>
            {error &&
                <ErrorMessage
                    setError={setError}
                    message="Data passed has duplicate values"
                />
            }
            <button
                className='bg-blue rounded-md px-5 py-1 font-bold text-gray-100'
                onClick={calculate}
            >Calculate</button>
            <button
                className='bg-gray-200 ring-4 ring-blue rounded-md px-5 py-1 font-semibold text-white'
                onClick={() => dispatch('RESET')}
            >Reset</button>
        </div>
    )
}