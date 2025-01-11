import React from "react";
import "./button.css";

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ value, onClick, className }) => {
  return (
    <input
      type="button"
      value={value}
      onClick={() => onClick(value)}
      className={`button ${className}`}
    />
  );
};

export default Button;

// import "./button.css";

// interface Iprops {
//   name: string;
// }

// const Button = (props: Iprops) => {
//   return <button>{props.name}</button>;
// };

// export default Button;
