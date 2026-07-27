import { render, screen } from '@testing-library/react'
import { ProductInfo } from './ProductInfo'

test('API থেকে product name fetch করে দেখায়', async () => {
  // global.fetch-কে আমরা নিজেদের বানানো একটা fake function দিয়ে replace করছি
  // as jest.Mock দিয়ে TypeScript-কে বলছি এইটা একটা mock function
  global.fetch = jest.fn(() =>
    // real fetch একটা Response object-এর মতো কিছু return করে, যার .json() method আছে
    // আমরা সেটাই নকল করছি
    Promise.resolve({
      json: () => Promise.resolve({ name: 'T-Shirt' }),
    })
  ) as jest.Mock

  render(<ProductInfo />)

  // component render হওয়ার সাথে সাথেই "Loading..." দেখানোর কথা,
  // কারণ fetch তখনও resolve হয়নি
  expect(screen.getByText('Loading...')).toBeInTheDocument()

  // findByText async — এটা automatically কয়েকবার try করে
  // যতক্ষণ না element পাওয়া যায় (max ~1 সেকেন্ড ডিফল্ট)
  const productText = await screen.findByText('Product: T-Shirt')
  expect(productText).toBeInTheDocument()
})

test('API fail করলে graceful ভাবে handle করে (bonus practice)', async () => {
  // এখানে ইচ্ছাকৃত ভাবে reject করা Promise দিচ্ছি, error simulate করার জন্য
  global.fetch = jest.fn(() => Promise.reject('Network Error')) as jest.Mock

  render(<ProductInfo />)

  // এই test আপাতত "Loading..." স্থায়ী থাকবে দেখাবে,
  // কারণ আমাদের component-এ এখনো error handling নেই — এটাই bug ধরার একটা example
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})