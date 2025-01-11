import { useState } from "react";
import { ITodoItem } from "../types";
import "./form.css";

interface IProps {
  onSubmit: (item: ITodoItem) => void;
}

const Form: React.FC<IProps> = (props) => {
  const [title, setTitle] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState<boolean>(false); // إضافة حالة للتحكم في checkbox

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // الحصول على قيمة العنوان وحالة الـ checkbox
    const taskTitle: string = title;
    const taskIsUrgent: boolean = isUrgent;

    // تحقق من أن العنوان يحتوي على أكثر من 3 أحرف
    if (taskTitle.length > 3) {
      const newTask: ITodoItem = {
        id: Date.now(),
        title: taskTitle,
        isUrgent: taskIsUrgent,
        isDone: false,
      };

      // إرسال المهمة الجديدة عبر onSubmit
      props.onSubmit(newTask);

      // مسح الحقول بعد الإرسال
      setTitle(""); // مسح الحقل
      setIsUrgent(false); // مسح قيمة الـ checkbox
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        name="task"
        placeholder="type todo here ..."
        value={title} // قيمة الـ input تكون مرتبطة بالحالة
        onChange={(e) => setTitle(e.target.value)} // تحديث القيمة
      />
      <div>
        <label htmlFor="urgent">Urgent</label>
        <input
          type="checkbox"
          id="urgent"
          name="urgent"
          checked={isUrgent} // قيمة الـ checkbox تكون مرتبطة بالحالة
          onChange={(e) => setIsUrgent(e.target.checked)} // تحديث القيمة
        />
      </div>
      <input className="submit" type="submit" value="Add Todo" />
    </form>
  );
};

export default Form;
