import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './NewsletterForm'

test('email দিয়ে submit করলে onSubscribe সঠিক value নিয়ে call হয়', async () => {
  const user = userEvent.setup()

  // jest.fn() একটা fake function বানায়, যেটা call হলে
  // Jest নিজে track করে রাখে — কতবার call হলো, কী argument দিয়ে
  const mockOnSubscribe = jest.fn()

  render(<NewsletterForm onSubscribe={mockOnSubscribe} />)

  // label দিয়ে input খুঁজছি
  const input = screen.getByLabelText('Email')

  // user.type() প্রতিটা character আলাদাভাবে type করে, ঠিক real user-এর মতো
  await user.type(input, 'ruhul@example.com')

  // এখন input-এর value ঠিক আছে কিনা check করছি (bonus assertion)
  expect(input).toHaveValue('ruhul@example.com')

  // submit button click করছি
  await user.click(screen.getByRole('button', { name: 'Subscribe' }))

  // check করছি mockOnSubscribe ঠিক ১ বার, সঠিক email দিয়ে call হয়েছে
  expect(mockOnSubscribe).toHaveBeenCalledTimes(1)
  expect(mockOnSubscribe).toHaveBeenCalledWith('ruhul@example.com')
})