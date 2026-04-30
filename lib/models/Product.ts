import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IReview {
  author: string
  rating: number
  text: string
  date: string
}

export interface IProduct extends Document {
  title: string
  category: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  image: string
  description: string
  features: string[]
  reviews: IReview[]
  sku: string
}

const ReviewSchema = new Schema<IReview>(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    date: { type: String, required: true },
  },
  { _id: false }
)

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    reviews: [ReviewSchema],
    sku: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

const Product: Model<IProduct> =
  (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>('Product', ProductSchema)

export default Product
