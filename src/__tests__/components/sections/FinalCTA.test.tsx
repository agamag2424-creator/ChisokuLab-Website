import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FinalCTA from '@/components/sections/FinalCTA'

// Mock fetch
global.fetch = jest.fn()

describe('FinalCTA Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render headline and description', () => {
    render(<FinalCTA />)
    expect(screen.getByText(/ready to stop reacting/i)).toBeInTheDocument()
    expect(screen.getByText(/join hundreds of managers/i)).toBeInTheDocument()
  })

  it('should render email input field', () => {
    render(<FinalCTA />)
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument()
  })

  it('should render submit button', () => {
    render(<FinalCTA />)
    expect(screen.getByRole('button', { name: /get started free/i })).toBeInTheDocument()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockClear()
    
    render(<FinalCTA />)
    
    const input = screen.getByPlaceholderText(/enter your email/i)
    const button = screen.getByRole('button', { name: /get started free/i })
    
    // Try invalid email
    await user.type(input, 'invalid-email')
    await user.click(button)
    
    // Form validation should prevent submission
    await waitFor(() => {
      // API should not be called with invalid email
      expect(global.fetch).not.toHaveBeenCalled()
    }, { timeout: 1000 })
  })

  it('should submit form with valid email', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<FinalCTA />)
    
    const input = screen.getByPlaceholderText(/enter your email/i)
    const button = screen.getByRole('button', { name: /get started free/i })
    
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          source: 'homepage-cta',
        }),
      })
    })
  })

  it('should show success message after submission', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })

    render(<FinalCTA />)
    
    const input = screen.getByPlaceholderText(/enter your email/i)
    const button = screen.getByRole('button', { name: /get started free/i })
    
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    await waitFor(() => {
      // Button text changes to "Subscribed!" on success
      expect(screen.getByRole('button', { name: /subscribed!/i })).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('should handle API errors', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, error: 'API Error' }),
    })

    // Mock alert
    window.alert = jest.fn()

    render(<FinalCTA />)
    
    const input = screen.getByPlaceholderText(/enter your email/i)
    const button = screen.getByRole('button', { name: /get started free/i })
    
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled()
    })
  })
})

