// discount.js থেকে আমাদের function-টা import করছি

const { calculateDiscount } = require('./discount')


// describe() শুধু organization-এর জন্য — একটা label দিয়ে related test group করে
describe('calculateDiscount', () => {

  // ১ম test: normal, সাধারণ case
  test('২০% discount সঠিকভাবে calculate করে', () => {
    // এখানে actual function call করছি, আর তার result-কে expect() এর ভেতর দিচ্ছি
    const result = calculateDiscount(100, 20)

    // toBe() দিয়ে exact value মিলাচ্ছি — আমরা আশা করছি result ঠিক 80 হবে
    expect(result).toBe(80)
  })

  // ২য় test: edge case — 0% discount
  test('0% discount দিলে price একই থাকে', () => {
    expect(calculateDiscount(100, 0)).toBe(100)
  })

  // ৩য় test: edge case — 100% discount (পুরো ফ্রি)
  test('100% discount দিলে price 0 হয়', () => {
    expect(calculateDiscount(100, 100)).toBe(0)
  })

  // ৪র্থ test: invalid input case — percent 100 এর বেশি
  test('percent 100 এর বেশি হলে error throw করে', () => {
    // ফাংশন-টাকে সরাসরি call না করে একটা arrow function-এর ভেতরে দিতে হয়,
    // কারণ toThrow() নিজে function-টা call করে দেখতে চায় যে সত্যিই error আসে কিনা
    expect(() => calculateDiscount(100, 150)).toThrow('Invalid percent')
  })

  // ৫ম test: invalid input case — negative price
  test('negative price দিলে error throw করে', () => {
    expect(() => calculateDiscount(-50, 20)).toThrow('Invalid price')
  })
})