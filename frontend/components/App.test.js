import React from 'react'
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/react'
import AppFunctional from "./AppFunctional"

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})
//test 1 //
test('render without errors', () => {
  render(<AppFunctional />)
})

beforeEach(() => {
  render(<AppFunctional />)
})
//test 2
test('renders left button', () => {
  const left = expect(screen.getByTestId("left"))
  expect(left).toBeInTheDocument
  expect(left).toBeVisible
})
//test 3
test('render right button', () => {
  const right = expect(screen.getByTestId("right"))
  expect(right).toBeInTheDocument
  expect(right).toBeVisible
})
//test 4
test('render up button', () => {
  const up = expect(screen.getByTestId("up"))
  expect(up).toBeInTheDocument
  expect(up).toBeVisible
})
//test 5
test('render down button', () => {
  const down = expect(screen.getByTestId("down"))
  expect(down).toBeInTheDocument
  expect(down).toBeVisible
})
//test 6
test('render reset button', () => {
  const reset = expect(screen.getByTestId("reset"))
  expect(reset).toBeInTheDocument
  expect(reset).toBeVisible
})
//test 7
test('typing in the email input field', async () => {
  const email = expect(screen.getByTestId("email"))

  // fireEvent.change(email, { target: "test@mail.com" })
  // expect(email).toBe('test@mail.com')
  expect(email).toBeInTheDocument
})

//npm test "App.test.js" 