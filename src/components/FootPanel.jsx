import React from 'react';
import { useDispatch } from './../DataContex';

export default function FootPanel() {
    const dispatch = useDispatch();

    return (
        <div className='w-full flex justify-between items-center text-2xl'>
            <button
                className='bg-blue rounded-md px-5 py-1 font-bold text-gray-100'
                onClick={() => dispatch('EXECUTE')}
            >Calculate</button>
            <button
                className='bg-gray-200 ring-4 ring-blue rounded-md px-5 py-1 font-semibold text-white'
                onClick={() => dispatch('RESET')}
            >Reset</button>
        </div>
    )
}