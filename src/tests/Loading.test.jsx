import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Loading from '../components/Loading'

describe('Loading', () => {
  it('renders a custom loading message', () => {
    render(<Loading message="Loading organizations..." />)

    expect(screen.getByText('Loading organizations...')).toBeInTheDocument()
  })
})
