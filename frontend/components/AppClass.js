
import React from 'react'
import { useState } from 'react';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    console.log('constructor ran')
    super()

    const URL = `http://localhost:9000/api/result`

    const initialGrid = [
      [1, 1], [2, 1], [3, 1],
      [1, 2], [2, 2], [3, 2],
      [1, 3], [2, 3], [3, 3]
    ]


    const initialState = {
      message: '',
      email: '',
      index: 4,
      steps: 0,
    }
    this.state = initialState
  }

  getXY = (initialGrid) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return initialGrid[this.state.index]
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `(${this.getXY(initialGrid)[0]}, ${this.getXY(initialGrid)[1]})`
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    console.log('reset button clicked')
    this.setState({
      ...this.state,
      message: '',
      email: '',
      index: 4,
      steps: 0,
    })
  }

  getNextIndex = (direction) => {
    console.log('button clicked')
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if (direction === 'up' && this.state.index !== 0 && this.state.index !== 1 && this.state.index !== 2) {
      this.setState({
        ...this.state,
        index: this.state.index - 3,
        steps: this.state.steps + 1
      })
    } else if (direction === 'left' && this.state.index !== 0 && this.state.index !== 3 && this.state.index !== 6) {
      this.setState({
        ...this.state,
        index: this.state.index - 1,
        steps: this.state.steps + 1
      })
    } else if (direction === 'down' && this.state.index !== 6 && this.state.index !== 7 && this.state.index !== 8) {
      this.setState({
        ...this.state,
        index: this.state.index + 3,
        steps: this.state.steps + 1
      })
    } else if (direction === 'right' && this.state.index !== 2 && this.state.index !== 5 && this.state.index !== 8) {
      this.setState({
        ...this.state,
        index: this.state.index + 1,
        steps: this.state.steps + 1
      })
    } else {
      return 'you cannot move further'
    }
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({
      ...this.state,
      input: evt.target.value
    })
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.

  }

  render() {
    console.log('render ran')
    console.log(this.state)
    console.log(this.state.grid)
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.getXYMessage}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => { this.getNextIndex('left') }}>LEFT</button>
          <button id="up" onClick={() => { this.getNextIndex('up') }}>UP</button>
          <button id="right" onClick={() => { this.getNextIndex('right') }}>RIGHT</button>
          <button id="down" onClick={() => { this.getNextIndex('down') }}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
