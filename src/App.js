import React, { useState, useEffect } from 'react';
import IncDec from './IncDec';
import CurrentTime from './CurrentTime';

function App() {
  const [type, setType] = useState("session")
  const [length, setLength] = useState({
    break: 5,
    session: 25
  })
  const [current, setCurrent] = useState({
    currMin: length.session,
    currSec: 0
  })
  const [intervalId, setIntervalId] = useState(null);

  let changeTime = (type, incDec) => {
    let newTime = (incDec === 'inc' ? length[type] + 1 : length[type] - 1)

    if (newTime <= 0) {
      return null;
    }

    setLength({
      ...length,
      [type]: newTime
    })
  }

  useEffect(() => {
    setCurrent({
      ...current,
      currMin: length.session
    })
  }, [length.session])

  useEffect(() => {
    const { currSec, currMin } = current;
    if (currSec === 0 && currMin === 0) {
      let newType = type === 'session' ? "break" : 'session'
      setType(newType)
      setCurrent({
        currMin: length[newType],
        currSec: 0
      })
    }
  }, [current])

  let tick = () => {
    setCurrent((current) => {
      const { currMin, currSec } = current;
      if (currSec === 0) {
        return {
          currMin: currMin - 1,
          currSec: 59
        }
      } else {
        return {
          ...current,
          currSec: currSec - 1
        }
      }})
  }

  let startTimer = () => {
    setIntervalId(setInterval(tick, 1000));
  }

  let stopTimer = () => {
    clearInterval(intervalId);
  }

  let reset = () => {
    clearInterval(intervalId);
    setLength({
      break: 5,
      session: 25
    })
    setCurrent({
      currMin: length.session,
      currSec: 0
    })
  }

  return (
    <div className="App">
      <div>
        <p>Break Length:</p>
        <p>{length.break} Minutes</p>
        <IncDec type="break" change={changeTime} incDec="inc" />
        <IncDec type="break" change={changeTime} incDec="dec" />
      </div>
      <div>
        <p>Session Length:</p>
        <p>{length.session} Minutes</p>
        <IncDec type="session" change={changeTime} incDec="inc"/>
        <IncDec type="session" change={changeTime} incDec="dec" />
      </div>
      <CurrentTime type={type} current={current} />
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Pause</button>
      <button onClick={reset}>Reset</button>
      <h1>Current Activity: {type}</h1>
    </div>
  );
}

export default App;
