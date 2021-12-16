import React from 'react';
import ReactDOM from 'react-dom';

export default function ErrorMessage({ message, setError }) {

    return ReactDOM.createPortal(
        <div className='fixed top-0 left-0 w-screen h-screen bg-gray-400 bg-opacity-50 flex justify-center items-center font-poppins'>
            <div className='bg-white px-10 py-10 rounded-lg text-center m-5'>
                <h1 className='text-red font-bold text-5xl'>Error!</h1>
                <p className='font-bold text-gray-100 text-xl my-5'>{message}</p>
                <button
                    className='bg-blue px-10 py-2 text-white font-bold rounded-md'
                    onClick={() => setError(false)}
                >OK</button>
            </div>
        </div>,
        document.querySelector('body')
    )
}