import React from 'react';
import FeedField from './FeedField';
import { useData, useDispatch } from '../DataContex';

export default function DataTable() {

    const dispatch = useDispatch();
    const data = useData();

    const addField = () => dispatch('ADD')

    return (
        <div className='relative w-5/6 max-w-panel h-panel'>
            <div className='absolute top-title-elevation w-full flex justify-between items-center underline text-white'>
                <h3 className='mx-7 my-2 text-lg font-semibold'>Test</h3>
                <h3 className='mx-7 my-2 text-lg font-semibold'>Observation</h3>
            </div>
            <div className='bg-gray-300 w-full h-full rounded-lg px-6 py-3 overflow-y-scroll'>
                {data?.feed.map((feed, i) => <FeedField feed={feed} key={i} index={i} />)}
                <div className='flex justify-end'>
                    <button
                        className='px-5 py-0 bg-blue rounded-xl text-white text-xl font-bold'
                        onClick={addField}
                    >+</button>
                </div>
            </div>
        </div>
    )
}