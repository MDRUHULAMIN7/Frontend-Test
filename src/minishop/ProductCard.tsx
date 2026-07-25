// এই component একটা product-এর নাম আর price দেখায়
type ProductCardProps = {
  name: string
  price: number
}

export function ProductCard({ name, price }: ProductCardProps) {
  return (
    <div>
      {/* product-এর নাম heading হিসেবে দেখাচ্ছি */}
      <h2>{name}</h2>

      {/* price-কে "৳" symbol সহ দেখাচ্ছি */}
      <p>৳{price}</p>
    </div>
  )
}