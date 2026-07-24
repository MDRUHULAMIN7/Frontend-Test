function calculateCartTotal(items) {
  return items.reduce((total, item) => total + item.price * item.qty, 0)
}

module.exports = { calculateCartTotal }