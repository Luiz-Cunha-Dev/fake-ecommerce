'use client'

import { useState } from 'react'

interface Props {
  productId: string
  initialPrice: number
  onPriceUpdated?: (newPrice: number) => void
}

export default function PriceEditor({ productId, initialPrice, onPriceUpdated }: Props) {
  const [price, setPrice] = useState(initialPrice.toFixed(2))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSave() {
    const val = parseFloat(price)
    if (isNaN(val) || val <= 0) {
      setError('Enter a valid price greater than 0')
      return
    }

    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: val }),
      })

      if (!res.ok) throw new Error('Failed to update price')

      const updated = await res.json()
      setPrice(updated.price.toFixed(2))
      onPriceUpdated?.(updated.price)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    } catch {
      setError('Failed to save price. Try again.')
    } finally {
      setSaving(false)
    }
  }

  function handleReset() {
    setPrice(initialPrice.toFixed(2))
    setError('')
    setSuccess(false)
  }

  return (
    <div className="price-editor">
      <p className="form-label">Edit Price</p>
      <div className="price-editor-row">
        <span className="price-editor-symbol">$</span>
        <input
          type="number"
          min="0.01"
          step="0.01"
          className={`price-input${error ? ' input-error' : ''}`}
          value={price}
          onChange={(e) => { setPrice(e.target.value); setError('') }}
        />
        <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleReset} disabled={saving}>
          Reset
        </button>
      </div>
      {error && <p className="form-hint" style={{ color: 'var(--danger)', marginTop: '.5rem' }}>{error}</p>}
      {success && <p className="form-hint" style={{ color: 'var(--success)', marginTop: '.5rem' }}>Price updated!</p>}
    </div>
  )
}
