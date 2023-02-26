import "./App.css";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  const [screenData, setScreenData] = useState({
    num: "",
    operator: "",
    prevNum: "",
  });

  const resetClickHandler = () => {
    setScreenData({
      num: "",
      operator: "",
      prevNum: "",
    });
  };

  const invertClickHandler = () => {
    let temp = 0 - parseFloat(screenData.num);
    setScreenData({
      num: temp,
      operator: screenData.operator,
      prevNum: screenData.prevNum,
    });
  };

  const numClickHandler = (e) => {
    let newNum;
    if (
      screenData.num !== "" &&
      screenData.operator !== "" &&
      screenData.prevNum === ""
    ) {
      newNum = {
        num: e.target.value,
        operator: screenData.operator,
        prevNum: parseFloat(screenData.num),
      };
    } else {
      newNum = {
        num: screenData.num + e.target.value,
        operator: screenData.operator,
        prevNum: parseFloat(screenData.prevNum),
      };
    }
    setScreenData(newNum);
  };

  const operatorClickHandler = (e) => {
    screenData.operator === ""
      ? setScreenData({
          num: "",
          operator: e.target.value,
          prevNum: parseFloat(screenData.num),
        })
      : screenData.operator !== e.target.value && screenData.num === ""
      ? setScreenData({
          num: "",
          operator: e.target.value,
          prevNum: parseFloat(screenData.prevNum),
        })
      : screenData.operator !== "" &&
        screenData.prevNum !== "" &&
        screenData.num !== ""
      ? equalsClickHandler(e)
      : setScreenData(...setScreenData);
  };

  const equalsClickHandler = (e) => {
    let equals;

    screenData.operator === "+"
      ? (equals = parseFloat(screenData.prevNum) + parseFloat(screenData.num))
      : screenData.operator === "-"
      ? (equals = parseFloat(screenData.prevNum) - parseFloat(screenData.num))
      : screenData.operator === "X"
      ? (equals = parseFloat(screenData.prevNum) * parseFloat(screenData.num))
      : screenData.operator === "/"
      ? (equals = parseFloat(screenData.prevNum) / parseFloat(screenData.num))
      : (equals = parseFloat(screenData.num));

    let temp2 = {
      num: equals.toString(),
      operator: e.target.value === "=" ? "" : e.target.value,
      prevNum: "",
    };
    setScreenData(temp2);
  };

  const commaClickHandler = (e) => {
    //convert to array
    let decimalNum;
    let numToArr = String(screenData.num).split("");
    numToArr.includes(".")
      ? (decimalNum = screenData.num)
      : (decimalNum = screenData.num + ".");
    setScreenData({
      num: decimalNum,
      operator: screenData.operator,
      prevNum: screenData.prevNum,
    });
  };

  const percentClickHandler = (e) => {
    let tempData = {
      num: parseFloat(screenData.num / 100),
      operator: screenData.operator,
      prevNum: parseFloat(screenData.prevNum),
    };
    setScreenData(tempData);
  };

  return (
    <div className="App">
      <>
        <div className="calculator">
          <div className="display-box">
            <input
              type="text"
              value={
                screenData.num === "" && screenData.prevNum !== ""
                  ? screenData.operator
                  : screenData.num
              }
            />
          </div>
          <div className="button-box">
            {btnValues.flat().map((btn, i) => {
              return (
                <button
                  className={btn === "=" ? "equal-sign" : btn === "C"
                  ? "all-clear" : ""}
                  value={btn}
                  onClick={
                    btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                      ? invertClickHandler
                      : btn === "+" || btn === "-" || btn === "X" || btn === "/"
                      ? operatorClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn === "."
                      ? commaClickHandler
                      : btn >= 0 && btn <= 9
                      ? numClickHandler
                      : percentClickHandler
                  }
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
