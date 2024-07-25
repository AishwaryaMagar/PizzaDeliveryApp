import Menu from "./Menu";
import { render, waitFor, screen, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';

describe(Menu, () => {
    it("Verify that all Pizza and Pasta items disappear when selecting Dessert", async ()=> {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );
    
        waitFor(() => {
            const dessertFilter = screen.findAllByTestId("Dessert");
            userEvent.click(dessertFilter);
            const aPizza = screen.findByText("Margherita Pizza");
            expect(aPizza).not.toBeInTheDocument();
            const aPasta = screen.findByText("Penne all'arrabbiata");
            expect(aPasta).not.toBeInTheDocument();
        });
    });

    it("Verify that all Pizza and Dessert items disappear when selecting Pasta", async ()=> {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );
    
        waitFor(() => {
            const dessertFilter = screen.findAllByTestId("Pasta");
            userEvent.click(dessertFilter);
            const aPizza = screen.findByText("Margherita Pizza");
            expect(aPizza).not.toBeInTheDocument();
            const aPasta = screen.findByText("Chocolate Fondant");
            expect(aPasta).not.toBeInTheDocument();
        });
    });

    it("Verify that all Pasta and Dessert items disappear when selecting Pizza", async ()=> {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Menu />} />
                </Routes>
            </MemoryRouter>
        );
    
        waitFor(() => {
            const dessertFilter = screen.findAllByTestId("Pasta");
            userEvent.click(dessertFilter);
            const aPizza = screen.findByText("Penne all'arrabbiata");
            expect(aPizza).not.toBeInTheDocument();
            const aPasta = screen.findByText("Chocolate Fondant");
            expect(aPasta).not.toBeInTheDocument();
        });
    });
})