import React, { useState } from 'react';

export default function DataField({ index, addField, removeField }) {

    const [test, setTest] = useState();
    const [observation, setObservation] = useState();
    const [error, setError] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(e) {
        const name = e.target.name;
        setError(isNaN(e.target.value));
        switch (name) {
            case "test":
                setTest(e.target.value);
                break;
            case "observation":
                setObservation(e.target.value);
                break;
            default: throw new Error("Handle change name not identified at 13:src/components/DataField.js");
        }
    }

    return (
        <div
            className={`relative h-field w-full overflow-hidden my-4 bg-gray-100 rounded-2xl ring-4 grid grid-cols-3 grid-rows-1 ${error ? "ring-red" : "ring-gray-400"} ${isFocused && 'mb-12 overflow-visible'}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <input
                name="test"
                type="text"
                value={test}
                onChange={handleChange}
                className='col-span-2 bg-transparent py-2 px-5 text-center font-bold text-xl text-white'
            />
            <input
                name="observation"
                type="text"
                value={observation}
                onChange={handleChange}
                className='bg-transparent py-2 px-5 text-center font-bold text-xl text-white border-l-4 border-gray-400'
            />
            <button
                className='absolute bg-red px-5 py-0 right-1 top-11 rounded-md text-white font-bold'
                tabIndex={-1}
            >-</button>
        </div >
    )
}