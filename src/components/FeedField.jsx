import React, { useState } from 'react';
import { useData, useDispatch } from '../DataContex';

export default function DataField({ index, feed }) {
    const data = useData();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(e) {
        const input = e.target.value;
        if (isNaN(input)) return;
        let val = {};
        switch (e.target.name) {
            case 'test':
                val = [input, data.feed[index][1]];
                break;
            case 'observation':
                val = [data.feed[index][0], input];
                break;
            default: return;
        }
        dispatch('EDIT', { index, val })
    }

    return (
        <div
            className={`relative h-field w-full overflow-hidden my-4 bg-gray-100 rounded-2xl ring-4 grid grid-cols-3 grid-rows-1 ring-gray-400 ${(isFocused && index > 1) && 'mb-12 overflow-visible'}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <input
                name="test"
                type="text"
                value={data.feed[index][0]}
                onChange={handleChange}
                className='bg-transparent py-2 px-5 text-center font-bold text-xl text-white col-span-2'
            />
            <input
                name="observation"
                type="text"
                value={data.feed[index][1]}
                onChange={handleChange}
                className='bg-transparent py-2 px-5 text-center font-bold text-xl text-white border-l-4 border-gray-400'
            />
            <button
                className={`absolute bg-red px-5 py-0 right-1 top-11 rounded-md text-white font-bold ${index < 2 && 'hidden'}`}
                tabIndex={-1}
                onClick={() => dispatch('REMOVE', index)}
            >-</button>
        </div >
    )
}