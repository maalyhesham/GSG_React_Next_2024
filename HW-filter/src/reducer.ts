import { IStudent } from "./types";

export type State = {
  studentsList: IStudent[];
  totalAbsents: number;
};

export type Action =
  | { type: "INIT"; payload: IStudent[] }
  | { type: "ADD_STUDENT"; payload: IStudent }
  | { type: "REMOVE_FIRST" }
  | { type: "UPDATE_ABSENTS"; payload: { id: string; change: number } };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      const totalAbsents = action.payload.reduce(
        (prev, cur) => prev + cur.absents,
        0
      );

      const updatedPayload = action.payload.map((student) => ({
        ...student,
        prevAbsents: student.prevAbsents ?? student.absents,
      }));

      return { studentsList: updatedPayload, totalAbsents };

    case "ADD_STUDENT":
      return {
        ...state,
        studentsList: [action.payload, ...state.studentsList],
      };
    case "REMOVE_FIRST":
      const removedStudent = state.studentsList[0];
      return {
        studentsList: state.studentsList.slice(1),
        totalAbsents: Math.max(
          0,
          state.totalAbsents - (removedStudent?.absents || 0)
        ),
      };
    case "UPDATE_ABSENTS":
      return {
        studentsList: state.studentsList.map((student) =>
          student.id === action.payload.id
            ? {
                ...student,
                prevAbsents: student.absents,
                absents: Math.max(0, student.absents + action.payload.change),
              }
            : student
        ),
        totalAbsents: Math.max(0, state.totalAbsents + action.payload.change),
      };

    default:
      return state;
  }
};
