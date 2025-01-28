/**
 * @jest-environment jsdom
 */
test('use jsdom in this test file', () => {
    const element = document.createElement('div');
    expect(element).not.toBeNull();
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../components/layout/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('renders all category buttons with correct links', () => {
    const categories = [
        { label: 'Grammar', page: '/grammar' },
        { label: 'Vocabulary', page: '/vocabulary' },
        { label: 'Speaking', page: '/speaking' },
        { label: 'Listening', page: '/listening' },
        { label: 'Reading', page: '/reading' },
        { label: 'Games', page: '/games' },
    ];
    const topNavItems = [
        { label: "Analytics", page: "/analytics" },
        { label: "Community", page: "/community" }
    ]
    render(<Sidebar />, { wrapper: BrowserRouter })
    expect(screen.getByText("Diego Duarte")).toBeInTheDocument();
    expect(screen.getByText("Student")).toBeInTheDocument();

    // Expand accordion or ensure categories are rendered
    expect(screen.queryByText("LEVEL")).toBeNull();
    const accordionButton = screen.getByText('Learning content');
    fireEvent.click(accordionButton);
    expect(screen.getByText("LEVEL")).toBeInTheDocument();

    // Verify each category button and link
    categories.forEach((category) => {
        const button = screen.getByTestId(`category-container-${category.label}`);
        const link = screen.getByTestId(`category-link-${category.label}`);
        expect(button).toBeInTheDocument();
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', category.page); // Verify the link
    });
    topNavItems.forEach((item) => {
        const itembutton = screen.getByTestId(`item-container-${item.label}`);
        const itemlink = screen.getByTestId(`item-link-${item.label}`);
        expect(itembutton).toBeInTheDocument();
        expect(itemlink).toBeInTheDocument();
        expect(itemlink).toHaveAttribute('href', item.page); // Verify the link
    });
    expect(screen.getByText("Talk with Starkla")).toBeInTheDocument();

    expect(screen.getByText("Settings")).toBeInTheDocument();

});
test("navigates to the correct page when a particular button is clicked", async () => {
    const categories = [
        { label: 'Grammar', page: '/grammar' },
        { label: 'Vocabulary', page: '/vocabulary' },
        { label: 'Speaking', page: '/speaking' },
        { label: 'Listening', page: '/listening' },
        { label: 'Reading', page: '/reading' },
        { label: 'Games', page: '/games' },
    ];
    const topNavItems = [
        { label: "Analytics", page: "/analytics" },
        { label: "Community", page: "/community" }
    ]
    render(<Sidebar />, { wrapper: BrowserRouter })
    const user = userEvent.setup();
    // Expand accordion or ensure categories are rendered
    expect(screen.queryByText("LEVEL")).toBeNull();
    const accordionButton = screen.getByText('Learning content');
    fireEvent.click(accordionButton);
    expect(screen.getByText("LEVEL")).toBeInTheDocument();
    for (const category of categories) {
        await user.click(screen.getByTestId(`category-link-${category.label}`));
        expect(window.location.pathname).toBe(category.page);  // Check if the URL changed
    }
    for (const item of topNavItems) {
        await user.click(screen.getByTestId(`item-link-${item.label}`));
        expect(window.location.pathname).toBe(item.page);  // Check if the URL changed
    }
});
