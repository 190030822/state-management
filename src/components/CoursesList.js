import { useSelector, useDispatch } from "react-redux"
import CourseForm from "./CourseForm"
import { useEffect, useState } from "react"
import { getCourses,  deleteCourse } from "../slices/courseSlice"
import { getCoursesService, deleteCourseService} from "../service/courseService"

export const Fields = {
    TITLE : "title",
    DESCRIPTION : "description",
    INSTRUCTOR : "instructor",
    DURATION : "courseDuration",
    START_DATE : "startDate",
    END_DATE : "endDate",
    SYLLABUS : "syllabus"
}

export const initialCoursesData = {
    [Fields.TITLE] : "",
    [Fields.DESCRIPTION] : "",
    [Fields.INSTRUCTOR] : "",
    [Fields.DURATION] : "",
    [Fields.START_DATE] : "",
    [Fields.END_DATE] : "",
    [Fields.SYLLABUS] : "",
}


const CourseList = () => {

    const courses = useSelector((state) => state.courses.courses);

    const [courseState, setCourseState] = useState({...initialCoursesData});

    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const data = await getCoursesService();
            dispatch(getCourses(data))
        }
        fetchData();
    }, [])

    const handleUpdateCourse = (e, course) => {
        setCourseState({...course})
    }

    const handleDeleteCourse = async (e, courseId) => {
        await deleteCourseService(courseId);
        dispatch(deleteCourse(courseId))
    }
    console.log("dfgdtgdt")
    return <>
    <section>
        <CourseForm courseData = {courseState}/>
    </section>
    <section>
        {
            courses.length > 0 ? <table border = "1">
                <thead>
                    <tr>
                        <>
                            {
                                Object.keys(Fields).map((key) => {
                                    return <th key = {key}> {Fields[key]} </th>
                                })
                            }
                        </>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {
                            courses.map((course) => {
                                return <tr key = {course.courseId}>
                                    <>
                                        {
                                           Object.keys(Fields).map((key) => {
                                                return <td key = {key}> {course[Fields[key]]} </td>
                                            }) 
                                        }
                                    </>
                                    <td key = "edit"><input type = "submit" value = "EDIT" onClick ={(e) => handleUpdateCourse(e, course)} /></td>
                                    <td key = "delete"><input type = "submit" value = "DELETE" onClick={(e) => handleDeleteCourse(e, course.courseId)} /></td>
                                </tr>
                            })
                        }
                    </>
                </tbody>
            </table> : <center>No courses Available</center>
        }
    </section>
    </>
}

export default CourseList;

