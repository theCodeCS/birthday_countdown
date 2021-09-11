import React, {useEffect, useState} from "react";
import Title from "./Title";
import "bootstrap/dist/css/bootstrap.min.css"
import {Button, FormControl, InputGroup} from "react-bootstrap"

function App() {

  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [inputText, setText] = useState({
    fname: "",
    userBirthDay: "",
  });

  const [timeOn, setTimeOn] = useState(false);

  const handleChange = e => {
    setText({
      ...inputText,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
      const birthday = new Date(inputText.userBirthDay).getTime();

      if (timeOn){
  
      const interval = setInterval(() => {
         
        let currentTime = new Date().getTime();
        let difference = birthday - currentTime;

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

    setText({
      fname: "",
      userBirthDay: ""
    });

    setTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })
  }

  
  return (
    <div className="container">
      <Title name={inputText.fname}/>
      {inputText.fname !== "" && <h2>{inputText.fname}, your birthday is:</h2>}
      <h2>{inputText.userBirthDay}</h2>
       <div className="timeContainer">
         <h2>
           {time.days > 0 && <span>{time.days}d </span>}
           {time.hours > 0 && <span>{time.hours}h </span>}
           {time.minutes > 0 && <span>{time.minutes}m </span>}
           {time.seconds > 0 && <span>{time.seconds}s</span>}
          </h2>
       </div>
       <div>
        <InputGroup className="mb-3">

          <InputGroup.Text>What's your name and birthday?</InputGroup.Text>
          <FormControl name="fname" type="text" value={inputText.fname} onChange={handleChange} placeholder="Your Name" />
          <FormControl name="userBirthDay" type="text" value={inputText.userBirthDay} onChange={handleChange} placeholder="ex: Jan 2, 2022" /> <br></br>
          
        </InputGroup>
        <Button className="button" variant="success" onClick={() => setTimeOn(true)}>See How Much Longer!</Button>
        <Button className="button" variant="warning" onClick={() => setTimeOn(false)}>Stop Countdown</Button>
        <Button className="button" variant="outline-danger" onClick={() => resetAll()}>Reset</Button>
       </div>
       

    </div>
  );
}

export default App;