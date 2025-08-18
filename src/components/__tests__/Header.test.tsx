import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders site title and author', () => {
    render(<Header />)
  expect(screen.getByText(/Bits, Boot, and Beyond/i)).toBeInTheDocument()
    expect(screen.getByText(/Abinash Singh/i)).toBeInTheDocument()
  })
})
