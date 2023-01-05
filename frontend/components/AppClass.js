import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor() {
    console.log('constructor ran')
    super()

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
      grid: initialGrid,
    }
    this.state = initialState
  }

  getXY = (grid) => {
    return grid[this.state.index]
  }

  getXYMessage = (grid) => {
    //bottom three 1
    if (this.state.index === 6) {
      return (`(${(this.state.grid[6])})`)
    } else if (this.state.index === 7) {
      return (`(${(this.state.grid[7])})`)
    } else if (this.state.index === 8) {
      return (`(${(this.state.grid[8])})`)
    }

    //middle three
    else if (this.state.index === 3) {
      return (`(${(this.state.grid[3])})`)
    } else if (this.state.index === 4) {
      return (`(${(this.state.grid[4])})`)
    } else if (this.state.index === 5) {
      return (`(${(this.state.grid[5])})`)
    }

    //top three
    else if (this.state.index === 0) {
      return (`(${(this.state.grid[0])})`)
    } else if (this.state.index === 1) {
      return (`(${(this.state.grid[1])})`)
    } else if (this.state.index === 2) {
      return (`(${(this.state.grid[2])})`)
    }
  }

  reset = () => {
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
    } else this.setState({ ...this.state, message: (`You can't go ${direction}`) })
  }

  onChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
    return email
  }

  onSubmit = (event) => {
    event.preventDefault()
    const motherLoad = {
      "x": this.getXY(this.state.grid)[0],
      "y": this.getXY(this.state.grid)[1],
      "steps": this.state.steps,
      "email": this.state.email
    }

    axios.post('http://localhost:9000/api/result', motherLoad)
      .then(response => {
        this.setState({ ...this.state, message: response.data.message });
        console.log(this.state.message)
      }).catch(error => {
        this.setState({ ...this.state, message: error.response.data.message })
      });
    this.setState({ ...this.state, email: '' })
  }



  render() {
    // console.log(this.state.grid)
    // console.log(this.state.index)
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXYMessage(this.state.grid)}</h3>
          <h3 id="steps">You moved {this.state.steps} time{(this.state.steps === 1 ? null : 's')}</h3>
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
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => { this.getNextIndex('left') }}>LEFT</button>
          <button id="up" onClick={() => { this.getNextIndex('up') }}>UP</button>
          <button id="right" onClick={() => { this.getNextIndex('right') }}>RIGHT</button>
          <button id="down" onClick={() => { this.getNextIndex('down') }}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit" onClick={this.onSubmit}></input>
        </form>
      </div>
    )
  }
}
