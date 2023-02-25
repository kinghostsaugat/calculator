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
    prevNum: 0,
  });

  const resetClickHandler = () => {
    setScreenData({
      num: 0,
      operator: "",
      prevNum: 0,
    });
  };

  const invertClickHandler = () => {
    let temp = 0 - parseFloat(screenData.num);
    setScreenData({num:temp, operator:screenData.operator,prevNum:screenData.prevNum})
  };

  const numClickHandler = (e) => {
    const newNum = {
      num: screenData.num + e.target.value,
      operator: screenData.operator,
      prevNum: parseFloat(screenData.prevNum),
    };
    setScreenData(newNum);
  };

  const operatorClickHandler = (e) => {
    screenData.operator === ""
      ? setScreenData({
          num: "",
          operator: e.target.value,
          prevNum: parseFloat(screenData.num),
        })
      : equalsClickHandler(e);
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
      num: equals,
      operator: e.target.value === "=" ? "" : e.target.value,
      prevNum: "",
    };
    setScreenData(temp2);
  };

  const commaClickHandler = (e) => {
    //convert to array
    let decimalNum;
    let numToArr = String(screenData.num)
      .split("");
      numToArr.includes(".")
      ? decimalNum = screenData.num
      : decimalNum = screenData.num + "."
      setScreenData({
        num: decimalNum,
        // ...screenData,
        operator:screenData.operator,
        prevNum:screenData.prevNum
      });
  };

  return (
    <div className="App">
      <>
        <br /> &nbsp;
        <input
        type="text"
          value={screenData.num === "" ? screenData.operator : screenData.num}
        />
        <br /> &nbsp;
        <div className="button-box">
          {btnValues.flat().map((btn, i) => {
            return (
              <button
                key={i}
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
                    : null
                }
              >
                {btn}
              </button>
            );
          })}
        </div>
      </>
    </div>
  );
}

export default App;
