'use client'

import { useState } from 'react'
import { Review } from '@/lib/types'

interface Props {
  productId: string
  onReviewAdded: (review: Review) => void
}

export default function ReviewForm({ productId, onReviewAdded }: Props) {
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!author.trim() || !text.trim() || !rating) {
      setMessage({ type: 'error', text: 'Please fill in all fields and select a rating.' })
      return
    }

    setSubmitting(true)
    setMessage(null)

    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, rating, text }),
      })

      if (!res.ok) throw new Error('Failed to submit review')

      const data = await res.json()
      onReviewAdded(data.review)
      setAuthor('')
      setRating(0)
      setText('')
      setMessage({ type: 'success', text: 'Review submitted successfully!' })
    } catch {
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="add-review-section">
      <h3 className="add-review-title">Write a Review</h3>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={60}
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Rating <span className="required">*</span>
          </label>
          <div className="star-picker">
            {[5, 4, 3, 2, 1].map((star) => (
              <label key={star} title={`${star} star${star !== 1 ? 's' : ''}`}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
                ★
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Review <span className="required">*</span>
          </label>
          <textarea
            className="form-control"
            placeholder="Share your experience..."
            rows={4}
            maxLength={500}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className="char-count">{text.length}/500</p>
        </div>

        {message && (
          <div className={`form-message form-message-${message.type}`}>{message.text}</div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => { setAuthor(''); setRating(0); setText(''); setMessage(null) }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}
