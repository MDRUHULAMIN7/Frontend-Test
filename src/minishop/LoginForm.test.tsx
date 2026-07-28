import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {

  test('email খালি রেখে submit করলে validation error দেখায়', async () => {
    const user = userEvent.setup()
    // onLogin কখনো call হওয়ার কথা না এই case-এ, তাই simple mock দিলেই হবে
    render(<LoginForm onLogin={jest.fn()} />)

    // password ঠিক দিয়ে দিচ্ছি যাতে শুধু email-এর কারণেই fail করে সেটা নিশ্চিত হয়
    await user.type(screen.getByLabelText('Password'), 'somepassword')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // validation client-side, তাই async wait ছাড়াই সাথে সাথে দেখা যাওয়ার কথা
    expect(screen.getByText('Email is required')).toBeInTheDocument()
  })

  test('সঠিক credential দিলে onLogin সঠিক argument দিয়ে call হয়', async () => {
    const user = userEvent.setup()
    // এইবার onLogin সফল হবে বলে ধরে নিচ্ছি — resolve করা Promise
    const mockLogin = jest.fn(() => Promise.resolve())

    render(<LoginForm onLogin={mockLogin} />)

    await user.type(screen.getByLabelText('Email'), 'ruhul@example.com')
    await user.type(screen.getByLabelText('Password'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // onLogin async, তাই findBy ব্যবহার করে ঘুরপথে wait করছি —
    // যদিও এখানে সরাসরি output নেই, তবু state update settle হওয়া পর্যন্ত এভাবে wait করা নিরাপদ
    await screen.findByRole('button', { name: 'Login' })

    expect(mockLogin).toHaveBeenCalledWith('ruhul@example.com', 'password123')
  })

  test('API reject করলে "Invalid credentials" দেখায়', async () => {
    const user = userEvent.setup()
    // এইবার onLogin fail করবে — reject করা Promise
    const mockLogin = jest.fn(() => Promise.reject())

    render(<LoginForm onLogin={mockLogin} />)

    await user.type(screen.getByLabelText('Email'), 'wrong@example.com')
    await user.type(screen.getByLabelText('Password'), 'wrongpass')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    // এইটা async ভাবে আসবে (await onLogin fail হওয়ার পরে state update হয়),
    // তাই findByText ব্যবহার করছি
    const errorMsg = await screen.findByText('Invalid credentials')
    expect(errorMsg).toBeInTheDocument()
  })
})