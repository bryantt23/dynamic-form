import { configureStore } from "@reduxjs/toolkit";
import { formSlice } from "../features/form/formSlice";
import logger from 'redux-logger'

export const store = configureStore({
    reducer: {
        form: formSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

