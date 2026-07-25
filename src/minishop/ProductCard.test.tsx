/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProductCard } from './ProductCard'

test('product name আর price ঠিকমতো দেখায়', () => {
  // render() component-টাকে একটা virtual DOM-এ বসিয়ে দেয়,
  // ঠিক যেভাবে browser-এ আসল page render হয়
  render(<ProductCard name="T-Shirt" price={499} />)

  // screen.getByText() পুরো rendered output-এর ভেতর থেকে
  // matching text খুঁজে বের করে। না পেলে test সাথে সাথে fail করবে (error throw করবে)
  const nameElement = screen.getByText('T-Shirt')
  const priceElement = screen.getByText('৳499')

  // toBeInTheDocument() — এই matcher confirm করে যে element সত্যিই DOM-এ আছে
  expect(nameElement).toBeInTheDocument()
  expect(priceElement).toBeInTheDocument()
})

test('inStock={true} দিলে badge না দেখায়', () => {
  render(<ProductCard name="T-Shirt" price={499} inStock={true} />)

  expect(screen.queryByText('Out of Stock')).not.toBeInTheDocument()
})

test('inStock={false} দিলে badge দেখায়', () => {
  render(<ProductCard name="T-Shirt" price={499} inStock={false} />)

  expect(screen.getByText('Out of Stock')).toBeInTheDocument()
})