import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';


function App() {

  const [a, setA] = useState(0);
  const [b , setB] = useState(0);
  const [disabled, setDisabled] = useState(true);

  const handleClick = (e) => {
    const key = e.target;
  console.log('click')
  }

  return (
    <div className='App'>
      <h1>Calculator</h1>
      <div className='shadow'>
        <div
          className='view'
          style={{ color: 'white', fontSize: 70, fontWeight: 'bolder', backgroundColor: 'black' }}
        >{a}</div>
        <div className='btnPad' style={{ backgroundColor: 'black', }}>
          <div className='rowOne'>
            <Button style={{ width: 211.5 }} value={'CE'} onBtnClick={handleClick}></Button>
            <Button value={'C'} onBtnClick={handleClick}></Button>
            <Button value={'÷'} onBtnClick={handleClick}></Button>
          </div>
          <div className='rowTwo'>
            <Button value={7} onBtnClick={handleClick} ></Button>
            <Button value={8} onBtnClick={handleClick}></Button>
            <Button value={9} onBtnClick={handleClick}></Button>
            <Button value={'x'} onBtnClick={handleClick}></Button>
          </div>
          <div className='rowThree'>
            <Button value={4} onBtnClick={handleClick}></Button>
            <Button value={5} onBtnClick={handleClick}></Button>
            <Button value={6} onBtnClick={handleClick}></Button>
            <Button value={'-'} onBtnClick={handleClick}></Button>
          </div>
          <div className='rowFour'>
            <Button value={1} onBtnClick={handleClick}></Button>
            <Button value={2} onBtnClick={handleClick}></Button>
            <Button value={3} onBtnClick={handleClick}></Button>
            <Button value={'+'} onBtnClick={handleClick}></Button>
          </div>
          <div className='rowFive'>
            <Button value={'+/-'} onBtnClick={handleClick}></Button>
            <Button value={0} onBtnClick={handleClick}></Button>
            <Button value={'.'} onBtnClick={handleClick}></Button>
            <Button value={'='} onBtnClick={handleClick}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
