import React from 'react';
import FeedTable from './components/FeedTable';
import Result from './components/Result';
import FootPanel from './components/FootPanel';

export default function App() {
    return (
        <div className='font-poppins w-screen h-screen p-5 pt-12 m-0 bg-gray-100 flex justify-center items-center flex-col md:flex-row gap-10'>
            <FeedTable />
            <div className='w-5/6 max-w-panel h-panel flex flex-col justify-between items-center'>
                <Result />
                <FootPanel />
            </div>
        </div>
    )
}
