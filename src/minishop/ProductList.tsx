import { useEffect, useState } from 'react'

export function ProductList() {
  const [products, setProducts] = useState<string[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError('Failed to load'))
  }, [])

  // early return pattern — error থাকলে সেটাই দেখাও, বাকি কিছু render করার দরকার নেই
  if (error) return <p>{error}</p>

  // products এখনো null মানে এখনো fetch শেষ হয়নি
  if (!products) return <p>Loading...</p>

  return (
    <ul>
      {products.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}