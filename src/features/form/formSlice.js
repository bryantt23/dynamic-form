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

            Object.entries(action.payload).forEach(([key, value]) => {
                if (!['name', 'email', 'age', 'occupation'].includes(key)) {
                    state[key] = value
                }
            })
        }
    }
})

export const { setFormData } = formSlice.actions

export default formSlice.reducer