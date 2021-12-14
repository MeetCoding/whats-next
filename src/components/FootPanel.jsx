import React from 'react';

export default function FootPanel() {
    return (
        <div className='w-full flex justify-between items-center text-2xl'>
            <button
                className='bg-blue rounded-md px-5 py-1 font-bold text-gray-100'
            >Calculate</button>
            <button
                className='bg-gray-200 ring-4 ring-blue rounded-md px-5 py-1 font-semibold text-white'
            >Reset</button>
        </div>
    )
}