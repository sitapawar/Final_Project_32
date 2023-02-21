import React from 'react';
import { render, screen, within } from '@testing-library/react';
// Outside the braces = "default export"; inside = other exports
import userEvent from '@testing-library/user-event';
import MyMenu, {PrintedMenu, FoodMap, TEXT_ratingText_accessible_name, TEXT_inputRating_accessible_name, TEXT_submit_button_accessible_name,TEXT_submit_button_text} from '../components/pages/Menu';
import Ratty from '../components/pages/Ratty';
import {NavBar, TEXT_Andrews_accessible_name, TEXT_Home_accessible_name, TEXT_Ratty_accessible_name, TEXT_Vdub_accessible_name} from '../components/NavBar';
import MyRouter from '../components/MyRouter';
import { BrowserRouter } from 'react-router-dom';

// import output from './Terminal';

//Test nav bar components are redered
test('render NavBar', () => {  
  render(<BrowserRouter>
    <NavBar /> <MyRouter/>
    </BrowserRouter>)
  const andrewsLink = screen.getByText(TEXT_Andrews_accessible_name);
  expect(andrewsLink).toBeInTheDocument;

  const ratty = screen.getByText(TEXT_Ratty_accessible_name);
  expect(ratty).toBeInTheDocument;

  const vdub = screen.getByText(TEXT_Vdub_accessible_name);
  expect(vdub).toBeInTheDocument;
});

//Test clicking pages in nav
test('click page in nav', () => {  
    render(<BrowserRouter>
      <NavBar /> <MyRouter/>
      </BrowserRouter>)
    const andrewsLink = screen.getByText(TEXT_Andrews_accessible_name);
    expect(andrewsLink).toBeInTheDocument;
  
    const ratty = screen.getByText(TEXT_Ratty_accessible_name);
    expect(ratty).toBeInTheDocument;
  
    const vdub = screen.getByText(TEXT_Vdub_accessible_name);
    expect(vdub).toBeInTheDocument;

    // const rating = "5"
    userEvent.click(andrewsLink)
  });