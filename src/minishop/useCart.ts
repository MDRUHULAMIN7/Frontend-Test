import { useState } from 'react'

export function useCart() {
  const [itemCount, setItemCount] = useState(0)

  function addItem() {
    setItemCount((prev) => prev + 1)
  }

  function removeItem() {
    setItemCount((prev) => Math.max(prev - 1, 0))
  }

  function reset() {
    setItemCount(0)
  }

  return { itemCount, addItem, removeItem, reset }
}
