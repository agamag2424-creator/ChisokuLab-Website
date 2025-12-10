import { render, screen } from '@testing-library/react'
import Card from '@/components/ui/Card'

describe('Card Component', () => {
  it('should render card with children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText(/card content/i)).toBeInTheDocument()
  })

  it('should render default variant', () => {
    render(<Card>Content</Card>)
    const card = screen.getByText(/content/i).closest('div')
    expect(card).toHaveClass('bg-white')
  })

  it('should render elevated variant', () => {
    render(<Card variant="elevated">Content</Card>)
    const card = screen.getByText(/content/i).closest('div')
    // Elevated variant has hover effects, check for hover classes
    expect(card).toHaveClass('hover:shadow-xl')
  })

  it('should accept custom className', () => {
    render(<Card className="custom-class">Content</Card>)
    const card = screen.getByText(/content/i).closest('div')
    expect(card).toHaveClass('custom-class')
  })
})

