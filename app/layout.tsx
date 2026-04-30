import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechMart - Demo Store',
  description: 'Premium tech products at great prices',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-container">
            <a href="/" className="logo-link">
              <span className="logo-icon">🛒</span>
              <span className="logo-text">Tech<span>Mart</span></span>
            </a>
            <nav className="header-nav">
              <a href="/" className="nav-link active">Products</a>
            </nav>
            <span className="store-badge">Demo Store</span>
          </div>
        </header>

        <main className="main-content">{children}</main>

        <footer className="site-footer">
          <p className="footer-text">TechMart &copy; {new Date().getFullYear()}</p>
          <p className="footer-disclaimer">This is a demo store. No real transactions occur.</p>
        </footer>
      </body>
    </html>
  )
}
