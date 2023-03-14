import React from "react";
import { useState, useEffect } from "react";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const [prevInput, setPrevInput] = useState<string>("");
  const [curState, setCurState] = useState<string>("");
  const [input, setInput] = useState<string>("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [total, setTotal] = useState<boolean>(false);


  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);

  // this function taking input number
  const inputNum = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (curState.includes(".") && e.currentTarget.innerText === ".") return;

    if (total) {
      setPrevInput("");
    }

    const numClicked = e.currentTarget.innerText;
    const newCurState = curState + numClicked;
    setCurState(newCurState);
    setInput(newCurState);
    setTotal(false);
  };

   // this function sets the operator
  const operatorType = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    setTotal(false);
    setOperator(e.currentTarget.innerText);
    if (curState === "") return;
    if (prevInput !== "") {
      equals(e);
    } else {
      setPrevInput(curState);
      setCurState("");
    }
  };

  // Equal Function for Calculation

  const equals = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (e?.currentTarget.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "÷":
        cal = String(parseFloat(prevInput) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(prevInput) + parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(prevInput) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(prevInput) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPrevInput(cal);
    setCurState("");
    setOperator("");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  const reset = () => {
    setPrevInput("");
    setCurState("");
    setInput("0");
  };
  // console.log(input)
  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
        {prevInput !== ""? prevInput+operator : ""}{input}
        </div>
        <div className="btn light-gray" onClick={reset}>
          AC
        </div>
        <div className="btn light-gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn light-gray">%</div>
        <div className="btn orange" onClick={operatorType}>
          ÷
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          x
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn orange" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
};

export default Calculator;
