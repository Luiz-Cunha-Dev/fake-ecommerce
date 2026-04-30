'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Product, Review } from '@/lib/types'
import PriceEditor from '@/components/PriceEditor'
import ReviewForm from '@/components/ReviewForm'

function renderStars(rating: number) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty)
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (res.status === 404) { setNotFound(true); return null }
        return res.json()
      })
      .then((data) => {
        if (data) {
          setProduct(data)
          setReviews(data.reviews ?? [])
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  function handleReviewAdded(review: Review) {
    setReviews((prev) => {
      const next = [...prev, review]
      if (product) {
        const avg = next.reduce((s, r) => s + r.rating, 0) / next.length
        setProduct({ ...product, rating: parseFloat(avg.toFixed(1)), reviewCount: next.length })
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className="product-detail-page">
        <p style={{ color: 'var(--gray-500)', padding: '4rem 0', textAlign: 'center' }}>
          Loading…
        </p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="product-detail-page">
        <div className="error-state">
          <div className="error-icon">❌</div>
          <h2>Product not found</h2>
          <Link href="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <>
      <div className="product-detail-page">
        <div className="product-detail">
          {/* Gallery */}
          <div className="product-gallery">
            {discount > 0 && (
              <span className="product-badge badge-sale badge-lg">-{discount}%</span>
            )}
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="product-image-main"
              priority
            />
          </div>

          {/* Info */}
          <div className="product-details-info">
            <nav className="product-breadcrumb">
              <Link href="/">Products</Link>
              <span>›</span>
              <span>{product.category}</span>
              <span>›</span>
              <span>{product.title}</span>
            </nav>

            <h1 className="product-detail-title">{product.title}</h1>

            <div className="product-meta">
              <span className="product-category-tag">{product.category}</span>
              <span className="product-id-tag">SKU: {product.sku}</span>
            </div>

            <div className="product-rating">
              <span className="rating-stars">{renderStars(product.rating)}</span>
              <span className="rating-value">{product.rating.toFixed(1)}</span>
              <span className="rating-count">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>

            <div>
              <div className="product-price-block">
                <span className="price-currency">$</span>
                <span className="price-value">{product.price.toFixed(2)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="price-original">${product.originalPrice.toFixed(2)}</span>
                    <span className="price-discount-badge">Save {discount}%</span>
                  </>
                )}
              </div>
              <PriceEditor
                productId={product._id}
                initialPrice={product.price}
                onPriceUpdated={(newPrice) => setProduct({ ...product, price: newPrice })}
              />
            </div>

            <p className="product-description">{product.description}</p>

            <div>
              <p className="features-title">Key Features</p>
              <ul className="features-list">
                {product.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="reviews-section" id="reviews">
        <div className="reviews-header">
          <h2 className="reviews-title">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="reviews-avg">
              <span className="reviews-avg-value">{product.rating.toFixed(1)}</span>
              <span className="reviews-avg-stars">{renderStars(product.rating)}</span>
              <span className="reviews-avg-count">({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
            </div>
          )}
        </div>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((review, i) => (
              <div key={i} className="review-item">
                <div className="review-header">
                  <span className="review-author">{review.author}</span>
                  <span className="review-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  <span className="review-stars-value">{review.rating}/5</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))
          )}
        </div>

        <ReviewForm productId={product._id} onReviewAdded={handleReviewAdded} />
      </section>
    </>
  )
}
