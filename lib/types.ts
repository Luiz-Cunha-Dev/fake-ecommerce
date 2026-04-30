export interface Review {
  author: string
  rating: number
  text: string
  date: string
}

export interface Product {
  _id: string
  title: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  description: string
  features: string[]
  reviews: Review[]
  sku: string
}
