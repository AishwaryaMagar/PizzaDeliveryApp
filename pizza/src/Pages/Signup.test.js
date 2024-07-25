import Signup from "./Signup";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe(Signup, () => {
    it("Signup page is loading", async ()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        );
        const signupheading = (await screen.findByTestId("signupheading")).textContent;
        await waitFor(() => {
            expect(signupheading).toEqual("Sign Up");
        });
    });

    it("Verify the signup page has submit button", async ()=>{
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Signup />} />
                </Routes>
            </MemoryRouter>
        );
        const SignUpBtn = await screen.findByTestId("SignUpsubmitbutton");
        await waitFor(() => {
            expect(SignUpBtn).toBeInTheDocument();
        });
    });

    it("Verify that email field is mandatory in the Signup form", async() => {
        const { getByTestId, getByRole } = render(
          <MemoryRouter>
            <Signup />
          </MemoryRouter>
        );
        
        const emailField = getByTestId('email-input');
    
        fireEvent.click(getByRole('button', { name: 'Sign Up' }));
        
        await waitFor(() => {});
        expect(emailField).toHaveAttribute('required');
    });

    it("Verify that the user cannot sign up with an used email", async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Signup />} />
            </Routes>
          </MemoryRouter>
        );
      
        const emailField = await screen.findByTestId('email-input');    
        await userEvent.type(emailField, 'csc848@yahoo.com');
        const NameField = await screen.findByTestId('name-input');
        await userEvent.type(NameField, 'Monisha');
        const PhoneField = await screen.findByTestId('phone-input');
        await userEvent.type(PhoneField, '7863298473');
        const PasswordField = await screen.findByTestId('password-input');
        await userEvent.type(PasswordField, 'CSc848@class');
    
        const signUpBtn = await screen.findByTestId('SignUpsubmitbutton');
    
        waitFor(async () => {
          userEvent.click(signUpBtn);

          const FailMessage = (await screen.findByRole("alert")).textContent;
          expect(FailMessage).toEqual("Email is already used.");
        });
    });

    it("Verify that the user cannot sign up with a week password", async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Signup />} />
            </Routes>
          </MemoryRouter>
        );
      
        const emailField = await screen.findByTestId('email-input');    
        await userEvent.type(emailField, 'passwordNew@yahoo.com');
        const NameField = await screen.findByTestId('name-input');
        await userEvent.type(NameField, 'asdf89');
        const PhoneField = await screen.findByTestId('phone-input');
        await userEvent.type(PhoneField, '7863298473');
        const PasswordField = await screen.findByTestId('password-input');
        await userEvent.type(PasswordField, '1class');
    
        const signUpBtn = await screen.findByTestId('SignUpsubmitbutton');
    
        waitFor(async () => {
            userEvent.click(signUpBtn);

            const FailMessage = (await screen.findByRole("alert")).textContent;
            expect(FailMessage).toEqual("Password does not meet the required criteria.");
        });
    });

    it("Verify that the user cannot sign up with an invalid name", async () => {
        render(
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Signup />} />
            </Routes>
          </MemoryRouter>
        );
      
        const emailField = await screen.findByTestId('email-input');    
        await userEvent.type(emailField, 'passwordNew@yahoo.com');
        const NameField = await screen.findByTestId('name-input');
        await userEvent.type(NameField, 'On');
        const PhoneField = await screen.findByTestId('phone-input');
        await userEvent.type(PhoneField, '7863298473');
        const PasswordField = await screen.findByTestId('password-input');
        await userEvent.type(PasswordField, '1@IOPclass');
    
        const signUpBtn = await screen.findByTestId('SignUpsubmitbutton');
    
        waitFor(async () => {
          userEvent.click(signUpBtn);

          const FailMessage = (screen.findByRole("alert")).textContent;
          expect(FailMessage).toEqual("Please provide a valid name");
        });
    });
});