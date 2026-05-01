import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import RootLayout from './layout'

jest.mock('geist/font/sans', () => ({ GeistSans: { variable: '--font-geist-sans' } }))
jest.mock('geist/font/mono', () => ({ GeistMono: { variable: '--font-geist-mono' } }))
jest.mock('@vercel/analytics/next', () => ({ Analytics: () => null }))
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
jest.mock('@/store/store', () => ({
  store: { getState: () => ({}), subscribe: () => () => {}, dispatch: () => {} },
  persistor: { subscribe: () => () => {}, getState: () => ({}) },
}))
jest.mock('@/components/ui/toaster', () => ({ Toaster: () => <div data-testid="toaster" /> }))
jest.mock('@/components/ui/loader', () => ({
  __esModule: true,
  default: () => <div data-testid="global-loader" />,
}))
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('RootLayout', () => {
  it('renders children', () => {
    render(<RootLayout><div data-testid="child">content</div></RootLayout>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders Toaster', () => {
    render(<RootLayout><div /></RootLayout>)
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('renders GlobalLoader', () => {
    render(<RootLayout><div /></RootLayout>)
    expect(screen.getByTestId('global-loader')).toBeInTheDocument()
  })

  it('applies Geist font variables to body', () => {
    const { container } = render(<RootLayout><div /></RootLayout>)
    const body = container.querySelector('body')
    expect(body?.className).toContain('--font-geist-sans')
    expect(body?.className).toContain('--font-geist-mono')
  })

  it('renders children inside PersistGate and Provider', () => {
    render(<RootLayout><div data-testid="child" /></RootLayout>)
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('global-loader')).toBeInTheDocument()
  })
})
