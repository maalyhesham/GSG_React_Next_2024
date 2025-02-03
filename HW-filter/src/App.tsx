import "./App.css";
import Main from "./screens/Main.screen";
import About from "./screens/About.screen";
import NotFound from "./screens/NotFound.screen";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import StudentDetails from "./screens/StudentsDetails.screen";
import { useReducer, useEffect } from "react";
import useLocalStorage from "./hooks/localStorage.hook";
import { IStudent } from "./types";
import AddStudent from "./screens/AddStudent.screen";
import { reducer, State } from "./reducer";

function App() {
  const h1Style = { color: "#69247C", fontSize: "24px" };

  const initialState: State = { studentsList: [], totalAbsents: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();

  const { storedData } = useLocalStorage(state.studentsList, "students-list");

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    const updatedList = stdList.map((student) => ({
      ...student,
      prevAbsents: student.prevAbsents ?? student.absents,
    }));
    dispatch({ type: "INIT", payload: updatedList });
  }, [storedData]);

  const handleAbsentChange = (id: string, change: number) => {
    dispatch({ type: "UPDATE_ABSENTS", payload: { id, change } });
  };

  const handleAddStudent = (newStudent: IStudent) => {
    dispatch({ type: "ADD_STUDENT", payload: newStudent });
  };

  const removeFirst = () => {
    dispatch({ type: "REMOVE_FIRST" });
  };

  return (
    <div className="main wrapper">
      <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home Page
        </Link>
        <Link
          to="/add"
          className={location.pathname === "/add" ? "active" : ""}
        >
          Add Student
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About App
        </Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              studentsList={state.studentsList}
              totalAbsents={state.totalAbsents}
              onAbsent={handleAbsentChange}
              onRemove={removeFirst}
            />
          }
        />
        <Route path="/add" element={<AddStudent onAdd={handleAddStudent} />} />
        <Route path="/about" element={<About />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
