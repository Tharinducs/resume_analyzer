import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardLayout from './layout'

jest.mock('@/components/dashboard-header', () => ({
  DashboardHeader: () => <div data-testid="dashboard-header" />,
}))
jest.mock('./dashbord-sidebar-container', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar-container" />,
}))

describe('DashboardLayout', () => {
  it('renders children', () => {
    render(<DashboardLayout><div data-testid="page-content">Page</div></DashboardLayout>)
    expect(screen.getByTestId('page-content')).toBeInTheDocument()
  })

  it('renders DashboardHeader', () => {
    render(<DashboardLayout><div /></DashboardLayout>)
    expect(screen.getByTestId('dashboard-header')).toBeInTheDocument()
  })

  it('renders DashboardSidebarContainer', () => {
    render(<DashboardLayout><div /></DashboardLayout>)
    expect(screen.getByTestId('sidebar-container')).toBeInTheDocument()
  })

  it('outer container has full-height flex layout', () => {
    const { container } = render(<DashboardLayout><div /></DashboardLayout>)
    const outer = container.firstChild as HTMLElement
    expect(outer).toHaveClass('flex', 'h-screen', 'overflow-hidden')
  })

  it('content area is scrollable', () => {
    const { container } = render(<DashboardLayout><div /></DashboardLayout>)
    const scrollArea = container.querySelector('.overflow-y-auto')
    expect(scrollArea).toBeInTheDocument()
  })

  it('content area has padding and spacing', () => {
    const { container } = render(<DashboardLayout><div /></DashboardLayout>)
    const scrollArea = container.querySelector('.overflow-y-auto')
    expect(scrollArea).toHaveClass('p-6', 'space-y-6')
  })

  it('header wrapper does not shrink', () => {
    const { container } = render(<DashboardLayout><div /></DashboardLayout>)
    const headerWrapper = container.querySelector('.flex-shrink-0')
    expect(headerWrapper).toBeInTheDocument()
  })

  it('renders sidebar and main content side by side', () => {
    render(<DashboardLayout><div data-testid="content" /></DashboardLayout>)
    expect(screen.getByTestId('sidebar-container')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
  })
})
