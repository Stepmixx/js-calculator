import React, { useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import "./Calculator.css";

const btns = [
  { clear: "AC" },
  { divide: "/" },
  { multiply: "×" },
  { seven: "7" },
  { eight: "8" },
  { nine: "9" },
  { subtract: "-" },
  { four: "4" },
  { five: "5" },
  { six: "6" },
  { add: "+" },
  { one: "1" },
  { two: "2" },
  { three: "3" },
  { equals: "=" },
  { zero: "0" },
  { decimal: "." },
];

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [lastPressed, setLastPressed] = useState(undefined);

  const handleClick = (e) => {
    const btn = e.target.textContent;

    switch (btn) {
      case "AC":
        setDisplay("0");
        break;
      case "=":
        const result = eval(display);
        setDisplay(result);
        break;
      case ".":
        const lastNum = display.split(" ").slice(-1)[0];
        if (!lastNum.includes(btn)) {
          setDisplay(display + btn);
        }
        break;
      default:
        let e = undefined;
        if (!Number.isNaN(Number(btn))) {
          e = display === "0" ? btn : display + btn;
        } else if ("×/+".includes(btn) && "×/+".includes(lastPressed)) {
          e = display.slice(0, -3) + ` ${btn === "×" ? "*" : btn} `;
        } else if (/[\/*+-]\s\s-/.test(display)) {
          if (btn === "-") {
            e = display;
          } else {
            e = display.slice(0, -6) + ` ${btn === "×" ? "*" : btn} `;
          }
        } else {
          e = display + ` ${btn === "×" ? "*" : btn} `;
        }
        setDisplay(e);
    }
    setLastPressed(btn);
  };

  return (
    <div className="calculator-container">
      <div className="display-container">
        <div id="display" className="display">
          {display}
        </div>
      </div>
      <div className="control-panel">
        <div className="btns-container">
          {btns.map((btn, i) => {
            const entriesArr = Object.entries(btn)[0];
            return (
              <button
                className="btn"
                onClick={(e) => handleClick(e)}
                id={entriesArr[0]}
                key={i}
              >
                {entriesArr[1]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calculator;
