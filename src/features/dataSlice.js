// https://collectionapi.metmuseum.org/public/collection/v1/objects/[insert an object id here]

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
//Setting API data to state
    name: 'data',
    initialState,
    reducers:{
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        },
        //Re-setting state back to initial values
        clearData: () => {
            return initialState
        },
        //Incrementing the ID by one
        incrementId: (state) => {
            return {...state, objectId : state.objectId + 1}
        },
        //Decrementing the ID by one
        decrementId: (state) => {
            return {...state, objectId : state.objectId - 1}
        },
        //Entering a custom ID
        inputId: (state, action) => {
            return {...state, objectId : action.payload}
        }
    }

})

export const {setData, clearData, incrementId, decrementId, inputId} = dataSlice.actions

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await response.json()
        dispatch(setData(resData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer