import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../slices/courseSlice"
export const store = configureStore( {
        reducer: {
            courses : coursesReducer
        }
    }
)