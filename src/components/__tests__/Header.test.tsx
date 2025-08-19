import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Header from '../Header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<BrowserRouter><Header /></BrowserRouter>)
    expect(screen.getByText('Low-Level Quest')).toBeDefined()
    expect(screen.getByText('About')).toBeDefined()
  })
})
