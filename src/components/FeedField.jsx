import React, { useState, useEffect } from 'react';
import { useData, useDispatch } from '../DataContex';

export default function DataField({ index, feed }) {
    const data = useData();
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const [test, setTest] = useState(data.feed[index][0]);
    const [observ, setObserv] = useState(data.feed[index][1]);

    useEffect(() => {
        setTest(data.feed[index][0]);
        setObserv(data.feed[index][1]);
    }, [data, index]);

    function blurHandler(e) {
        setIsFocused(false);
        const testVal = validate(test);
        const observVal = validate(observ);

        if (testVal !== null && observVal !== null) {
            dispatch('EDIT', {
                index,
                val: [testVal, observVal]
            });
            setTest(testVal);
            setObserv(observVal);
            return;
        }

        if (e.target.name === 'test') setTest(0);
        else if (e.target.name === 'observ') setObserv(0);
    }

    function validate(input) {
        let val = null;
        switch (input) {
            case '-': val = -1; break;
            case '': val = 0; break;
            default: val = input;
        }
        return isNaN(val) ? null : parseInt(val);
    }

    return (
        <div
            className={`relative h-field w-full overflow-hidden my-4 bg-gray-100 rounded-2xl ring-4 grid grid-cols-3 grid-rows-1 ring-gray-400 ${(isFocused && index > 1) && 'mb-12 overflow-visible'}`}
            onFocus={() => setIsFocused(true)}
            onBlur={blurHandler}
        >
            <input
                name="test"
                type="text"
                value={test}
                onChange={e => setTest(e.target.value)}
                className='bg-transparent py-2 px-5 text-center font-bold text-xl text-white col-span-2'
            />
            <input
                name="observ"
                type="text"
                value={observ}
                onChange={e => setObserv(e.target.value)}
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