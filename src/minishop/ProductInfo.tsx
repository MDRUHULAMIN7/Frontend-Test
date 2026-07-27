import { useEffect, useState } from 'react'

export function ProductInfo() {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    // component mount হওয়ার সাথে সাথে API call হচ্ছে
    fetch('/api/product/1')
      .then((res) => res.json())
      .then((data) => setName(data.name))
  }, [])

  return <div>{name ? `Product: ${name}` : 'Loading...'}</div>
}