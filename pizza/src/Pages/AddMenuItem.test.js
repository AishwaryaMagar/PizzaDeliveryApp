import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import AddMenuItem from "./AddMenuItem";

describe(AddMenuItem, () => {
    it("Verify that admins can add items to the menu", async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<AddMenuItem />} />
                </Routes>
            </MemoryRouter>
        );

        waitFor(async() => {
            
        })
    })
})
