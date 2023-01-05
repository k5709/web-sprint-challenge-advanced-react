import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {

  const initialGrid = [
    [1, 1], [2, 1], [3, 1],
    [1, 2], [2, 2], [3, 2],
    [1, 3], [2, 3], [3, 3]
  ]

  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('')
  const [index, setIndex] = useState(4);
  const [steps, setSteps] = useState(0);
  const [grid, setGrid] = useState(initialGrid)



  function getXY(grid) {
    return grid[index]
  }

  function getXYMessage(grid) {
    if (index === 6) {
      return (`(${(grid[6])})`)

    } else if (index === 7) {
      return (`(${(grid[7])})`)

    } else if (index === 8) {
      return (`(${(grid[8])})`)
    }
    //middle three
    else if (index === 3) {
      return (`(${(grid[3])})`)

    } else if (index === 4) {
      return (`(${(grid[4])})`)

    } else if (index === 5) {
      return (`(${(grid[5])})`)
    }
    //top three
    else if (index === 0) {
      return (`(${(grid[0])})`)
    } else if (index === 1) {
      return (`(${(grid[1])})`)
    } else if (index === 2) {
      return (`(${(grid[2])})`)
    }
  }

  function reset(email) {
    setEmail(''), setIndex(4), setMessage(''), setSteps(0)
  }

  function getNextIndex(direction) {
    if (direction === 'up' && index !== 0 && index !== 1 && index !== 2) {
      setIndex(index - 3),
        setSteps(steps + 1)
    } else if (direction === 'left' && index !== 0 && index !== 3 && index !== 6) {
      setIndex(index - 1),
        setSteps(steps + 1)
    } else if (direction === 'down' && index !== 6 && index !== 7 && index !== 8) {
      setIndex(index + 3),
        setSteps(steps + 1)
    } else if (direction === 'right' && index !== 2 && index !== 5 && index !== 8) {
      setIndex(index + 1),
        setSteps(steps + 1)
    } else setMessage(`You can't go ${direction}`)
  }

  function onChange(evt) {
    setEmail(evt.target.value)
    return email
  }


  function onSubmit(event) {
    event.preventDefault()
    const motherLoad = {
      "x": getXY(grid)[0],
      "y": getXY(grid)[1],
      "steps": steps,
      "email": email
    }
    axios.post('http://localhost:9000/api/result', motherLoad)
      .then(response => {
        setMessage(response.data.message);
        console.log(message)
      }).catch(error => {
        setMessage(error.response.data.message);
      });
    setEmail('')
  }

  return (
    < div id="wrapper" className={props.className} >
      <div className="info">
        <h3 id="coordinates">Coordinates {getXYMessage(grid)}</h3>
        <h3 id="steps">You moved {steps} time{(steps === 1 ? null : 's')}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message" value={message}>{message}</h3>
      </div>
      <div id="keypad">
        <button data-testid='left' id="left" onClick={() => { getNextIndex('left') }}>LEFT</button>
        <button data-testid='up' id="up" onClick={() => { getNextIndex('up') }}>UP</button>
        <button data-testid='right' id="right" onClick={() => { getNextIndex('right') }}>RIGHT</button>
        <button data-testid='down' id="down" onClick={() => { getNextIndex('down') }}>DOWN</button>
        <button data-testid='reset' id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input data-testid="email" onChange={onChange} value={email} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit" onClick={onSubmit}></input>
      </form>
    </div >
  )
}
