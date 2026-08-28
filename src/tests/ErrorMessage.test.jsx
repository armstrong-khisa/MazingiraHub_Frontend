import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ErrorMessage from '../components/ErrorMessage'

describe('ErrorMessage', () => {
  it('shows the error and calls onDismiss when dismissed', () => {
    const onDismiss = vi.fn()
    render(
      <ErrorMessage
        title="Request failed"
        message="Please try again"
        onDismiss={onDismiss}
      />,
    )

    expect(screen.getByText('Request failed')).toBeInTheDocument()
    expect(screen.getByText('Please try again')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button'))

    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
