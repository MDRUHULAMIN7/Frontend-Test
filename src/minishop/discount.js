function calculateDiscount(price, percent) {
  // Step 1: invalid input check করছি
  // percent যদি 0 এর কম বা 100 এর বেশি হয়, সেটা অবৈধ
  if (percent < 0 || percent > 100) {
    throw new Error('Invalid percent')
  }

  // Step 2: negative price ঢুকিয়ে দিলেও যেন ভুল না হয়
  if (price < 0) {
    throw new Error('Invalid price')
  }

  // Step 3: discount amount বের করছি
  // যেমন price=100, percent=20 হলে discountAmount = (100 * 20) / 100 = 20
  const discountAmount = (price * percent) / 100

  // Step 4: final price return করছি
  // 100 - 20 = 80
  return price - discountAmount
}

module.exports = { calculateDiscount }