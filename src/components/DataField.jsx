import React, { useState } from 'react';

export default function DataField({ index, addField, removeField }) {

    const [test, setTest] = useState();
    const [observation, setObservation] = useState();
    const [error, setError] = useState(false);

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
        <div className={`data-field h-field bg-gray-100 flex-shrink-0 rounded-2xl ring-4 grid grid-cols-3 grid-rows-1 ${error ? "ring-red" : "ring-gray-400"}`} >
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
        </div >
    )
}