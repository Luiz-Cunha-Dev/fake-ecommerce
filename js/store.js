/**
 * TechMart - In-Memory Store
 * All data lives in sessionStorage (cleared when browser/tab closes).
 * Classes and IDs are structured to facilitate data extraction via scraping.
 */

const STORE_KEY = 'techmart_data';

const initialProducts = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/61ddahpESML._AC_SY879_.jpg',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charging (3 min charge = 3 hours playback). Multipoint connection for two devices simultaneously.',
    features: ['Noise Canceling', '30hr Battery', 'Quick Charge', 'Multipoint Connection', 'Touch Controls'],
    reviews: [
      { id: 1, author: 'John D.', rating: 5, text: 'Best headphones I\'ve ever owned. The noise canceling is absolutely phenomenal. Highly recommend!', date: '2024-01-15' },
      { id: 2, author: 'Sarah M.', rating: 5, text: 'Worth every penny. Crystal clear sound and incredibly comfortable for long sessions.', date: '2024-01-20' },
      { id: 3, author: 'Mike R.', rating: 4, text: 'Great headphones, a bit pricey, but the sound quality is top notch. Battery lasts forever.', date: '2024-02-01' }
    ]
  },
  {
    id: 2,
    title: 'Logitech MX Keys Advanced Wireless Keyboard',
    category: 'Peripherals',
    price: 109.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/71Zxjm6UPmL._AC_SX522_.jpg',
    description: 'Advanced wireless illuminated keyboard designed to work with any computer, phone, or tablet. Smart backlighting adapts to your environment. Comfortable, concave keys with perfect keystroke.',
    features: ['Wireless Bluetooth', 'Backlit Keys', 'USB-C Charging', 'Multi-Device (3)', 'Quiet Typing'],
    reviews: [
      { id: 1, author: 'Alex T.', rating: 5, text: 'The best keyboard I\'ve used. Typing feel is amazing, backlight is perfect.', date: '2024-01-10' },
      { id: 2, author: 'Emma L.', rating: 4, text: 'Great keyboard but wish it had more programmable keys. Still, a daily driver for me.', date: '2024-02-05' }
    ]
  },
  {
    id: 3,
    title: 'Anker USB-C Hub 7-in-1 Adapter',
    category: 'Accessories',
    price: 45.99,
    originalPrice: 55.99,
    rating: 4.5,
    reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/71ABk4KbAuL._AC_SX522_.jpg',
    description: 'Expand your connectivity with 7 ports: 100W Power Delivery, 4K HDMI, USB-C data, 2x USB-A 3.0, SD and microSD card readers. Compact and portable design for work on the go.',
    features: ['100W PD Charging', '4K HDMI', '2x USB-A 3.0', 'SD + microSD', 'Plug & Play'],
    reviews: [
      { id: 1, author: 'Carlos P.', rating: 5, text: 'Works perfectly with my MacBook Pro. All 7 ports work as advertised.', date: '2024-01-05' },
      { id: 2, author: 'Linda W.', rating: 4, text: 'Good hub but gets slightly warm under heavy use. Functionality is great though.', date: '2024-01-18' },
      { id: 3, author: 'Tom K.', rating: 5, text: 'Exactly what I needed. Compact, powerful, reliable. Great value.', date: '2024-02-10' },
      { id: 4, author: 'Nina S.', rating: 4, text: '4K HDMI works great, SD card reader is fast. Happy with this purchase.', date: '2024-02-20' }
    ]
  },
  {
    id: 4,
    title: 'LG 27UN850-W 27" 4K UHD Monitor',
    category: 'Monitors',
    price: 449.99,
    originalPrice: 499.99,
    rating: 4.6,
    reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/519mhluOd3L._AC_SX522_.jpg',
    description: 'UHD 4K IPS display with VESA DisplayHDR 400. USB-C with 96W power delivery. Ideal for creators and professionals. Accurate color with DCI-P3 95% color gamut.',
    features: ['4K UHD 3840x2160', 'IPS Panel', 'USB-C 96W PD', 'HDR400', '95% DCI-P3'],
    reviews: [
      { id: 1, author: 'Rachel G.', rating: 5, text: 'Stunning picture quality. Colors are incredibly accurate for photo editing.', date: '2024-01-22' },
      { id: 2, author: 'David H.', rating: 5, text: 'The USB-C PD is a game changer. One cable for video + power. Love this monitor.', date: '2024-02-03' },
      { id: 3, author: 'Fiona B.', rating: 4, text: 'Great monitor but the stand is a bit wobbly. Picture quality is excellent.', date: '2024-02-15' }
    ]
  },
  {
    id: 5,
    title: 'Twelve South Curve SE Monitor Stand',
    category: 'Accessories',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/61-TzEg09KL._AC_SX679_.jpg',
    description: 'Elevate your monitor to the perfect ergonomic height. Solid steel construction holds displays up to 27". Hidden cable management channel keeps your desk clean and organized.',
    features: ['Supports up to 27"', 'Cable Management', 'Non-slip Feet', 'Steel Build', 'Open Storage Below'],
    reviews: [
      { id: 1, author: 'James O.', rating: 4, text: 'Solid and sturdy. Looks premium on my desk. Great cable management.', date: '2024-01-30' },
      { id: 2, author: 'Mia C.', rating: 5, text: 'Transformed my workspace. The elevated monitor position reduced my neck strain significantly.', date: '2024-02-08' }
    ]
  },
  {
    id: 6,
    title: 'Logitech C920x HD Pro Webcam',
    category: 'Peripherals',
    price: 69.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/61-6uAf8soL._AC_SX522_.jpg',
    description: 'Stream and record in full 1080p/30fps. Dual stereo microphones with automatic noise reduction. Works with all major video calling apps. Plug and play setup.',
    features: ['1080p/30fps', 'Dual Mic', 'Noise Reduction', 'Plug & Play', 'Clip-on Mount'],
    reviews: [
      { id: 1, author: 'Oscar M.', rating: 5, text: 'Crystal clear video quality. Microphone is surprisingly good. Perfect for remote work.', date: '2024-01-12' },
      { id: 2, author: 'Hannah R.', rating: 4, text: 'Good webcam for the price. Low-light performance could be better but overall solid.', date: '2024-01-28' },
      { id: 3, author: 'Ben F.', rating: 5, text: 'Setup was instant, no drivers needed. Video quality exceeded my expectations.', date: '2024-02-14' }
    ]
  },
  {
    id: 7,
    title: 'SteelSeries QcK XXL Gaming Mouse Pad',
    category: 'Peripherals',
    price: 39.99,
    originalPrice: 44.99,
    rating: 4.7,
    reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/41TYu-q4+XL._AC_SX522_.jpg',
    description: 'Extra large desk mat (900x400mm) with micro-woven cloth surface for precise mouse tracking. Stitched edges prevent fraying. Non-slip rubber base keeps it in place.',
    features: ['900x400mm XL', 'Micro-woven Surface', 'Stitched Edges', 'Non-slip Base', '2mm Thickness'],
    reviews: [
      { id: 1, author: 'Zoe A.', rating: 5, text: 'Covers my entire desk. Mouse glides perfectly and keyboard feels great on it.', date: '2024-01-17' },
      { id: 2, author: 'Liam T.', rating: 4, text: 'Great mat, really improves mouse precision. Edges are very well stitched.', date: '2024-02-06' }
    ]
  },
  {
    id: 8,
    title: 'BenQ ScreenBar Plus Monitor Light',
    category: 'Accessories',
    price: 109.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/41mSkDLG9EL._AC_SX679_.jpg',
    description: 'Monitor-mounted light bar with wireless remote dial. Asymmetric optical design illuminates only your desk, eliminating screen glare. Auto-dimming sensor adjusts to ambient light.',
    features: ['Wireless Remote Dial', 'Auto-dimming', 'No Screen Glare', 'USB-C Powered', 'Color Temp Adjustable'],
    reviews: [
      { id: 1, author: 'Sofia V.', rating: 5, text: 'No more eye strain during late night work sessions. The dial controller is super convenient.', date: '2024-01-25' },
      { id: 2, author: 'Noah J.', rating: 5, text: 'Best desk accessory I\'ve bought. Light quality is excellent and setup is dead simple.', date: '2024-02-02' },
      { id: 3, author: 'Isla P.', rating: 4, text: 'Great light, no screen glare at all. Wish it was a bit brighter at max setting.', date: '2024-02-18' }
    ]
  },
  {
    id: 9,
    title: 'Samsung T7 Portable SSD 1TB',
    category: 'Storage',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/91YfRIy7kYL._AC_SX522_.jpg',
    description: 'Blazing fast transfer speeds up to 1,050 MB/s read and 1,000 MB/s write. Compact and lightweight design fits in your pocket. Shock resistant with Dynamic Thermal Guard.',
    features: ['1,050 MB/s Read', '1,000 MB/s Write', 'Shock Resistant', 'USB 3.2 Gen 2', 'Password Protection'],
    reviews: [
      { id: 1, author: 'Ava K.', rating: 5, text: 'Incredibly fast. Transfer 4K footage in seconds. Build quality feels premium.', date: '2024-01-08' },
      { id: 2, author: 'Ethan C.', rating: 5, text: 'My favorite external drive. Compact, fast, and reliable. Highly recommended.', date: '2024-01-19' },
      { id: 3, author: 'Chloe W.', rating: 5, text: 'Works perfectly with my laptop and phone. The small size is a huge plus.', date: '2024-02-07' },
      { id: 4, author: 'Jack B.', rating: 4, text: 'Fast and well-built. Only giving 4 stars because it gets warm during large transfers.', date: '2024-02-22' }
    ]
  },
  {
    id: 10,
    title: 'Jabra Evolve2 65 Wireless Headset',
    category: 'Audio',
    price: 279.99,
    originalPrice: 319.99,
    rating: 4.6,
    reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/61FKdt+f-fL._AC_SX679_.jpg',
    description: 'Professional-grade wireless headset for business use. Advanced 6-microphone call technology for clearer calls. 37-hour battery life. Certified for Microsoft Teams and Zoom.',
    features: ['6-Mic Array', '37hr Battery', 'ANC', 'MS Teams Certified', 'USB-A + USB-C Dongle'],
    reviews: [
      { id: 1, author: 'Grace L.', rating: 5, text: 'Call quality is outstanding. Colleagues always comment on how clear I sound.', date: '2024-01-14' },
      { id: 2, author: 'Ryan S.', rating: 4, text: 'Excellent work headset. Comfortable all day and the mic quality is professional grade.', date: '2024-02-11' }
    ]
  }
];

