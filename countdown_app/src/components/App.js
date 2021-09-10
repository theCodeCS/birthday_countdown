import React, {useEffect, useState} from "react";

function App() {

  // const [days, setDays] = useState(0);
  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [inputText, setText] = useState("");

  const [timeOn, setTimeOn] = useState(false);

  // let interval = useRef(null);

  const handleChange = e => {
    setText(e.target.value)
  }

  useEffect(() => {
      const birthday = new Date(inputText.toString()).getTime();

      if (timeOn){
  
      const interval = setInterval(() => {
         
        let currentTime = new Date().getTime();
        let difference = birthday - currentTime;
  
        // setDays(days)
        // setHours(hours)
        // setMinutes(minutes)
        // setSeconds(seconds)

        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
        
      }, 1000);
      return () => clearInterval(interval)
      }
  }, [timeOn])

  function resetAll() {
    setTimeOn(false);
    setText("");
    // setDays(0);
    // setHours(0);
    // setMinutes(0);
    // setSeconds(0);
    setTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  }

  
  return (
    <div className="container">
      <h1>How Many More Days Till Your Birthday?</h1>
      <h2>Date</h2>
      <h2>{inputText}</h2>
       <div className="timeContainer">
         <h2>
           {time.days > 0 && <span>{time.days}d </span>}
           {time.hours > 0 && <span>{time.hours}h </span>}
           {time.minutes > 0 && <span>{time.minutes}m </span>}
           {time.seconds > 0 && <span>{time.seconds}s</span>}
          </h2>
       </div>
       <div>
        <input type="text" value={inputText} onChange={handleChange} placeholder="ex: Jan 2, 2022"/> <br></br>
        <button onClick={() => setTimeOn(true)}>See How Much Longer!</button>
        <button onClick={() => setTimeOn(false)}>Stop Countdown</button>
        <button onClick={() => resetAll()}>Reset</button>
       </div>
       

    </div>
  );
}

export default App;
