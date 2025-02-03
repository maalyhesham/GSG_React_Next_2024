import { useEffect, useRef, useReducer, useState } from 'react';
import { IStudent } from '../../types';
import CoursesList from '../courses-list/courses-list.component';
import './student.css';

interface IProps extends IStudent {
  onAbsentChange: (id: string, change: number) => void;
}

type Action =
  | { type: 'SET_ABSENT'; absents: number }
  | { type: 'SET_ABSENT_COLOR'; color: string };

const studentReducer = (state: { absents: number, absentColor: string }, action: Action) => {
  switch (action.type) {
    case 'SET_ABSENT':
      return { ...state, absents: action.absents };
    case 'SET_ABSENT_COLOR':
      return { ...state, absentColor: action.color };
    default:
      return state;
  }
};

const Student = (props: IProps) => {
  const [state, dispatch] = useReducer(studentReducer, { absents: props.absents, absentColor: '#213547' });
  const prevAbsents = useRef<number>(props.absents); // useRef(initialValue)

  useEffect(() => {
    if (state.absents >= 10) {
      dispatch({ type: 'SET_ABSENT_COLOR', color: '#ff0000' });
    } else if (state.absents >= 7) {
      dispatch({ type: 'SET_ABSENT_COLOR', color: '#fd9c0e' });
    } else if (state.absents >= 5) {
      dispatch({ type: 'SET_ABSENT_COLOR', color: '#d6c728' });
    } else {
      dispatch({ type: 'SET_ABSENT_COLOR', color: '#213547' });
    }
  }, [state.absents]);

  const addAbsent = () => {
    prevAbsents.current = state.absents;
    dispatch({ type: 'SET_ABSENT', absents: state.absents + 1 });
    props.onAbsentChange(props.id, +1);
  }

  const removeAbsent = () => {
    if (state.absents - 1 >= 0) {
      prevAbsents.current = state.absents;
      dispatch({ type: 'SET_ABSENT', absents: state.absents - 1 });
      props.onAbsentChange(props.id, -1);
    }
  }

  const resetAbsent = () => {
    prevAbsents.current = state.absents;
    dispatch({ type: 'SET_ABSENT', absents: 0 });
    props.onAbsentChange(props.id, -state.absents);
  }

  return (
    <div className="std-wrapper">
      <div className="data-field">
        <b>Student:</b> {props.name.toUpperCase() + '!'}
      </div>
      <div className="data-field">
        <b>Age:</b> {props.age}
      </div>
      <div className="data-field" style={{ color: props.isGraduated ? 'green' : 'orange' }}>
        <b>Is Graduated:</b> {props.isGraduated ? 'Yes' : 'No'}
      </div>
      <div className="data-field">
        <b>Courses List:</b>
        <CoursesList list={props.coursesList} />
      </div>
      <div className="absents">
        <b style={{ color: state.absentColor }}>Prev Absents:</b> {prevAbsents.current}
        <b style={{ color: state.absentColor }}>Absents:</b> {state.absents}
        <button onClick={addAbsent}>+</button>
        <button onClick={removeAbsent}>-</button>
        <button onClick={resetAbsent}>Reset</button>
      </div>
    </div>
  )
}

export default Student;
