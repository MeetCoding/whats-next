import React, {
    createContext,
    useContext,
    useReducer
} from 'react';
import Execute from './algo/MathFunc';


const DataContext = createContext();

export const useData = () => useContext(DataContext)[0];

export function useDispatch() {
    const dispatch = useContext(DataContext)[1];
    return (type, payload) => dispatch({ type, payload });
}

const initValue = {
    f: x => 2 * x,
    str: "f(x) => 2x",
    test: 1,
    answer: 2,
    feed: [
        [2, 4],
        [3, 6]
    ]
}

const reducers = {
    ADD: (state) => {
        return {
            ...state,
            feed: [...state.feed, [1, 1]]
        }
    },
    REMOVE: (state, index) => {
        return {
            ...state,
            feed: state.feed.filter((_x, i) => i !== index)
        }
    },
    EDIT: (state, payload) => {
        const { index, val } = payload;
        return {
            ...state,
            feed: state.feed.map((x, i) => i === index ? val : x)
        }
    },
    EXECUTE: (state) => {
        let [f, str] = Execute(state.feed);
        str = str.replace(/\^\{(.*?)\}/g, "<sup>$1</sup>")
        return {
            ...state,
            f,
            str,
            answer: f(state.test),
            feed: state.feed
        }
    },
    RESET: (state) => {
        return {
            f: x => x,
            str: "f(x) => x",
            test: 1,
            answer: 1,
            feed: [
                [1, 1],
                [2, 2],
            ]
        }
    },
    SET_TEST: (state, payload) => {
        return {
            ...state,
            test: payload,
            answer: state.f(payload)
        }
    },
}

const masterReducer = (state, action) => reducers[action.type](state, action.payload);

export function DataProvider({ children }) {

    const DataState = useReducer(masterReducer, initValue);

    return (
        <DataContext.Provider value={DataState}>
            {children}
        </DataContext.Provider>
    )
}