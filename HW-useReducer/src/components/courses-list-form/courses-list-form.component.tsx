import { useEffect, useRef, useReducer } from "react";

interface IProps {
  value: string[];
  onSubmit: (list: string[]) => void;
}

type Action =
  | { type: 'SET_COURSES_LIST'; list: string[] };

const coursesListReducer = (state: string[], action: Action): string[] => {
  switch (action.type) {
    case 'SET_COURSES_LIST':
      return action.list;
    default:
      return state;
  }
};

const CoursesListForm = (props: IProps) => {
  const [courseList, dispatch] = useReducer(coursesListReducer, props.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch({ type: 'SET_COURSES_LIST', list: props.value });
  }, [props.value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCourse = event.currentTarget["courseName"].value;
    const newList = [...courseList, newCourse];
    dispatch({ type: 'SET_COURSES_LIST', list: newList });
    props.onSubmit(newList);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="addCourseForm">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cName">Enter Course: </label>
          <input ref={inputRef} id="cName" type="text" name="courseName" required />
        </div>
        <button type="submit">Add Course</button>
      </form>
      <ul >
        {courseList.map((course, index) => <li key={course + index}>{course}</li>)}
      </ul>
    </div>
  )
};

export default CoursesListForm;
