import React from "react";
import {Observable} from "rxjs";
import './App.css';

function Second({time}){
  return (
      <h2>{new Date(time * 1000).toISOString().substr(11, 8)}</h2>
  )
}

function App() {
    let clickTimeout = null
    const [time, setTime] = React.useState(0)
    const [active, setActive] = React.useState(true)
    const [obs, setObs] = React.useState(null)

    let observable = new Observable(subscriber => {
            setInterval(() => {
                subscriber.next()
            }, 1000)
    })

    function start(){
        if(active) setObs(observable.subscribe(setTime.bind(null, prev => prev + 1)))
        setActive(false)
    }

    function stop() {
        if(obs) obs.unsubscribe()
        setActive(true)
        setTime(0)
    }
    function wait() {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
            clickTimeout = null;
            if(obs) obs.unsubscribe()
            setActive(true)
        } else {
            clickTimeout = setTimeout(() => {
                clickTimeout = null;
            }, 300);
        }
    }
    function reset() {
        setTime(0)
        if(obs) obs.unsubscribe()
        setObs(observable.subscribe(setTime.bind(null, prev => prev + 1)))
        setActive(false)
    }

  return (
    <div className='center'>
        <Second time={time}/>
        <div >
            <button onClick={() => start()}>Start</button>
            <button onClick={() => stop()}>Stop</button>
            <button onClick={() => wait()}>Wait</button>
            <button onClick={() => reset()}>Reset</button>
        </div>
    </div>
  )
}

export default App;
