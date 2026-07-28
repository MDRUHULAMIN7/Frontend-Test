import { act, renderHook } from '@testing-library/react'
import { useCart } from './useCart'

describe('useCart', () => {
  test('removeItem call at 0 keeps itemCount at 0', () => {
    const { result } = renderHook(() => useCart())

    expect(result.current.itemCount).toBe(0)

    act(() => {
      result.current.removeItem()
    })

    expect(result.current.itemCount).toBe(0)
  })
})
