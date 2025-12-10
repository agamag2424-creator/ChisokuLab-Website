import { subscribeToNewsletter } from '@/lib/convertkit'

// Mock the convertkit utility
jest.mock('@/lib/convertkit', () => ({
  subscribeToNewsletter: jest.fn(),
}))

// Mock Next.js server modules
jest.mock('next/server', () => ({
  NextRequest: class MockNextRequest {
    constructor(public url: string, public init?: RequestInit) {}
    async json() {
      return JSON.parse(this.init?.body as string || '{}')
    }
  },
  NextResponse: {
    json: (body: any, init?: { status?: number }) => ({
      json: async () => body,
      status: init?.status || 200,
    }),
  },
}))

// Import after mocks
const { POST } = require('@/app/api/subscribe/route')
const { NextRequest } = require('next/server')

describe('/api/subscribe', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBeDefined()
  })

  it('should return 400 for missing email', async () => {
    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('should successfully subscribe with valid email', async () => {
    ;(subscribeToNewsletter as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { subscription: { id: 1 } },
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        source: 'homepage-cta',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(subscribeToNewsletter).toHaveBeenCalledWith({
      email: 'test@example.com',
      source: 'homepage-cta',
    })
  })

  it('should handle ConvertKit API errors', async () => {
    ;(subscribeToNewsletter as jest.Mock).mockResolvedValueOnce({
      success: false,
      error: 'API Error',
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBeDefined()
  })

  it('should use default source if not provided', async () => {
    ;(subscribeToNewsletter as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: { subscription: { id: 1 } },
    })

    const request = new NextRequest('http://localhost/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
      }),
    })

    const response = await POST(request)
    await response.json()

    expect(subscribeToNewsletter).toHaveBeenCalledWith({
      email: 'test@example.com',
      source: 'website',
    })
  })
})

