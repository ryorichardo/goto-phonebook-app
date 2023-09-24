import { render, screen } from '@testing-library/react'
import { ContactCard } from '../views/components/ContactCard'

const data = {
    contact: {
        id: 0,
        first_name: 'contact',
        last_name: 'last',
        phones: []
    },
    setSelectedContact: null,
    setDetailModal: null,
    setDeleteModal: null,
    setFavo: null
}


test("Example 1 renders successfully", () => {
    render(<ContactCard props={data} />);
    const element = screen.getByText(/contact/i);
    expect(element).toBeInTheDocument();
})