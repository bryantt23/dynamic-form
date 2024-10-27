import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: ''
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFormData: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.age = action.payload.age
            state.occupation = action.payload.occupation
            state.subordinates = action.payload.subordinates
            state.language = action.payload.language
        }
    }
})

export const { setFormData } = formSlice.actions

export default formSlice.reducer