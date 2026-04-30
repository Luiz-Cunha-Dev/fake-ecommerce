
import mongoose from 'mongoose';
import Product from '../lib/models/Product';
import https from 'https';

async function checkImageStatus(url: string): Promise<number> {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      resolve(res.statusCode || 0);
    });
    req.on('error', () => resolve(0));
    req.end();
  });
}

async function checkImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');

    const products = await Product.find({});
    console.log(`Checking status for ${products.length} products...`);

    for (const p of products) {
      const status = await checkImageStatus(p.image);
      console.log(`${status === 200 ? '✅' : '❌'} [${status}] ${p.title} - ${p.image}`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkImages();
