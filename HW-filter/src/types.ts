export interface IStudent {
  id: string;
  name: string;
  age: number;
  isGraduated: boolean;
  coursesList: string[];
  absents: number;
  prevAbsents?: number;
}
