import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddToCartButton } from './AddToCartButton'

test('click করলে button text আপডেট হয়', async () => {
  // userEvent.setup() একটা "user" object তৈরি করে যেটা দিয়ে
  // real user-এর মতো interaction simulate করবো
  const user = userEvent.setup()

  render(<AddToCartButton />)

  // প্রথমে button "Add to Cart" text নিয়ে খুঁজে বের করছি
  const button = screen.getByRole('button', { name: 'Add to Cart' })

  // click simulate করছি — এটা async, তাই await লাগবে
  await user.click(button)

  // click করার পর button-এর নতুন text "Added (1)" হওয়ার কথা
  expect(screen.getByRole('button', { name: 'Added (1)' })).toBeInTheDocument()

  // আরেকবার click করে দেখি
  await user.click(screen.getByRole('button', { name: 'Added (1)' }))
  expect(screen.getByRole('button', { name: 'Added (2)' })).toBeInTheDocument()
})