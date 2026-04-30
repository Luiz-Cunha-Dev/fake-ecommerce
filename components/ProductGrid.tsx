'use client'

import { useState, useMemo, useEffect } from 'react'
import { Product } from '@/lib/types'
import ProductCard from './ProductCard'

const CATEGORIES = ['All', 'Audio', 'Peripherals', 'Monitors', 'Storage', 'Accessories']
const PAGE_SIZE = 8

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating'

export default function ProductGrid({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<SortOption>('default')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = products

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category)
    }

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    else if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

    return result
  }, [products, search, category, sort])

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1) }, [search, category, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function getPageNumbers() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '…', totalPages]
    if (page >= totalPages - 3) return [1, '…', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '…', page - 1, page, page + 1, '…', totalPages]
  }

  return (
    <>
      <div className="filters-section">
        <div className="filters-container">
          <div className="search-box">
            <input
              type="search"
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <section className="products-section">
        <div className="products-meta">
          <p className="products-count-text">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            {totalPages > 1 && ` — page ${page} of ${totalPages}`}
          </p>
        </div>

        <div className="products-grid">
          {paginated.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h2 className="empty-title">No products found</h2>
              <p className="empty-text">Try adjusting your search or filters.</p>
            </div>
          ) : (
            paginated.map((product) => <ProductCard key={product._id} product={product} />)
          )}
        </div>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Product pages">
            <button
              className="pagination-btn"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹ Prev
            </button>

            <div className="pagination-pages">
              {getPageNumbers().map((n, i) =>
                n === '…' ? (
                  <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>
                ) : (
                  <button
                    key={n}
                    className={`pagination-page${page === n ? ' pagination-page-active' : ''}`}
                    onClick={() => setPage(n as number)}
                    aria-current={page === n ? 'page' : undefined}
                  >
                    {n}
                  </button>
                )
              )}
            </div>

            <button
              className="pagination-btn"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              Next ›
            </button>
          </nav>
        )}
      </section>
    </>
  )
}
