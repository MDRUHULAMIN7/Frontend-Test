import { useState } from 'react'

export function AddToCartButton() {
  // count state দিয়ে কতবার click হলো ট্র্যাক করছি
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count === 0 ? 'Add to Cart' : `Added (${count})`}
    </button>
  )
}