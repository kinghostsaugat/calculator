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
    num: 0, operator: "", prevNum: 0
  });

  const resetClickHandler = () => {
    setScreenData({
      num: 0,
      operator: "",
      prevNum: 0
    });
  };


  const invertClickHandler = () =>{
    
  }



  const numClickHandler = (e) => {
    const newNum = { 
      num: parseInt(screenData.num+e.target.value), 
      operator: screenData.operator, 
      prevNum: parseInt(screenData.prevNum)}
    setScreenData(newNum);
  }

  const operatorClickHandler = (e) => {

    screenData.operator === "" 
    ?setScreenData({
        num: "",
        operator: e.target.value,
        prevNum: parseInt(screenData.num)
      })
    : equalsClickHandler(e);
  }

  const equalsClickHandler = (e) => {
    let equals;

    screenData.operator === "+"
    ?equals = parseInt(screenData.prevNum) + parseInt(screenData.num)
    :screenData.operator === "-"
    ? equals = parseInt(screenData.prevNum) - parseInt(screenData.num)
    :screenData.operator === "X"
    ? equals = parseInt(screenData.prevNum) * parseInt(screenData.num)
    :screenData.operator === "/"
    ? equals = parseInt(screenData.prevNum) / parseInt(screenData.num)
    :equals = parseInt(screenData.num)
    
    let temp2 = {
      num: equals,
      operator: e.target.value === "="? "" :e.target.value,
      prevNum: ""
    }
    setScreenData(temp2);
  }

  return (
    <div className="App">
      <>
      <br /> &nbsp;
        <input value={screenData.num === "" ? screenData.operator : screenData.num} />
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
                  :btn === "+-" 
                  ? invertClickHandler
                  : btn === "+" || btn === "-" || btn === "X" || btn === "/"
                  ? operatorClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn >= 0 && btn <= 9
                  ? numClickHandler
                : null }>
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
