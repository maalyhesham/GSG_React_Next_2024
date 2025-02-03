import { useEffect, useRef, useState } from "react";
import Student from "../components/student/student.component";
import { IStudent } from "../types";
import { useSearchParams } from "react-router-dom";
import React from "react";

interface IProps {
  totalAbsents: number;
  studentsList: IStudent[];
  onAbsent: (id: string, change: number) => void;
  onRemove: () => void;
}

const COURSES_FILTERS = ["Math", "HTML", "CSS", 'react'];

const Main = (props: IProps) => {
  const { totalAbsents, studentsList } = props;

  const [filteredList, setFilteredList] = useState<IStudent[]>(studentsList);
  const [minAbsents, setMinAbsents] = useState<number>(0);
  const [maxAbsents, setMaxAbsents] = useState<number>(100);
  const [params, setParams] = useSearchParams();
  const lastStdRef = useRef<HTMLDivElement>(null);

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const query = params.get("q") || "";
    const graduated = params.get("graduated");
    const courses = params.getAll("courses");

    let tempList = studentsList;

    if (query) {
      tempList = tempList.filter((std) =>
        std.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (graduated === "grad") {
      tempList = tempList.filter((std) => std.isGraduated);
    } else if (graduated === "non-grad") {
      tempList = tempList.filter((std) => !std.isGraduated);
    }

    if (courses.length) {
      tempList = tempList.filter((std) =>
        courses.every((c) => std.coursesList.includes(c))
      );
    }

    tempList = tempList.filter(
      (std) => std.absents >= minAbsents && std.absents <= maxAbsents
    );

    setFilteredList(tempList);
  }, [params, studentsList, minAbsents, maxAbsents]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.length) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    setParams(params);
  };

  const handleGradFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === "all") {
      params.delete("graduated");
    } else {
      params.set("graduated", v);
    }
    setParams(params);
  };

  const handleCourseFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const course = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      params.append("courses", course);
    } else {
      const currentCourses = params.getAll("courses");
      params.delete("courses");
      currentCourses
        .filter((c) => c !== course)
        .forEach((c) => params.append("courses", c));
    }
    setParams(params);
  };

  const resetFilters = () => {
    params.delete("q");
    params.delete("graduated");
    params.delete("courses");
    setParams(params);
    setMinAbsents(0);
    setMaxAbsents(100);
    setFilteredList(studentsList);
  };

  if (studentsList.length === 0) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="main-screen">
      <h2>Students List</h2>
      <div className="stats">
        <button onClick={props.onRemove} className="button">
          POP Student
        </button>
        <button onClick={scrollToLast} className="button">
          Scroll to Last
        </button>
        <b style={{ fontSize: "12px", fontWeight: 100, color: "gray" }}>
          Total Absents {totalAbsents}
        </b>
      </div>
      <div className="filter">
        <input
          type="search"
          placeholder="Search"
          onChange={handleSearch}
          value={params.get("q") || ""}
        />
        <select
          value={params.get("graduated") || "all"}
          onChange={handleGradFilter}
        >
          <option value="all">All</option>
          <option value="grad">Graduated</option>
          <option value="non-grad">Not Graduated</option>
        </select>
        <div>
          {COURSES_FILTERS.map((c) => (
            <React.Fragment key={c}>
              <input
                id={c}
                type="checkbox"
                value={c}
                onChange={handleCourseFilter}
                checked={params.getAll("courses").includes(c)}
              />
              <label htmlFor={c}>{c}</label>&nbsp;&nbsp;
            </React.Fragment>
          ))}
        </div>
       
        <button onClick={resetFilters} className="button">
          Reset Filters
        </button>
      </div>
      {filteredList.length ? (
        <div className="list">
          {filteredList.map((student) => (
            <Student
              mode="list"
              key={student.id}
              id={student.id}
              name={student.name}
              age={student.age}
              absents={student.absents}
              isGraduated={student.isGraduated}
              coursesList={student.coursesList}
              onAbsentChange={props.onAbsent}
            />
          ))}
        </div>
      ) : (
        <h3>No results found!</h3>
      )}
      <div ref={lastStdRef}></div>
    </div>
  );
};

export default Main;
