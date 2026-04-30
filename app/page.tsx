export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import ProductGrid from '@/components/ProductGrid'
import { Product as IProduct } from '@/lib/types'

async function getProducts(): Promise<{ products: IProduct[]; error?: string }> {
  try {
    await connectDB()
    const products = await Product.find({}).lean()
    return {
      products: products.map((p) => ({
        ...p,
        _id: (p._id as { toString(): string }).toString(),
      })) as IProduct[],
    }
  } catch (err) {
    console.error('[getProducts]', err)
    return { products: [], error: 'Failed to connect to the database.' }
  }
}

export default async function HomePage() {
  const { products, error } = await getProducts()

  return (
    <>
      <div className="hero-banner">
        <h1 className="hero-title">Premium Tech Products</h1>
        <p className="hero-subtitle">
          {products.length > 0
            ? `Browse ${products.length} curated products`
            : 'Discover our curated selection of premium tech gear'}
        </p>
      </div>

      {error ? (
        <section className="products-section">
          <div className="products-grid">
            <div className="error-state">
              <div className="error-icon">⚠️</div>
              <h2>Database unavailable</h2>
              <p>{error}</p>
            </div>
          </div>
        </section>
      ) : products.length === 0 ? (
        <section className="products-section">
          <div className="products-grid">
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2 className="empty-title">No products yet</h2>
              <p className="empty-text">
                Seed the database by sending a POST request to <code>/api/seed</code>.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  )
}
