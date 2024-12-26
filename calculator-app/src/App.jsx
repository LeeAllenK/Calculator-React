import { useState, useEffect, useReducer} from 'react';
import './App.css';
import { Buttons } from './components/Buttons.jsx';
import { ScreenView } from './components/Screen';
import {tasksReducer} from './tasksReducer.jsx';
import {Clock} from './components/Clock.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

import Home from './components/Home'

const btns = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
//Function format for decimal
  export const formatResult = (result) => {
    return Number(result).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

function App() {
  const [num, dispatch] = useReducer(tasksReducer,{
    a: 0,
    b: 0,
    oper: null,
    res: 0,
  });
//State used to update fontsize
  const [fontSize, setFontSize] = useState('4rem');
//When a number is clicked displays value onto screen 
  const handleClick = (e, value) => {
    e.preventDefault();   
    dispatch({
      type: 'display_numbers',
      a: value,
    })
  };
//Converts number to decimal 
  const handlePercent = (e) => {
    e.preventDefault();
    dispatch({
      type: 'percent',
      a: num.a,
      b: 0,
      oper: num.oper,
      res: num.res 
    });
  };
//Reset numbers and result to 0 and operation null
  const handleReset = (e) => {
    e.preventDefault();
      console.log(num.a)
    dispatch({
      type: 'reset',
      a: 0,
      b: 0,
      oper: null,
      res: 0,
    });
  };
  // Add operation
  const handleOperation = (e, value) => {
    e.preventDefault();
    dispatch({
      type: 'add_operation',
      oper: value,
      a: 0,
      b: num.a
    })
  };
//Used to evalute
  const handleEqual = (e , operation) => {
    e.preventDefault();
    dispatch({
      type: 'equal',
      oper: operation,
      a: 0,
      b: num.b,

    })
  };
//Used to add/remove '-' 
  const handleInvert = (e) => {
    e.preventDefault();
    dispatch({
     type: 'invert',
      a: num.a,
      res: num.res,
    });
  };
//Used to add decimal to number
  const handleDot = (e) => {
    e.preventDefault();
    if(!/\./.test(num.a)) {
      dispatch({
        type: 'dot',
        a: num.a ,
      });
    }
  };
//Used to update fontsize once a certain length has been reached
  useEffect(() => {
    const resLength = num.a ? num.a.toString().length : num.res.toString().length;
    if(resLength < 11) {
      setFontSize('4rem');
    } else {
      setFontSize('2.5rem');
    }
  }, [num.a, num.res]);
  return (
    <>  
      <Home/>
    <div className='App'>
      <h1>Calculator</h1>
      <div className='appShadow'>
        <div className='Box'>
        <Clock/>
        <div className='iconBox'>
          <FontAwesomeIcon icon={faWifi} style={{ color:'white' }} />
          <FontAwesomeIcon icon={faBatteryFull} style={{color:'white'}}/>
        </div>
        </div>
        <ScreenView
//Logic to account for state being updated
          value={num.a ? formatResult(num.a) : formatResult(num.res)}
          style={{
            color: 'white',
            fontSize: fontSize,
            fontWeight: 'bolder',
          }}
        />
        <div className='btnBorder'>
          {btns.flat().map((btn,index) => {
            return (
        //List of Buttons 
              <Buttons
                 key={btn}
                 className={`${btn === "=" ? "equals" : "Btn"}`}
                 value={btn}
                 onBtnClick={(e) => {
                   btn === "C"
                    ? handleReset(e)
                    : btn === "+-"
                    ? handleInvert(e)
                    : btn === "%"
                    ? handlePercent(e, btn)
                    : btn === "="
                    ? handleEqual(e, btn)
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? handleOperation(e, btn)
                    : btn === "."
                    ? handleDot(e)
                    : handleClick(e, btn);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
export default App;
