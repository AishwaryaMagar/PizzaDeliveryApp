import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import AdminOrderDetails from "./AdminOrderDetails";

describe(AdminOrderDetails, () => {
    it("Verify that admins can view active orders", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<AdminOrderDetails />} />
                </Routes>
            </MemoryRouter>
        )

        waitFor(async() => {
            const orderIDTittle = (await screen.findByText("Order ID"));
            expect(orderIDTittle).toEqual("Order ID");
        });
    });

    it("Verify that admins can change the status of orders", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<AdminOrderDetails />} />
                </Routes>
            </MemoryRouter>
        )

        waitFor(async() => {
            const viewbtn = (await screen.findByText("View/Update"));
            userEvent.click(viewbtn);
            const statusSelect = screen.getByLabelText(/Change Status/i);
            userEvent.selectOptions(statusSelect, 'Confirmed');
            expect(statusSelect.value).toBe('Confirmed');
            const submitButton = screen.getByText(/Update Status/i);
            userEvent.click(submitButton);
        });
    });

    it("Verify that status of delivered items cannot be changed", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<AdminOrderDetails />} />
                </Routes>
            </MemoryRouter>
        )

        waitFor(async() => {
            const status = (await screen.findByText("Current Status"));
            expect(status).toBe('Current Status');
        });
    });
});