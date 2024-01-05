
import { useState } from "react";
import { getCoursesByFilter } from "../service/courseService";
import useResponseState, {ResponseType} from "../utilities/useResponseState"
import { Fields } from "./CoursesList";

const initialSearchQuery = {
    [Fields.TITLE] : "",
    [Fields.START_DATE]: ""
}

const SearchCourses = () => {

    const [searchState, setSearchState] = useState(initialSearchQuery);
    const [searchedCoursesState, setSearchedCoursesState] = useState([]);
    const [responseState, settingResponseState] = useResponseState();

    const handleInputChange = (e, field) => {
        setSearchState({...searchState, [field] : e.target.value})
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const data = await getCoursesByFilter(searchState);
            setSearchedCoursesState(data);
        } catch(e) {
            settingResponseState(e.message, ResponseType.ERROR)
        }

    }

    return (
        <section>
            <section>
                <form>
                    <div>
                        <input type = "text" id = {Fields.TITLE} name = {Fields.TITLE} value = {searchState.title} onChange={(e) => handleInputChange(e, Fields.TITLE)}/>
                        <input type = "submit" value = "search" onClick={handleSearch}/>
                        <input type = "date" id = {Fields.START_DATE} name = {Fields.START_DATE} value = {searchState.startDate} onChange={(e) => handleInputChange(e, Fields.START_DATE)}/>
                        <input type = "submit" value = "search" onClick={handleSearch}/>
                    </div>
                </form>
            </section>

            <section>
                {
                    responseState.error ? responseState.error : 
                    searchedCoursesState.length > 0 ? <table border = "1">
                        <thead>
                            <tr>
                                <>
                                    {
                                        Object.keys(Fields).map((key) => {
                                            return <th key = {key}> {Fields[key]} </th>
                                        })
                                    }
                                </>
                            </tr>
                        </thead>
                        <tbody>
                            <>
                                {
                                    searchedCoursesState.map((course) => {
                                        return <tr key = {course.courseId}>
                                            <>
                                                {
                                                Object.keys(Fields).map((key) => {
                                                        return <td key = {key}> {course[Fields[key]]} </td>
                                                    }) 
                                                }
                                            </>
                                        </tr>
                                    })
                                }
                            </>
                        </tbody>
                    </table> : <center>No courses Available</center>
                }
            </section>
                        
        </section>
    );

}

export default SearchCourses;