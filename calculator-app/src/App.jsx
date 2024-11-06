import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { ScreenView } from './components/Screen';


function App() {

  const [num , setNum] = useState(
    {
      a: 0,
      b: 0,
      oper: null,
      res: 0
    }
    )
  const btns = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  const handleClick = (value) => {
    num.a === 0 ? 
      setNum({
        ...num,
        a: num.a = value
      })
      : setNum({
        ...num,
        a: num.a + '' + value
      })
        console.log(num)
  }

  const handleOperation = (value) => {
      num.oper === null || num.oper !== null ? 
      setNum({
         ...num,  
          oper: num.oper = value ,
         b: num.b = num.a,
          a: num.a = 0
      })
      : console.log(num.a)

  }

  const handleEqual = (value) => {
    if(value === '=' && num.oper === '+'){
      setNum({
        ...num,
          res: num.res = Number(num.b) + Number(num.a)
      })
    console.log(num)
    }
  }


  return (
    <div className='App'>
      <h1>Calculator</h1>
        <ScreenView
          value={
          num.a && num.b === 0 
          ? num.a
          : num.a > 0 && num.oper === '+'
          ? num.a
          :console.log('d')
          }
        
   
        />
      <div className='btnBorder'>
        {btns.flat().map((btn) => {
        return (
        <Button
        key={btn}  
        className={btn === "=" ? "equals" : "Btn"}
         value={btn} 
        onBtnClick={() => {
          btn === "C"
            ? resetClickHandler
            : btn === "+-"
              ? invertClickHandler
              : btn === "%"
                ? percentClickHandler
                : btn === "="
                  ? handleEqual(btn)
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? handleOperation(btn)
                    : btn === "."
                      ? commaClickHandler
                      : handleClick(btn)
          }}
        />
        )
        })}
      </div>
    </div>
  );
}

export default App;
