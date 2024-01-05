import './App.css';
import CourseList from "./components/CoursesList"
import {Link, Route, Routes} from "react-router-dom"
import SearchCourses from './components/SearchCourses';

function App() {
  return (
    <>
      <nav>
        <ul >
          <li>
            <Link to = "/searchCourses"> SEARCH</Link>
          </li>
          <li>
            <Link to = "/">HOME</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path = "/" element = {<CourseList/>} />
        <Route path = "/searchCourses" element = {<SearchCourses/>} />
    </Routes>
    </>
  );
}

export default App;
