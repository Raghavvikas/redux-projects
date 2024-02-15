import React, { Fragment, useEffect, useState, useRef } from "react";

function Solution() {
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [pause, setPause] = useState(false);
  const interval = useRef();

  const handleStart = () => {
    // debbuger;
    if (minute === 0 && second === 0) {
      clearInterval(interval.current);
      setPause(true);
      return;
    }
    if (second === 0 || second < 0) {
      if (minute === 0) {
        clearInterval(interval.current);
        setPause(true);
        return;
      }
      setMinute((prevMinute) => prevMinute - 1);
      setSecond(59);
    } else {
      setSecond((prevSecond) => prevSecond - 1);
    }

    setPause(false); // Set pause to false when timer starts
  };

  const handlePause = () => {
    clearInterval(interval.current);
    setPause(true);
  };
  const handleResume = () => {
    handleStart();
  };

  const handleReset = () => {
    clearInterval(interval.current);
    setMinute(0);
    setSecond(0);
    setPause(true);
  };

  useEffect(() => {
    if (pause === false) {
      interval.current = setInterval(() => {
        handleStart();
      }, 1000);
    }

    return () => clearInterval(interval.current);
  }, [handleStart]);

  return (
    <Fragment>
      <label>
        <input
          type="number"
          name="minute"
          value={minute}
          onChange={(e) => setMinute(parseInt(e.target.value))}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          name="second"
          value={second}
          onChange={(e) => setSecond(parseInt(e.target.value))}
        />
        Seconds
      </label>

      <button onClick={handleStart}>START</button>
      <button onClick={handlePause} disabled={pause}>
        PAUSE
      </button>
      <button
        onClick={handleResume}
        disabled={!pause || (minute === 0 && second === 0)}
      >
        RESUME
      </button>
      <button onClick={handleReset}>RESET</button>

      <h1 data-testid="running-clock">
        {minute < 10 ? "0" + minute : minute}:
        {second < 10 ? "0" + second : second}
      </h1>
    </Fragment>
  );
}

export default Solution;
