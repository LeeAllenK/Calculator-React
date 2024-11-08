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
        a:  value
      })
      : setNum({
        ...num,
        a: num.a + '' + value
      })
        console.log(num)
  }
//FIX OPERFUNCTION
  const handleOperation = (value ) => {

      num.oper === null ? 
      setNum({
         ...num,  
          oper:  value ,
         b: num.a,
          a: 0
      })
      : setNum({
        ...num,
        oper: value,
        a: num.b + num.a
      })
  }

  const handleEqual = () => {

      switch(num.oper){
        case '+' :
            
         setNum({
          ...num,
          res: Number(num.b) + Number(num.a)
        })
        break;
        case '-' :
          setNum({
            ...num,
            res: Number(num.b) - Number(num.a)
          })
        break;
        case 'X' :
          setNum({
            ...num,
            res: Number(num.b) * Number(num.a)
          })
        break;
        case '/' :
          setNum({
            ...num,
            res: Number(num.b)/Number(num.a)
          })
        break;
        default: num.a
      }
  }

  const handleReset = () => {
      setNum({
        ...num,
          a: 0,
          oper: null,
          res: 0
    })
  }

  const handleInvert  = () => {
      setNum({
        ...num, 
        a:  -num.a
      })
      
  }
  return (
    <div className='App'>
      <h1>Calculator</h1>
        <ScreenView
          value={
          num.b === 0
          ? num.a
          : num.b > 0 && num.a >= 0 && num.res === 0
          ? num.a
          : num.res > 0 ? num.res : num.res 
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
            ? handleReset()
            : btn === "+-"
              ? handleInvert()
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