// ─── Store API ─────────────────────────────────────────────────────────────────

const Store = {
  _data: null,

  _load() {
    if (this._data) return this._data;
    const saved = localStorage.getItem(STORE_KEY);
    if (saved) {
      this._data = JSON.parse(saved);
    } else {
      this._data = { products: JSON.parse(JSON.stringify(initialProducts)) };
      this._save();
    }
    return this._data;
  },

  _save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(this._data));
  },

  getAllProducts() {
    return this._load().products;
  },

  getProduct(id) {
    const numId = parseInt(id, 10);
    return this._load().products.find(p => p.id === numId) || null;
  },

  updatePrice(id, newPrice) {
    const data = this._load();
    const product = data.products.find(p => p.id === parseInt(id, 10));
    if (!product) return false;
    product.price = parseFloat(parseFloat(newPrice).toFixed(2));
    this._save();
    return true;
  },

  addReview(productId, review) {
    const data = this._load();
    const product = data.products.find(p => p.id === parseInt(productId, 10));
    if (!product) return false;

    const newId = product.reviews.length > 0
      ? Math.max(...product.reviews.map(r => r.id)) + 1
      : 1;

    product.reviews.push({
      id: newId,
      author: review.author,
      rating: parseInt(review.rating, 10),
      text: review.text,
      date: new Date().toISOString().split('T')[0]
    });

    // Recalculate average rating
    const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = parseFloat((total / product.reviews.length).toFixed(1));
    product.reviewCount = product.reviews.length;

    this._save();
    return true;
  },

  reset() {
    localStorage.removeItem(STORE_KEY);
    this._data = null;
  }
};
