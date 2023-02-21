import React from 'react';
import { render, screen, within } from '@testing-library/react';
// Outside the braces = "default export"; inside = other exports
import userEvent from '@testing-library/user-event';
import MyMenu, {getAverageRating, PrintedMenu, FoodMap, TEXT_ratingText_accessible_name, TEXT_inputRating_accessible_name, TEXT_submit_button_accessible_name,TEXT_submit_button_text} from '../components/pages/Menu';
import Ratty from '../components/pages/Ratty';
import exp from 'constants';
// import output from './Terminal';

//Test submit button is rendered
test('renders submit button', () => {  
  render(<PrintedMenu input={['arsenic', '0']} key={1} diningHall = {'Andrews'}/>)
  const buttonElement = screen.getByText(TEXT_submit_button_text);
  expect(buttonElement).toBeInTheDocument;
});

//Test input field is rendered 
test('renders rating input fields', () => {
  render(<PrintedMenu input={['arsenic', '0']} key={1} diningHall = {'Andrews'}/>)
  const input = screen.getByRole("textbox", {name: TEXT_inputRating_accessible_name})
  expect(input).toBeInTheDocument
});

//Test Input fields render and can submit
test('renders guess input fields', () => {

  let mockInput: string[][] = [['arsenic', '0'], ['cyanide', '0'], ['hemlock', '0']]
  let dining: string = 'Andrews'

  render(<PrintedMenu input={mockInput[0]} key={1} diningHall = {dining}/>)
  const input = screen.getByRole("textbox", {name: TEXT_inputRating_accessible_name})
  expect(input).toBeInTheDocument
  const buttonElement = screen.getByText(TEXT_submit_button_text);
  expect(buttonElement).toBeInTheDocument;  
  const rating = "5"
  userEvent.type(input, rating)
  userEvent.click(buttonElement)
  setTimeout(() => {
  expect(FoodMap.get('arsenic')).toEqual('5')
  },200)
  
  //two different ratings input
  const rating2 = "3"
  userEvent.type(input, rating2)
  userEvent.click(buttonElement)
  setTimeout(() => {
    expect(FoodMap.get('arsenic')).toEqual('4')
    },100)
  
});

//Test Input fields render and can submit
test('renders guess input fields', () => {

  let mockInput: string[][] = [['arsenic', '0'], ['cyanide', '0'], ['hemlock', '0']]
  let dining: string = 'Ratty'

  render(<PrintedMenu input={mockInput[1]} key={1} diningHall = {dining}/>)
  const input = screen.getByRole("textbox", {name: TEXT_inputRating_accessible_name})
  expect(input).toBeInTheDocument
  const buttonElement = screen.getByText(TEXT_submit_button_text);
  expect(buttonElement).toBeInTheDocument;  
  const rating = "5"
  userEvent.type(input, rating)
  userEvent.click(buttonElement)
  setTimeout(() => {
  expect(FoodMap.get('cyanide')).toEqual('5')
  },200)
});


//Test Average Rating Function
test('tests average rating', () => {
  let myMap : Map<string, string> = new Map()
  myMap.set("pain", "4")
  myMap.set("sadness", "2")
  expect(getAverageRating(myMap, true)).toBe(3)
});

// test function again
test('test average rating again', () => {
  let mockMap: Map<string, string> = new Map()
  mockMap.set("tragedy", '3')
  expect(getAverageRating(mockMap, true)).toBe(3)
});

function createWord(num: number): string{
  let word = ""
  for (let i = 0; i < num; i++){
    word+= "s"
  }
  return word
}

// fuzz testing that function works with all numbers
test('random testing', () => {
  let mockMap: Map<string, string> = new Map()
  let randomSize = Math.random()*50
  for (let i =0; i< randomSize; i++){
    let value = Math.random()*100
    mockMap.set(createWord(i), value.toString())
  }
  expect(getAverageRating(mockMap, true) >= 0).toBe(true)
  expect(getAverageRating(mockMap, true) <= 100).toBe(true)
});

// fuzz testing with values we would recieve
test('random testing', () => {
  let mockMap: Map<string, string> = new Map()
  let randomSize = Math.random()*200
  for (let i =0; i< randomSize; i++){
    let value = Math.round(Math.random()*5)
    mockMap.set(createWord(i), value.toString())
  }
  let rating = getAverageRating(mockMap, true)
  console.log(rating.toString())
  expect(getAverageRating(mockMap, true) >= 0).toBe(true)
  expect(getAverageRating(mockMap, true) <= 5).toBe(true)
});