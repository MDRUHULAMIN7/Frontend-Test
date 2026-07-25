import { useState } from 'react'

type Props = {
  onSubscribe: (email: string) => void
}

export function NewsletterForm({ onSubscribe }: Props) {
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    // default behavior (page reload) বন্ধ করছি
    e.preventDefault()
    onSubscribe(email)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}