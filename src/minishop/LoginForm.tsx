import { useState } from 'react'

type Props = {
  onLogin: (email: string, password: string) => Promise<void>
}

export function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [apiError, setApiError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setValidationError('')
    setApiError('')

    // ক্লায়েন্ট-সাইড validation
    if (!email) {
      setValidationError('Email is required')
      return
    }

    // API call, error হলে ধরার জন্য try/catch
    try {
      await onLogin(email, password)
    } catch {
      setApiError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {validationError && <p>{validationError}</p>}
      {apiError && <p>{apiError}</p>}

      <button type="submit">Login</button>
    </form>
  )
}