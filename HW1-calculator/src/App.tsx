import { useState } from "react";

import "./App.css";
import Button from "./components/buttons/button";

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  function handleChange(_value: string): void {
    if (_value === "=") {
      try {
        setInputValue(eval(inputValue).toString());
      } catch (e) {
        setInputValue("Error");
      }
    } else if (_value === "C") {
      setInputValue("");
    } else {
      setInputValue(inputValue + _value);
    }
  }

  // List of buttons
  const buttonList: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "+",
    "=",
    "C",
  ];

  return (
    <div className="container">
      <div className="calculator">
        <form>
          <div className="display">
            <input type="text" value={inputValue} readOnly />
          </div>
          <div className="section">
            <div>
              {buttonList.map((value, index) => {
                const isLastTwo =
                  index === buttonList.length - 1 ||
                  index === buttonList.length - 2;

                return (
                  <Button
                    key={index}
                    value={value}
                    onClick={handleChange}
                    className={isLastTwo ? "last-two-buttons" : ""}
                  />
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// import "./App.css";
// // import ContainerButtons from "./assets/components/ContainerButtons/ContainerButtons";
// // import Button from "./assets/components/buttons/button";
// import { useState } from "react";

// export default function App() {
//   // State to track the input value
//   const [inputValue, setInputValue] = useState<string>("");

//   // Handle button click events
//   function handleChange(_index: number, _value: string): void {
//     // Simple logic for appending or calculating
//     if (_value === "=") {
//       try {
//         // Calculate the expression when "=" is clicked
//         setInputValue(eval(inputValue).toString());
//       } catch (e) {
//         setInputValue("Error");
//       }
//     } else if (_value === "C") {
//       // Clear the input if "C" is clicked
//       setInputValue("");
//     } else {
//       // Append value to the input
//       setInputValue(inputValue + _value);
//     }
//   }

//   const buttonList: string[] = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "0",
//     "-",
//     "+",
//     "=",
//     "C",
//   ];

//   return (
//     <div className="container">
//       <div className="calculator">
//         <form action="">
//           <div className="display">
//             <input type="text" value={inputValue} />
//           </div>
//           <div className="section">
//             <div>
//               {buttonList.map((value, index) => {
//                 const isLastTwo =
//                   index === buttonList.length - 1 ||
//                   index === buttonList.length - 2;

//                 return (
//                   <input
//                     key={index}
//                     type="button"
//                     onClick={() => handleChange(index, value)}
//                     value={value}
//                     className={`button ${isLastTwo ? "last-two-buttons" : ""}`}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// //    const [value, setValue] = useState<string>("");
// //  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
// //     setValue(value + e.currentTarget.value);

// //   const [value, setValue] = useState<string>("");
// //   const handelClick = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setValue(value + e.target.value)};

// //   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
// //     setValue(value + e.currentTarget.value);
// //   return (
// //     <
// //             <input type="text" />div className="container">
// //       <div className="calculator">
// //         <form action="">
// //           <div className="display">
// //           </div>
// //           <div>
// //             <input type="button" value="1" />
// //             <input type="button" value="2" />
// //             <input type="button" value="4" />
// //           </div>
// //           <div>
// //             <input type="button" value="4" />
// //             <input type="button" value="5" />
// //             <input
// //               type="button"
// //               value="6"
// //               // onClick={(e) => setValue(value + e.target.value)}
// //               // onClick={handleClick}
// //             />
// //           </div>
// //           <div>
// //             <input type="button" value="7" />
// //             <input type="button" value="8" />
// //             <input type="button" value="9" />
// //           </div>
// //           <div>
// //             <input type="button" value="0" />
// //             <input type="button" value="+" />
// //             <input type="button" value="-" />
// //           </div>
// //           <div>
// //             <input type="button" value="=" className="equal" />
// //           </div>
// //         </form>
// //       </div>
// //     </div>
