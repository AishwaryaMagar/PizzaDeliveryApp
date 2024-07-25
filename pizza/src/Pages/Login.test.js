import Login from "./Login";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe(Login, () => {
  //to check if login page is loading
  it("Login page is loaded", async () => {
      const { getByTestId } = render(
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        );
      const loginheading = getByTestId("loginHeading").textContent;
      expect(loginheading).toEqual("Login");
  });

  //to check if the email and password fields are amndatory
  it("Verify that Email and Password fields are mandatory", async() => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    fireEvent.click(getByRole('button', { name: 'Log In' }));

    await waitFor(() => {});
    const emailValidationMessage = getByTestId('email-input');
    expect(emailValidationMessage).toHaveAttribute('required');
  });

  //to check if the password field is mandatory
  it("Verify that Password field is mandatory in the Login form", async() => {
    const { getByTestId, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    const emailField = getByTestId('email-input');
    fireEvent.change(emailField, {target: {value: 'csc848@gmail.com'}})

    fireEvent.click(getByRole('button', { name: 'Log In' }));
    
    const passwordField = getByTestId('password-input');
    await waitFor(() => {});
    expect(passwordField).toHaveAttribute('required');
  });

  //to verify if the user is able to login with valid data
  it("Verify if the user is able to login with valid data", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  
    const emailField = await screen.findByTestId('email-input');    
    await userEvent.type(emailField, 'csc848@gmail.com');
    const passwordField = await screen.findByTestId('password-input');
    await userEvent.type(passwordField, 'csc848');

    const submitBtn = await screen.findByTestId('login_btn');

    userEvent.click(submitBtn);
    await waitFor(async () => {      
      const PassMessage = (await screen.findByTestId("LoginPassMeassage")).textContent;
      expect(PassMessage).toEqual("Login successful!");
    });
    
  });

  it("Appropriate message is displayed when user tries to login with invalid credentials", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
  
    const emailField = await screen.findByTestId('email-input');    
    await userEvent.type(emailField, 'csc848@gmail.com');
    const passwordField = await screen.findByTestId('password-input');
    await userEvent.type(passwordField, 'csc848');

    const submitBtn = await screen.findByTestId('login_btn');

    userEvent.click(submitBtn);
    
    await waitFor(async () => {      
      const FailMessage = (await screen.findByTestId("LoginfailMeassage")).textContent;
      expect(FailMessage).toEqual("Either Email or Password is incorrect");
    });
  });

  it("Verify that the login page has the forgot password link", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    const forgotPassword = await screen.findByTestId("forgotPasswordLink");
    await waitFor(() => {
      expect(forgotPassword).toBeInTheDocument();
    });
  });

  it("Verify that the login page has the Sign Up Button", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );
    const SignUpBtn = await screen.findByTestId("SignUpButton");
    await waitFor(() => {
      expect(SignUpBtn).toBeInTheDocument();
    });
  });
});