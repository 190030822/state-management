import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courses : [
    ],
}

const coursesSlice = createSlice( {
        name : 'courses',
        initialState,
        reducers : {
            addCourse : (state, action) => {
                state.courses.push(action.payload)
            },
            updateCourse : (state, action) => {
                state.courses = state.courses.filter((course) => course.courseId !== action.payload.courseId)
                state.courses.push(action.payload)
            },
            deleteCourse : (state, action) => {
                state.courses = state.courses.filter((course) => course.courseId !== action.payload)
            },
            getCourses : (state, action) => {
                console.log(action.payload)
                state.courses = action.payload
            }
        }
    }
)

export const { addCourse, updateCourse, deleteCourse, getCourses} = coursesSlice.actions
export default coursesSlice.reducer