import React, { useState, useRef } from "react";

function UpplerTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const [displayTime, setDisplayTime] = useState("00:00");

  const startClock = () => {
    console.log("startttt");
    const newTotalSeconds = minutes * 60 + seconds;
    setTotalSeconds(newTotalSeconds);
    setPaused(false);

    intervalRef.current = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) => {
        if (prevTotalSeconds <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        if (!paused) {
          console.log("object");
          return prevTotalSeconds - 1;
        }
        return prevTotalSeconds;
      });
    }, 1000);
    console.log(
      minutes,
      seconds,
      totalSeconds,
      paused,
      newTotalSeconds,
      "starttttt"
    );
  };

  const updateDisplay = () => {
    const minutesDisplay = Math.floor(totalSeconds / 60);
    const secondsDisplay = totalSeconds % 60;
    const formattedTime = `${String(minutesDisplay).padStart(2, "0")}:${String(
      secondsDisplay
    ).padStart(2, "0")}`;
    setDisplayTime(formattedTime);
  };

  const pauseResumeClock = () => {
    setPaused((prevState) => !prevState);
  };

  const resetClock = () => {
    clearInterval(intervalRef.current);
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
    setPaused(false);
    setDisplayTime("00:00");
  };

  return (
    <div>
      <h1 data-testid="running-clock">{displayTime}</h1>
      <div>
        <label htmlFor="minutes">Minutes: </label>
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(+e.target.value)}
        />
        <label htmlFor="seconds">Seconds: </label>
        <input
          type="number"
          id="seconds"
          value={seconds}
          onChange={(e) => setSeconds(+e.target.value)}
        />
      </div>
      <button onClick={startClock}>Start</button>
      <button onClick={pauseResumeClock}>{paused ? "Resume" : "Pause"}</button>
      <button onClick={resetClock}>Reset</button>
    </div>
  );
}

export default UpplerTimer;
