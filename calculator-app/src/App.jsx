import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { ScreenView } from './components/Screen';

  const btns = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

function App() {

  const [num , setNum] = useState(
    {
      a: 0,
      b: 0,
      oper: null,
      res: 0
    }
    )

  const handleClick = (e ,value) => {
    e.preventDefault();
    num.a <= 0 || num.a.length > 8 || num.a === '0'? 
      setNum({
        ...num,
        a: value
      })
      : setNum({
        ...num,
        a: num.a + '' + value
      }) 
      
      
  }

  const handleOperation = (e, value ) => {
      e.preventDefault();

      num.oper === null ? 
      setNum({
         ...num,  
        oper:  value ,
        b: num.a,
        a: 0
      })
      : setNum({
        ...num,
        oper: num.oper,
      })
  }

  const handleEqual = () => {

      switch(num.oper){
        case '+':
        num.b ? 
         setNum({
          ...num,
          a: 0,
          oper: null,
          res: Number(num.b) + Number(num.a) 
        }) : setNum({
          a: 0,
          b: 0,
          oper: null,
          res: num.a >= 0 ? Number(num.res) + Number(num.a) : 0
        })
            console.log(num)
        break;
        case '-':
          num.b ?
            setNum({
              ...num,
              a: 0,
              oper: null,
              res: Number(num.b) - Number(num.a)
            }) : setNum({
              a: 0,
              b: 0,
              oper: null,
              res: Number(num.res) - Number(num.a)
            })
          console.log(num)
        break;
        case 'X':
          num.b ?
            setNum({
              ...num,
              a: 0,
              oper: null,
              res: Number(num.b) * Number(num.a)
            }) : setNum({
              a: 0,
              b: 0,
              oper: null,
              res: Number(num.res) * Number(num.a)
            })
          console.log(num)
        break;
        case '/':
          num.b ?
            setNum({
              ...num,
              a: 0,
              oper: null,
              res: Number(num.b) / Number(num.a)
            }) : setNum({
              a: 0,
              b: 0,
              oper: null,
              res: Number(num.res) / Number(num.a)
            })
        break;
        default: num.oper
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
  const handlePercent = () => {

      num.a === 0  || num.a === '0'? 
      setNum({
        a:  num.b === 0 ? 0 : num.a / Math.pow(100,1) ,
        oper: num.oper,
        res: num.res / Math.pow(100,1)
    }) : setNum({
        a: num.a / Math.pow(100,1)
      })
    console.log(num)

  }

  const handleInvert  = () => {
      setNum({
        ...num, 
        a:  -num.a,
        res: -num.res
      })
  }
  return (
    <div className='App'>
      <h1>Calculator</h1>
        <ScreenView
          value={
        num.a ? num.a : num.res
          }
        />
      <div className='btnBorder'>
        {btns.flat().map((btn) => {
        return (
        <Button
        key={btn}  
        className={btn === "=" ? "equals" : "Btn"}
         value={btn} 
        onBtnClick={(e) => {
          btn === "C"
            ? handleReset()
            : btn === "+-"
            ? handleInvert()
            : btn === "%"
            ? handlePercent(btn)
            : btn === "="
            ? handleEqual(btn)
            : btn === "/" || btn === "X" || btn === "-" || btn === "+"
            ? handleOperation(e, btn)
            : btn === "."
            ? commaClickHandler
            : handleClick( e, btn)
          }}
        />
        )
        })}
      </div>
    </div>
  );
}

export default App;
