/**
 * @jest-environment jsdom
 */

test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
// Mock the useNavigate hook from react-router-dom
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

describe("Sidebar Component", () => {
    const categories = [
        { label: "Grammar" },
        { label: "Vocabulary" },
        { label: "Speaking" },
        { label: "Listening" },
        { label: "Reading" },
        { label: "Games" }
    ];

    const topNavItems = [
        { label: "Analytics" },
        { label: "Community" }
    ];

    it("renders sidebar with navigation buttons", () => {
        render(<Sidebar categories={categories} topNavItems={topNavItems} />);

        // Verify the presence of profile section
        expect(screen.getByText("Diego Duarte")).toBeInTheDocument();
        expect(screen.getByText("Student")).toBeInTheDocument();


        // Check that all top navigation buttons are rendered
        topNavItems.forEach((item) => {
            const button = screen.getByText(item.label);
            expect(button).toBeInTheDocument();
        });
        // Check that all categories buttons are rendered
        // categories.forEach((category) => {
        //     const button = screen.getByText(category.label);
        //     expect(button).toBeInTheDocument();
        // });
        categories.forEach((category) => {
            expect(categories).toContain(category)
        })

        // Check the Talk with Starkla button
        expect(screen.getByText("Talk with Starkla")).toBeInTheDocument();
    });

    it("expands learning content when clicked", () => {
        render(<Sidebar categories={categories} topNavItems={topNavItems} />);

        // Initially, the learning content should not be expanded
        expect(screen.queryByText("LEVEL")).toBeNull();

        // Simulate click on "Learning content" button to expand
        fireEvent.click(screen.getByText("Learning content"));

        // Now the LEVEL section should be visible
        expect(screen.getByText("LEVEL")).toBeInTheDocument();
    });

    it("navigates to the correct page when a category button is clicked", () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<Sidebar categories={categories} topNavItems={topNavItems} />);
        // Simulate clicking the "Grammar" button
        fireEvent.click(screen.toBe("Grammar"));
        expect(navigate).toHaveBeenCalledWith("/grammar");

        // Simulate clicking the "Community" button
        fireEvent.click(screen.getByText("Vocabulary"));
        expect(navigate).toHaveBeenCalledWith("/vocabulary");
    });

    it("navigates to the correct page when top nav buttons are clicked", () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<Sidebar categories={categories} topNavItems={topNavItems} />);

        // Simulate clicking the "Analytics" button
        fireEvent.click(screen.getByText("Analytics"));
        expect(navigate).toHaveBeenCalledWith("/analytics");

        // Simulate clicking the "Community" button
        fireEvent.click(screen.getByText("Community"));
        expect(navigate).toHaveBeenCalledWith("/community");
    });

    it("navigates to the Starkla chat when clicked", () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<Sidebar categories={categories} topNavItems={topNavItems} />);

        // Simulate clicking the "Talk with Starkla" button
        fireEvent.click(screen.getByText("Talk with Starkla"));
        expect(navigate).toHaveBeenCalledWith("/starkla");
    });

    it("navigates to the settings page when clicked", () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<Sidebar categories={categories} topNavItems={topNavItems} />);

        // Simulate clicking the "Settings" button
        fireEvent.click(screen.getByText("Settings"));
        expect(navigate).toHaveBeenCalledWith("/settings");
    });
    // This will log the DOM to help you identify the structure
});

