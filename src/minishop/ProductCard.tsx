// এই component একটা product-এর নাম আর price দেখায়
type ProductCardProps = {
  name: string
  price: number
  inStock?: boolean
}

export function ProductCard({ name, price, inStock = true }: ProductCardProps) {
  return (
    <div>
      {/* product-এর নাম heading হিসেবে দেখাচ্ছি */}
      <h2>{name}</h2>

      {/* price-কে "৳" symbol সহ দেখাচ্ছি */}
      <p>৳{price}</p>

      {!inStock && <span>Out of Stock</span>}
    </div>
  )
}