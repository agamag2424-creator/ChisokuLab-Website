// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react')
  return {
    motion: {
      div: React.forwardRef(({ children, whileHover, whileTap, transition, ...props }, ref) => 
        <div ref={ref} {...props}>{children}</div>
      ),
      span: React.forwardRef(({ children, ...props }, ref) => 
        <span ref={ref} {...props}>{children}</span>
      ),
      button: React.forwardRef(({ children, ...props }, ref) => 
        <button ref={ref} {...props}>{children}</button>
      ),
      section: React.forwardRef(({ children, ...props }, ref) => 
        <section ref={ref} {...props}>{children}</section>
      ),
      li: React.forwardRef(({ children, ...props }, ref) => 
        <li ref={ref} {...props}>{children}</li>
      ),
      form: React.forwardRef(({ children, ...props }, ref) => 
        <form ref={ref} {...props}>{children}</form>
      ),
    },
    AnimatePresence: ({ children }) => children,
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
    }),
    useInView: () => [false, jest.fn()],
  }
})

