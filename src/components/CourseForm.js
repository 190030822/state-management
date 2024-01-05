import { useState , useEffect} from "react";
import { initialCoursesData, Fields } from "./CoursesList";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "../slices/courseSlice";
import { addCourseService, updateCourseService} from "../service/courseService";

const CourseForm = ({courseData}) => {

    const [courseState, setCourseState] = useState(courseData);
    const [validationState, setValidationState] = useState({...initialCoursesData});
    const [resposneState, setResponseState] = useState({error : "", success : ""})
    const dispatch = useDispatch()

    useEffect(() => {
        setCourseState({...courseData});
        if (!(!courseData.courseId)) {
            setValidationState({
                [Fields.END_DATE] : "",
                [Fields.SYLLABUS] : "",
            })
        }
    }, [courseData])

    const handleInputChange = (e, field)  => {
        setCourseState({...courseState, [field] : e.target.value})
        switch(field) {
            case Fields.TITLE : {
                if (e.target.value.length < 2 || !e.target.value) {
                    validationState.title = "title should be min one character"
                    console.log(validationState)
                } else {
                    delete validationState.title
                }
                return;
            }
            case Fields.DURATION : {
                if (!e.target.value || isNaN(e.target.value)) {
                    validationState.courseDuration = "duration should be a number"
                } else {
                    delete validationState.courseDuration
                }
                return;
            }
            case Fields.START_DATE:
            case Fields.DESCRIPTION:
            case Fields.INSTRUCTOR: {
                if (!e.target.value) {
                    validationState[field] = [field] + " should be min one character"
                } else {
                    delete validationState[field]
                }
                return;
            } 
            default : return;
        }
    }

    const handleCourseSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!courseState.courseId) {
                const data = await addCourseService(courseState);
                dispatch(addCourse(data))
                setResponseState({error : "", success : "course created successfully"})
            } else {
                const data = await updateCourseService(courseState);
                dispatch(updateCourse(data))
                setResponseState({error : "", success : "course updated successfully"})
            }    
        } catch (e) {
            setResponseState({error : e.message, success : ""})
        }
        finally {
            setTimeout(() => {
                setResponseState({error : "", success : ""})
            }, 5000)
        }
        setCourseState({...initialCoursesData})
        setValidationState({...initialCoursesData})
    }

    return <form onSubmit= {handleCourseSubmit}>
        <div>
            <label htmlFor={Fields.TITLE}> {Fields.TITLE}  : </label>
            <input type = "text" name = {Fields.TITLE}  id = {Fields.TITLE} value = {courseState.title} onChange= {(e) => handleInputChange(e, Fields.TITLE)}/>
        </div>
        {validationMessage(validationState.title)}
        <div>
            <label htmlFor={Fields.DESCRIPTION}> {Fields.DESCRIPTION}  : </label>
            <input type = "text" name = {Fields.DESCRIPTION}  id = {Fields.DESCRIPTION} value = {courseState.description} onChange= {(e) => handleInputChange(e, Fields.DESCRIPTION)}/>
        </div>
        {validationMessage(validationState.description)}
        <div>
            <span> {Fields.INSTRUCTOR} : </span>
            {
                options.map((option) => {
                    return <label key = {option}>
                        <input type = "radio" name = {Fields.INSTRUCTOR} value = {option} onChange= {(e) => handleInputChange(e, Fields.INSTRUCTOR)}/>
                        {option}
                    </label>
                })
            }
        </div>
        {validationState.instructor !== "none" && validationMessage(validationState.instructor)}
        <div>
            <label htmlFor={Fields.DURATION}> {Fields.DURATION}  : </label>
            <input type = "text" name = {Fields.DURATION}  id = {Fields.DURATION} value = {courseState.courseDuration} onChange= {(e) => handleInputChange(e, Fields.DURATION)}/>
        </div>
        {validationMessage(validationState.courseDuration)}
        <div>
            <label htmlFor={Fields.START_DATE}> {Fields.START_DATE}  : </label>
            <input type = "date" name = {Fields.START_DATE}  id = {Fields.START_DATE} value = {courseState.startDate} onChange= {(e) => handleInputChange(e, Fields.START_DATE)}/>
        </div>
        {validationMessage(validationState.startDate)}
        <div>
            <label htmlFor={Fields.END_DATE}> {Fields.END_DATE}  : </label>
            <input type = "date" name = {Fields.END_DATE}  id = {Fields.END_DATE} value = {courseState.endDate} onChange= {(e) => handleInputChange(e, Fields.END_DATE)}/>
        </div>
        {validationMessage(validationState.endDate)}
        <div>
            <label htmlFor={Fields.SYLLABUS}> {Fields.SYLLABUS}  : </label>
            <input type = "text" name = {Fields.SYLLABUS}  id = {Fields.SYLLABUS} value = {courseState.syllabus} onChange= {(e) => handleInputChange(e, Fields.SYLLABUS)}/>
        </div>
        <input type = "submit" disabled = {!(!courseState.courseId) || Object.keys(validationState).length > 2} value = "create" />
        {!(!courseState.courseId) && <input type = "submit" disabled = {Object.keys(validationState).length > 2} value = "update" />}
        <br/>
        {validationMessage(resposneState.error)}
        {validationMessage(resposneState.success)}
    </form>

}

const validationMessage = (msg) => {
    return msg && <span style = {{"color" : "red"}}> {msg}</span>
}

const options = ["Rammaiah", "pradeepini", "srikanth"]

export default CourseForm;