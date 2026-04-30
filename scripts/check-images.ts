
import mongoose from 'mongoose';
import Product from '../lib/models/Product';

async function checkImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    products.forEach((p, index) => {
      console.log(`${index + 1}. ${p.title} - ${p.image}`);
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();
