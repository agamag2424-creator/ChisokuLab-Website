import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConsultingWaitlistPage from '@/app/consulting/waitlist/page'

// Mock fetch
global.fetch = jest.fn()

describe('Consulting Waitlist Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render hero section', () => {
    render(<ConsultingWaitlistPage />)
    expect(screen.getByText(/enterprise ai deployment advisory/i)).toBeInTheDocument()
    expect(screen.getByText(/launching q1 2025/i)).toBeInTheDocument()
  })

  it('should render feature cards', () => {
    render(<ConsultingWaitlistPage />)
    expect(screen.getByText(/ai readiness assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/deployment strategy/i)).toBeInTheDocument()
    expect(screen.getByText(/governance architecture/i)).toBeInTheDocument()
  })

  it('should render email form', () => {
    render(<ConsultingWaitlistPage />)
    expect(screen.getByPlaceholderText(/enter your work email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument()
  })

  it('should validate email format', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockClear()
    
    render(<ConsultingWaitlistPage />)
    
    const input = screen.getByPlaceholderText(/enter your work email/i)
    const button = screen.getByRole('button', { name: /join waitlist/i })
    
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

    render(<ConsultingWaitlistPage />)
    
    const input = screen.getByPlaceholderText(/enter your work email/i)
    const button = screen.getByRole('button', { name: /join waitlist/i })
    
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          source: 'consulting-waitlist',
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

    render(<ConsultingWaitlistPage />)
    
    const input = screen.getByPlaceholderText(/enter your work email/i)
    const button = screen.getByRole('button', { name: /join waitlist/i })
    
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    await waitFor(() => {
      expect(screen.getByText(/you're on the list!/i)).toBeInTheDocument()
    })
  })
})

