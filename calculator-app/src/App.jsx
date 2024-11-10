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
console.log(num.oper)
  }
  const formatResult = (result) => {
    return Number(result).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const handleEqual = (e) => {
      e.preventDefault();

      switch(num.oper){
        case '+':
        num.b > 0 && num.a > 0? 
         setNum({
          ...num,
          a: 0,
          oper: null,
          res: Number(num.b) + Number(num.a) 
        }) : setNum({
          a: 0,
          b: 0,
          oper: num.oper,
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

  const handleReset = (e) => {
        e.preventDefault();

    setNum({
       ...num,
        a: 0,
        oper: null,
        res: 0
    })
  }
  const handlePercent = (e) => {
      e.preventDefault();

      num.a === 0  || num.a === '0' ? 
      setNum({
        a:  num.b === 0 || num.b === '0' ? 0 : num.a / Math.pow(100,1) ,
        b: 0,
        oper: num.oper,
        res: num.res > 0 ? Number(formatResult(num.res)) / 100 : num.res
    }) : setNum({
        a: num.a.toString().length < 8 ? Number(formatResult(num.a)) / 100 : 0,
        oper: num.oper,
        b: 0,
        res: 0
      })
  }

  const handleInvert  = (e) => {
      e.preventDefault();

      setNum({
        ...num, 
        a:  -num.a,
        res: -num.res
      })
  }

  const handleDot = (e) => {
    e.preventDefault();

    !/\./.test(num.a) ?
      setNum( {
          ...num,
          a: num.a + '.'
      }) : num.a
  }

  return (
    <div className='App'>
      <h1>Calculator</h1>
        <div className='appShadow'>
        <ScreenView
          value={
        num.a ? formatResult(num.a) : formatResult(num.res) 
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
            : handleClick( e, btn)
          }}
        />
        )
        })}
      </div>
        </div>
    </div>
  );
}

export default App;
