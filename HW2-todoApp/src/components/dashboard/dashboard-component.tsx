import "./dashboard-component.css";
import { ITodoItem } from "../types";

interface IProps {
  items: ITodoItem[];
}
const Dashboard = (props: IProps) => {
  const urgentCount = props.items.filter((item) => item.isUrgent).length;
  const completedCount = props.items.filter((item) => item.isDone).length;

  return (
    <div className="dashboard-wrapper">
      <div>
        <b>{props.items.length}</b>
        <span>Created Tasks</span>
      </div>
      <div>
        <b>{urgentCount}</b>
        <span>urgent Tasks</span>
      </div>
      <div>
        <b>{completedCount}</b>
        <span>completed Tasks</span>
      </div>
    </div>
  );
};

export default Dashboard;
