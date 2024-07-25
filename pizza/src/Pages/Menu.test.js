import Menu from "./Menu";
import Login from "./Login";
import Menuitem from "./Menuitem";
import { render, waitFor, screen, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';

const loginWithValidData = async () => {
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
  
    waitFor(async () => {
      const PassMessage = (await screen.findByTestId("LoginPassMeassage")).textContent;
      expect(PassMessage).toEqual("Login successful!");
    });
};


describe(Menu, () => {
    it("Verify that Menu page is loading with its items", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );

        waitFor(() => {
            const anItem = screen.findByText("Margherita Pizza");
            expect(anItem).toBeInTheDocument();
        });
    });

    it("Verify that Menu page is loading with its categories", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );

        waitFor(() => {
            const aCategory = screen.findByTestId("categoryhead");
            expect(aCategory).toBeInTheDocument();
        });
    });

    it("Verify that users can add to cart after login in", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );

        waitFor(() => {
            loginWithValidData();
            const addtoCartBtn = screen.findByText("Add to Cart");
            userEvent.click(addtoCartBtn);

            const addToCartMessage = screen.findByText("Added to your cart")
            expect(addToCartMessage).toBeInTheDocument();
        });
    });

    it("Verify that users cannot add to cart without login in", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );

        waitFor(() => {
            const addtoCartBtn = screen.findByText("Add to Cart");
            userEvent.click(addtoCartBtn);

            const addToCartMessage = screen.findByText("Please login")
            expect(addToCartMessage).toBeInTheDocument();
        });
    });
});