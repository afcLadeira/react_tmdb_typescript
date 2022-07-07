import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FormLogin from './index'

function tree() {

  const props = { onFormSubmit : jest.fn() }

    return render(
        <BrowserRouter>
        <FormLogin {...props}></FormLogin>
        </BrowserRouter>
   
    );
  }

describe("Login Form tests" , () => {


test('should show invalid field errors for each invalid input field', async () => {
   tree()


   fireEvent.click(screen.getByText('Submit'))


  expect(await screen.findByText('This is required')).toBeVisible()

  expect(await screen.findByText('You must specify a password')).toBeVisible()


  const passwordField = screen.getByPlaceholderText('password')

  fireEvent.change(passwordField, { target: { value: "1234" } });

  expect(passwordField).toHaveValue('1234')

  fireEvent.click(screen.getByText('Submit'))

  expect(await screen.findByText('Password must have at least 5 characters')).toBeVisible()

  })


  // test('mock submit' , async () => {
  //   const props = { mockOnClick : jest.fn() }


  //   render(
  //     <BrowserRouter>
  //     <FormLogin {...props}></FormLogin>
  //     </BrowserRouter>
 
  // );

  // const usernameField = screen.getByPlaceholderText('user name')
  // fireEvent.change(usernameField, { target: { value: "andre" } });

  // const passwordField = screen.getByPlaceholderText('password')
  // fireEvent.change(passwordField, { target: { value: "andre" } });

  // fireEvent.click(screen.getByText('Submit'))


  // expect(props.mockOnClick).toHaveBeenCalledTimes(1)

  // })

})