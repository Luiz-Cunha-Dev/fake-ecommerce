import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'

function renderStars(rating: number) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <article className="product-card">
      <Link href={`/product/${product._id}`} className="product-card-link">
        <div className="product-image-wrapper">
          {discount > 0 && <span className="product-badge badge-sale">-{discount}%</span>}
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="product-image"
          />
          <span className="product-badge badge-category">{product.category}</span>
        </div>

        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>

          <div className="product-rating">
            <span className="rating-stars">{renderStars(product.rating)}</span>
            <span className="rating-value">{product.rating.toFixed(1)}</span>
            <span className="rating-count">({product.reviewCount})</span>
          </div>

          <div className="product-price">
            <span className="price-currency">$</span>
            <span className="price-value">{product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="price-original">${product.originalPrice.toFixed(2)}</span>
                <span className="price-discount-badge">Save {discount}%</span>
              </>
            )}
          </div>
        </div>
      </Link>

      <div className="product-card-footer">
        <Link href={`/product/${product._id}`} className="btn btn-primary btn-full btn-sm">
          View Details
        </Link>
      </div>
    </article>
  )
}
