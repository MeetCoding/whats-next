import React, { useReducer, useEffect } from 'react';
import DataField from './DataField';

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const newState = [...state];
            const newField = <DataField key={newState.length} index={newState.length} />;
            newState.push(newField);
            return newState;
        }
        case 'REMOVE': {
            let newState = [...state];
            console.log(newState);
            newState = newState.filter((_field, i) => i !== action.index);
            console.log(newState);
            return newState;
        }
        default: throw new Error("Unexpected value passed to dispatch at 8:src/components/DataTable.jsx")
    }
}

export default function DataTable() {

    const [fields, dispatch] = useReducer(reducer, []);

    const addField = () => dispatch({ type: 'ADD' })
    const removeField = i => dispatch({ type: 'REMOVE', index: i })

    useEffect(() => {
        addField();
        addField();
    }, [])

    return (
        <div className='w-5/6 max-w-panel h-panel flex flex-col'>
            <div className='flex justify-between items-center underline text-white'>
                <h3 className='mx-7 my-2 text-lg font-semibold'>Test</h3>
                <h3 className='mx-7 my-2 text-lg font-semibold'>Observation</h3>
            </div>
            <div className='relative bg-gray-300 rounded-lg p-6 flex flex-col flex-grow justify-start items-stretch gap-5 overflow-y-scroll overflow-visible'>
                {fields.map(field => React.cloneElement(
                    field,
                    { addField, removeField },
                    null
                ))}
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