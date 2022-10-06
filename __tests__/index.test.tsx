import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from 'src/pages'

describe('Home', () => {
  it('renders a link that contains reviews', () => {
    // arrange
    render(<Home />)

    // act
    const links = screen.getAllByRole('link')

    // assert
    expect(links).toHaveLength(25)
  })
})
