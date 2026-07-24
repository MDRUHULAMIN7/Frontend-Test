const { calculateCartTotal } = require('./cart')

describe('calculateCartTotal', () => {
  test('empty cart হলে total 0 দেয়', () => {
    expect(calculateCartTotal([])).toBe(0)
  })

  test('একটি item-এর total সঠিকভাবে calculate করে', () => {
    expect(calculateCartTotal([{ price: 100, qty: 1 }])).toBe(100)
  })

  test('একটি item-এর quantity price-এর সাথে গুণ করে', () => {
    expect(calculateCartTotal([{ price: 100, qty: 2 }])).toBe(200)
  })

  test('একাধিক item-এর total যোগ করে', () => {
    const items = [
      { price: 100, qty: 2 },
      { price: 50, qty: 1 },
    ]

    expect(calculateCartTotal(items)).toBe(250)
  })
})