import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import ProductGrid from '@/components/ProductGrid'
import { Product as IProduct } from '@/lib/types'

async function getProducts(): Promise<IProduct[]> {
  await connectDB()
  const products = await Product.find({}).lean()
  return products.map((p) => ({
    ...p,
    _id: (p._id as { toString(): string }).toString(),
  })) as IProduct[]
}

export default async function HomePage() {
  const products = await getProducts()

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

      {products.length === 0 ? (
        <section className="products-section">
          <div className="products-grid">
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h2 className="empty-title">No products yet</h2>
              <p className="empty-text">
                Seed the database by sending a POST request to{' '}
                <code>/api/seed</code>.
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
