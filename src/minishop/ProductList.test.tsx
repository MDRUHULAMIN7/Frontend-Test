import { render, screen, waitFor } from '@testing-library/react'
import { ProductList } from './ProductList'

test('products সফলভাবে load হলে list দেখায়', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(['T-Shirt', 'Jeans']),
    })
  ) as jest.Mock

  render(<ProductList />)

  // waitFor() ভেতরের assertion-টাকে বারবার try করতে থাকে
  // যতক্ষণ না সেটা true হয় অথবা timeout হয় (default 1 সেকেন্ড)
  await waitFor(() => {
    expect(screen.getByText('T-Shirt')).toBeInTheDocument()
  })

  // এতক্ষণে দুটোই load হয়ে গেছে ধরে নিচ্ছি
  expect(screen.getByText('Jeans')).toBeInTheDocument()
})

test('fetch fail করলে error message দেখায়', async () => {
  global.fetch = jest.fn(() => Promise.reject('down')) as jest.Mock

  render(<ProductList />)

  await waitFor(() => {
    expect(screen.getByText('Failed to load')).toBeInTheDocument()
  })
})