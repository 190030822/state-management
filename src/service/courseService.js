import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/courses-management/"
axios.defaults.headers.common['Content-Type'] = 'application/json'

export const addCourseService = async (course) => {
    try {
        const response = await axios.post("/addCourse", course);
        return response.data;
    } catch (e) {
        throw new Error(Object.values(e.response.data.message)[0])
    }
}

export const getCoursesService = async () => {
    try {
        const response = await axios.get("getAllCourses");
        return response.data;
    } catch (e) {
        throw new Error(Object.values(e.response.data.message)[0])
    }
}

export const updateCourseService = async (course) => {
    try {
        const response = await axios.put("updateCourse/" + course.courseId, course);
        return response.data;
    } catch(e) {
        throw new Error(Object.values(e.response.data.message)[0])
    }
}

export const getCoursesByFilter = async (fields) => {
    const queryParams = {}
    Object.keys(fields).forEach((key) => fields[key] ? queryParams[key] = fields[key] : null)
    try {
        const response = await axios.get("searchCourseByFilter", {
            params: queryParams,
        });
        return response.data;
    } catch(e) {
        throw new Error(Object.values(e.response.data.message)[0])
    } 
}


export const deleteCourseService = async (courseId) => {
    await axios.delete("deleteCourseById/"+courseId);
    return;
}



