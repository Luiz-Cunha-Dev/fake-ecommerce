import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Product from '@/lib/models/Product'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { author, rating, text } = body

    if (!author?.trim() || !text?.trim() || !rating) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const ratingNum = parseInt(rating, 10)
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    await connectDB()
    const product = await Product.findById(id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const newReview = {
      author: author.trim(),
      rating: ratingNum,
      text: text.trim(),
      date: new Date().toISOString().split('T')[0],
    }

    product.reviews.push(newReview)

    const total = product.reviews.reduce((sum, r) => sum + r.rating, 0)
    product.rating = parseFloat((total / product.reviews.length).toFixed(1))
    product.reviewCount = product.reviews.length

    await product.save()
    return NextResponse.json({ success: true, review: newReview })
  } catch {
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 })
  }
}
