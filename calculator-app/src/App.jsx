import { useState, useEffect } from 'react';
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
  const [num, setNum] = useState({
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
//logic needed to continuously add a number before operation is performed
    num.a.length > 8 || num.a === 0 ?
      setNum({
        ...num,
        a: num.a === 0 ? value : num.a
      })
      : setNum({
        ...num,
        a: num.a + '' + value
      }) 
  };
  // Event to handle operation needed to evaluate numbers
  const handleOperation = (e, value) => {
    e.preventDefault();
    setNum((prevNum) => ({
      ...prevNum,
      oper: value,
      a: 0,
      b: prevNum.a !== 0 ? prevNum.a : prevNum.res
    }));
  };

  const formatResult = (result) => {
    return Number(result).toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
//Logic once user press equal switch case used instead of if...statement for better performance and readability
  const handleEqual = (e) => {
    e.preventDefault();
    const calculateResult = (operation) => {
      switch(operation) {
        case '+':
          return Number(num.b) + Number(num.a);
        case '-':
          return Number(num.b) - Number(num.a);
        case 'X':
          return Number(num.b) * Number(num.a);
        case '/':
          return Number(num.b) / Number(num.a);
        default:
          return num.res;
      }
    };
//Logic to continue operation after equal has been pressed
    const result = calculateResult(num.oper);
    setNum({
      ...num,
      a: 0,
      b: 0,
      oper: null,
      res: result,
    });
    console.log(num);
  };
//Reset numbers to 0 and operation null
  const handleReset = (e) => {
    e.preventDefault();
    setNum({
      ...num,
      a: 0,
      oper: null,
      res: 0,
    });
  };
  const handlePercent = (e) => {
    e.preventDefault();
    setNum({
      a: num.a === 0 || num.a === '0' ? 0 : Number(formatResult(num.a)) / 100,
      b: 0,
      oper: num.oper,
      res: num.res > 0 ? Number(formatResult(num.res)) / 100 : num.res,
    });
  };
//Used to add/remove '-' 
  const handleInvert = (e) => {
    e.preventDefault();
    setNum({
      ...num,
      a: -num.a,
      res: -num.res,
    });
  };
//Used to add decimal to number
  const handleDot = (e) => {
    e.preventDefault();
    if(!/\./.test(num.a)) {
      setNum({
        ...num,
        a: num.a + '.',
      });
    }
    console.log(num.a);
  };

//Used to update fontsize 
  useEffect(() => {
    const resLength = num.a ? num.a.toString().length : num.res.toString().length;
    if(resLength < 11) {
      setFontSize('4rem');
    } else {
      setFontSize('2.5rem');
    }
  }, [num.a, num.res]);

  return (
    <div className='App'>
      <h1>Calculator</h1>
      <div className='appShadow'>
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
          {btns.flat().map((btn) => {
            return (
        //List of Buttons 
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
                    : handleClick(e, btn);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
