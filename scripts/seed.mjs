import mongoose from 'mongoose'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Load .env.local manually
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env.local')
const envContent = readFileSync(envPath, 'utf-8')
const uri = envContent.match(/MONGODB_URI=(.+)/)?.[1]?.trim()

if (!uri) {
  console.error('MONGODB_URI not found in .env.local')
  process.exit(1)
}

const ReviewSchema = new mongoose.Schema(
  { author: String, rating: Number, text: String, date: String },
  { _id: false }
)

const ProductSchema = new mongoose.Schema({
  title: String, category: String, price: Number, originalPrice: Number,
  rating: Number, reviewCount: Number, image: String, description: String,
  features: [String], reviews: [ReviewSchema], sku: { type: String, unique: true },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)

const products = [
  // ── Audio ───────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-001', title: 'Sony WH-1000XM5 Wireless Headphones', category: 'Audio',
    price: 349.99, originalPrice: 399.99, rating: 4.8, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/61ddahpESML._AC_SY879_.jpg',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charging (3 min charge = 3 hours playback). Multipoint connection for two devices simultaneously.',
    features: ['Noise Canceling', '30hr Battery', 'Quick Charge', 'Multipoint Connection', 'Touch Controls'],
    reviews: [
      { author: 'John D.', rating: 5, text: "Best headphones I've ever owned. The noise canceling is absolutely phenomenal. Highly recommend!", date: '2024-01-15' },
      { author: 'Sarah M.', rating: 5, text: 'Worth every penny. Crystal clear sound and incredibly comfortable for long sessions.', date: '2024-01-20' },
      { author: 'Mike R.', rating: 4, text: 'Great headphones, a bit pricey, but the sound quality is top notch. Battery lasts forever.', date: '2024-02-01' },
    ],
  },
  {
    sku: 'SKU-010', title: 'Jabra Evolve2 65 Wireless Headset', category: 'Audio',
    price: 279.99, originalPrice: 319.99, rating: 4.6, reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/61FKdt+f-fL._AC_SX679_.jpg',
    description: 'Professional-grade wireless headset for business use. Advanced 6-microphone call technology for clearer calls. 37-hour battery life. Certified for Microsoft Teams and Zoom.',
    features: ['6-Mic Array', '37hr Battery', 'ANC', 'MS Teams Certified', 'USB-A + USB-C Dongle'],
    reviews: [
      { author: 'Grace L.', rating: 5, text: 'Call quality is outstanding. Colleagues always comment on how clear I sound.', date: '2024-01-14' },
      { author: 'Ryan S.', rating: 4, text: 'Excellent work headset. Comfortable all day and the mic quality is professional grade.', date: '2024-02-11' },
    ],
  },
  {
    sku: 'SKU-014', title: 'Apple AirPods Pro (2nd Generation)', category: 'Audio',
    price: 219.99, originalPrice: 249.99, rating: 4.9, reviewCount: 5,
    image: 'https://m.media-amazon.com/images/I/41KJmvuQu4L._AC_UF1000,1000_QL80_.jpg',
    description: 'Up to 2x more Active Noise Cancellation than AirPods Pro 1st gen. Adaptive Transparency lets outside sound in while reducing loud environmental noise. Personalized Spatial Audio with dynamic head tracking.',
    features: ['ANC 2x Stronger', 'Adaptive Transparency', 'Spatial Audio', 'MagSafe Charging', 'H2 Chip'],
    reviews: [
      { author: 'Lily T.', rating: 5, text: 'The best earbuds I have ever used. ANC is incredible on flights.', date: '2024-01-05' },
      { author: 'Marco P.', rating: 5, text: 'Sound quality is amazing. Spatial Audio feels like magic.', date: '2024-01-18' },
      { author: 'Diana K.', rating: 5, text: 'Upgraded from gen 1 and the difference in noise cancellation is night and day.', date: '2024-02-03' },
      { author: 'Chris W.', rating: 5, text: 'Seamless switching between Apple devices. Worth every penny.', date: '2024-02-14' },
      { author: 'Anna B.', rating: 4, text: 'Exceptional sound and ANC. Wish the case was more scratch-resistant.', date: '2024-02-28' },
    ],
  },
  {
    sku: 'SKU-020', title: 'Rode NT-USB Mini Microphone', category: 'Peripherals',
    price: 99.99, originalPrice: 119.99, rating: 4.7, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/51mi31NUkvL.jpg',
    description: 'Professional-quality USB microphone with studio-grade capsule. Ideal for podcasting, streaming, and remote work. Plug-and-play with zero-latency headphone monitoring. Compact and desktop-ready.',
    features: ['Studio Capsule', 'Zero-latency Monitor', 'USB-C', 'Plug & Play', 'Compact Design'],
    reviews: [
      { author: 'Felix R.', rating: 5, text: 'Sounds incredibly professional. My podcast listeners noticed the upgrade immediately.', date: '2024-01-22' },
      { author: 'Natalie S.', rating: 5, text: 'Super easy to set up, sounds amazing. Great for remote meetings.', date: '2024-02-05' },
      { author: 'Owen M.', rating: 4, text: 'Crystal clear audio. The compact size is a big plus for my desk.', date: '2024-02-19' },
    ],
  },

  // ── Peripherals ─────────────────────────────────────────────────────────────
  {
    sku: 'SKU-002', title: 'Logitech MX Keys Advanced Wireless Keyboard', category: 'Peripherals',
    price: 109.99, originalPrice: 129.99, rating: 4.7, reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/71Zxjm6UPmL._AC_SX522_.jpg',
    description: 'Advanced wireless illuminated keyboard designed to work with any computer, phone, or tablet. Smart backlighting adapts to your environment. Comfortable, concave keys with perfect keystroke.',
    features: ['Wireless Bluetooth', 'Backlit Keys', 'USB-C Charging', 'Multi-Device (3)', 'Quiet Typing'],
    reviews: [
      { author: 'Alex T.', rating: 5, text: "The best keyboard I've used. Typing feel is amazing, backlight is perfect.", date: '2024-01-10' },
      { author: 'Emma L.', rating: 4, text: 'Great keyboard but wish it had more programmable keys. Still, a daily driver for me.', date: '2024-02-05' },
    ],
  },
  {
    sku: 'SKU-006', title: 'Logitech C920x HD Pro Webcam', category: 'Peripherals',
    price: 69.99, originalPrice: 79.99, rating: 4.6, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/61-6uAf8soL._AC_SX522_.jpg',
    description: 'Stream and record in full 1080p/30fps. Dual stereo microphones with automatic noise reduction. Works with all major video calling apps. Plug and play setup.',
    features: ['1080p/30fps', 'Dual Mic', 'Noise Reduction', 'Plug & Play', 'Clip-on Mount'],
    reviews: [
      { author: 'Oscar M.', rating: 5, text: 'Crystal clear video quality. Microphone is surprisingly good. Perfect for remote work.', date: '2024-01-12' },
      { author: 'Hannah R.', rating: 4, text: 'Good webcam for the price. Low-light performance could be better but overall solid.', date: '2024-01-28' },
      { author: 'Ben F.', rating: 5, text: 'Setup was instant, no drivers needed. Video quality exceeded my expectations.', date: '2024-02-14' },
    ],
  },
  {
    sku: 'SKU-007', title: 'SteelSeries QcK XXL Gaming Mouse Pad', category: 'Peripherals',
    price: 39.99, originalPrice: 44.99, rating: 4.7, reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/41TYu-q4+XL._AC_SX522_.jpg',
    description: 'Extra large desk mat (900x400mm) with micro-woven cloth surface for precise mouse tracking. Stitched edges prevent fraying. Non-slip rubber base keeps it in place.',
    features: ['900x400mm XL', 'Micro-woven Surface', 'Stitched Edges', 'Non-slip Base', '2mm Thickness'],
    reviews: [
      { author: 'Zoe A.', rating: 5, text: 'Covers my entire desk. Mouse glides perfectly and keyboard feels great on it.', date: '2024-01-17' },
      { author: 'Liam T.', rating: 4, text: 'Great mat, really improves mouse precision. Edges are very well stitched.', date: '2024-02-06' },
    ],
  },
  {
    sku: 'SKU-011', title: 'Razer DeathAdder V3 Gaming Mouse', category: 'Peripherals',
    price: 69.99, originalPrice: 79.99, rating: 4.8, reviewCount: 4,
    image: 'https://images.kabum.com.br/produtos/fotos/715915/mouse-razer-deathadder-v3-30-000dpi-preto-rz0104640100_1744114351_gg.jpg',
    description: 'Ultra-lightweight ergonomic gaming mouse at just 63g. 30K DPI optical sensor with 750 IPS tracking. Up to 90 hours battery life on a single charge. Razer HyperSpeed wireless technology.',
    features: ['63g Ultralight', '30K DPI Sensor', '90hr Battery', 'HyperSpeed Wireless', 'Ergonomic Shape'],
    reviews: [
      { author: 'Tyler H.', rating: 5, text: 'Incredible tracking and incredibly light. The best gaming mouse I have owned.', date: '2024-01-09' },
      { author: 'Priya N.', rating: 5, text: 'The sensor is flawless. Zero mouse acceleration. A must-have for FPS games.', date: '2024-01-25' },
      { author: 'Luke D.', rating: 5, text: 'Battery lasts forever. Feels amazing in hand all day long.', date: '2024-02-08' },
      { author: 'Sara K.', rating: 4, text: 'Excellent mouse. Right-hand only shape may not suit everyone.', date: '2024-02-21' },
    ],
  },
  {
    sku: 'SKU-012', title: 'Keychron K2 Pro Wireless Mechanical Keyboard', category: 'Peripherals',
    price: 89.99, originalPrice: 99.99, rating: 4.6, reviewCount: 3,
    image: 'https://keychron.net.br/cdn/shop/products/Keychron-K2-Pro-QMK-VIA-Wireless-Mechanical-Keyboard-for-Mac-Windows-PBT-keycaps-PCB-screw-in-stabilizer-hot-swappable-blue-switch_1800x1800_a104cc5a-0af7-4072-8462-b9ae3a9f795e.jpg?v=1745828377&width=1214',
    description: 'Compact 75% hot-swappable mechanical keyboard with RGB backlight. Compatible with Mac and Windows. QMK/VIA programmable. Works wired and wireless via Bluetooth 5.1 with up to 3 devices.',
    features: ['Hot-swappable', 'QMK/VIA', 'Bluetooth 5.1', 'Mac & Windows', 'RGB Backlight'],
    reviews: [
      { author: 'Jordan F.', rating: 5, text: 'Perfect compact keyboard. The hot-swap feature lets me experiment with switches easily.', date: '2024-01-13' },
      { author: 'Mei L.', rating: 4, text: 'Great build quality, satisfying typing feel. The Bluetooth connection is rock solid.', date: '2024-02-01' },
      { author: 'Raj P.', rating: 5, text: 'Love the QMK support. Fully customizable and built like a tank.', date: '2024-02-17' },
    ],
  },
  {
    sku: 'SKU-017', title: 'Logitech MX Master 3S Wireless Mouse', category: 'Peripherals',
    price: 99.99, originalPrice: 109.99, rating: 4.8, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SX679_.jpg',
    description: '8K DPI any-surface tracking, near-silent clicks, and MagSpeed electromagnetic scrolling. Work across multiple computers with Logi Flow. Up to 70 days battery on a full charge.',
    features: ['8K DPI', 'MagSpeed Scroll', 'Logi Flow', '70-day Battery', 'Near-silent Clicks'],
    reviews: [
      { author: 'Claire V.', rating: 5, text: 'The MagSpeed scroll wheel is life-changing for productivity. Best mouse ever.', date: '2024-01-07' },
      { author: 'Tom A.', rating: 5, text: 'Logi Flow between two computers is seamless. Incredible mouse.', date: '2024-01-23' },
      { author: 'Yuki S.', rating: 5, text: 'Ergonomics are perfect. Silent clicks are a huge plus in open offices.', date: '2024-02-09' },
      { author: 'Dan M.', rating: 4, text: 'Premium feel and performance. Slightly pricey but worth it for professionals.', date: '2024-02-25' },
    ],
  },
  {
    sku: 'SKU-021', title: 'Corsair K70 RGB Pro Mechanical Keyboard', category: 'Peripherals',
    price: 139.99, originalPrice: 159.99, rating: 4.5, reviewCount: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaxfEsJvRcJi-PDfvzQ7Ff334rLRzUEgyojw&s',
    description: 'Full-size gaming keyboard with aircraft-grade aluminum frame and Cherry MX switches. Per-key RGB lighting with iCUE software. 8MB onboard storage for up to 50 lighting and macro profiles.',
    features: ['Cherry MX Switches', 'Aircraft Aluminum', 'Per-key RGB', '8MB Onboard Storage', 'iCUE Compatible'],
    reviews: [
      { author: 'Ian G.', rating: 5, text: 'The aluminum frame feels premium. Cherry MX Reds are buttery smooth.', date: '2024-01-16' },
      { author: 'Sophia R.', rating: 4, text: 'Excellent keyboard but iCUE software can be heavy on resources.', date: '2024-02-04' },
      { author: 'Carlos M.', rating: 5, text: 'RGB is stunning and the build quality is top notch. Very satisfied.', date: '2024-02-20' },
    ],
  },

  // ── Monitors ─────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-004', title: 'LG 27UN850-W 27" 4K UHD Monitor', category: 'Monitors',
    price: 449.99, originalPrice: 499.99, rating: 4.6, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/519mhluOd3L._AC_SX522_.jpg',
    description: 'UHD 4K IPS display with VESA DisplayHDR 400. USB-C with 96W power delivery. Ideal for creators and professionals. Accurate color with DCI-P3 95% color gamut.',
    features: ['4K UHD 3840x2160', 'IPS Panel', 'USB-C 96W PD', 'HDR400', '95% DCI-P3'],
    reviews: [
      { author: 'Rachel G.', rating: 5, text: 'Stunning picture quality. Colors are incredibly accurate for photo editing.', date: '2024-01-22' },
      { author: 'David H.', rating: 5, text: 'The USB-C PD is a game changer. One cable for video + power. Love this monitor.', date: '2024-02-03' },
      { author: 'Fiona B.', rating: 4, text: 'Great monitor but the stand is a bit wobbly. Picture quality is excellent.', date: '2024-02-15' },
    ],
  },
  {
    sku: 'SKU-015', title: 'ASUS ProArt PA278QV 27" WQHD Monitor', category: 'Monitors',
    price: 329.99, originalPrice: 379.99, rating: 4.7, reviewCount: 3,
    image: 'https://images8.kabum.com.br/produtos/fotos/132028/monitor-asus-proart-pa278qv-profissional-27-hdmi-displayport-ips-wqhd-srgb-proart-preset-proart-palette-90lm05l1-b013x0_1617023781_gg.jpg',
    description: '27-inch WQHD (2560x1440) IPS panel with 100% sRGB and 100% Rec. 709 coverage. Factory-calibrated with Delta E < 2. Ergonomic stand with tilt, swivel, pivot and height adjustment.',
    features: ['WQHD 2560x1440', '100% sRGB', 'Delta E < 2', 'Factory Calibrated', 'Ergonomic Stand'],
    reviews: [
      { author: 'Alicia V.', rating: 5, text: 'Colors are absolutely accurate out of the box. Perfect for graphic design work.', date: '2024-01-11' },
      { author: 'Brett S.', rating: 5, text: 'Best monitor in this price range for color-critical work. Highly recommended.', date: '2024-01-29' },
      { author: 'Cora J.', rating: 4, text: 'Excellent color accuracy. Would love USB-C, but still a fantastic display.', date: '2024-02-16' },
    ],
  },

  // ── Storage ──────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-009', title: 'Samsung T7 Portable SSD 1TB', category: 'Storage',
    price: 89.99, originalPrice: 119.99, rating: 4.8, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/91YfRIy7kYL._AC_SX522_.jpg',
    description: 'Blazing fast transfer speeds up to 1,050 MB/s read and 1,000 MB/s write. Compact and lightweight design fits in your pocket. Shock resistant with Dynamic Thermal Guard.',
    features: ['1,050 MB/s Read', '1,000 MB/s Write', 'Shock Resistant', 'USB 3.2 Gen 2', 'Password Protection'],
    reviews: [
      { author: 'Ava K.', rating: 5, text: 'Incredibly fast. Transfer 4K footage in seconds. Build quality feels premium.', date: '2024-01-08' },
      { author: 'Ethan C.', rating: 5, text: 'My favorite external drive. Compact, fast, and reliable. Highly recommended.', date: '2024-01-19' },
      { author: 'Chloe W.', rating: 5, text: 'Works perfectly with my laptop and phone. The small size is a huge plus.', date: '2024-02-07' },
      { author: 'Jack B.', rating: 4, text: 'Fast and well-built. Only giving 4 stars because it gets warm during large transfers.', date: '2024-02-22' },
    ],
  },
  {
    sku: 'SKU-018', title: 'Samsung 970 EVO Plus 1TB NVMe SSD', category: 'Storage',
    price: 74.99, originalPrice: 99.99, rating: 4.8, reviewCount: 5,
    image: 'https://m.media-amazon.com/images/I/71OYNmVRFhL.jpg',
    description: 'PCIe Gen 3 NVMe M.2 SSD with sequential read speeds up to 3,500 MB/s and write speeds up to 3,300 MB/s. Nickel-coated controller and heat spreader label for thermal management.',
    features: ['3,500 MB/s Read', '3,300 MB/s Write', 'PCIe Gen 3 NVMe', 'M.2 2280', '5-year Warranty'],
    reviews: [
      { author: 'Victor H.', rating: 5, text: 'Boot times cut from 45 to 8 seconds. Unbelievable upgrade.', date: '2024-01-04' },
      { author: 'Ingrid P.', rating: 5, text: 'Fast, reliable, and runs cool. The 5-year warranty gives me peace of mind.', date: '2024-01-20' },
      { author: 'Sam T.', rating: 5, text: 'Best price-to-performance NVMe drive out there. Highly recommended.', date: '2024-02-02' },
      { author: 'Elena W.', rating: 5, text: 'Flawless performance. My DAW loads in seconds now.', date: '2024-02-13' },
      { author: 'Mark D.', rating: 4, text: 'Excellent speeds, easy to install. No issues after 3 months of heavy use.', date: '2024-02-27' },
    ],
  },
  {
    sku: 'SKU-022', title: 'WD My Passport 5TB Portable Hard Drive', category: 'Storage',
    price: 99.99, originalPrice: 119.99, rating: 4.4, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/51tXR09l5qL.jpg',
    description: 'Slim and lightweight portable hard drive with 5TB capacity. Hardware encryption with password protection. Compatible with USB 3.0 and 2.0. Includes 3-year data recovery services.',
    features: ['5TB Capacity', 'Hardware Encryption', 'USB 3.0', '3-year Warranty', 'Backup Software'],
    reviews: [
      { author: 'Paul N.', rating: 5, text: 'Great capacity for the price. Perfect for media storage and backups.', date: '2024-01-10' },
      { author: 'Kate M.', rating: 4, text: 'Reliable and compact. Not as fast as SSD but great for archiving.', date: '2024-01-27' },
      { author: 'Rob G.', rating: 4, text: 'Solid drive. The included backup software works well out of the box.', date: '2024-02-12' },
    ],
  },

  // ── Accessories ──────────────────────────────────────────────────────────────
  {
    sku: 'SKU-003', title: 'Anker USB-C Hub 7-in-1 Adapter', category: 'Accessories',
    price: 45.99, originalPrice: 55.99, rating: 4.5, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/71ABk4KbAuL._AC_SX522_.jpg',
    description: 'Expand your connectivity with 7 ports: 100W Power Delivery, 4K HDMI, USB-C data, 2x USB-A 3.0, SD and microSD card readers. Compact and portable design for work on the go.',
    features: ['100W PD Charging', '4K HDMI', '2x USB-A 3.0', 'SD + microSD', 'Plug & Play'],
    reviews: [
      { author: 'Carlos P.', rating: 5, text: 'Works perfectly with my MacBook Pro. All 7 ports work as advertised.', date: '2024-01-05' },
      { author: 'Linda W.', rating: 4, text: 'Good hub but gets slightly warm under heavy use. Functionality is great though.', date: '2024-01-18' },
      { author: 'Tom K.', rating: 5, text: 'Exactly what I needed. Compact, powerful, reliable. Great value.', date: '2024-02-10' },
      { author: 'Nina S.', rating: 4, text: '4K HDMI works great, SD card reader is fast. Happy with this purchase.', date: '2024-02-20' },
    ],
  },
  {
    sku: 'SKU-005', title: 'Twelve South Curve SE Monitor Stand', category: 'Accessories',
    price: 49.99, originalPrice: 59.99, rating: 4.4, reviewCount: 2,
    image: 'https://m.media-amazon.com/images/I/61-TzEg09KL._AC_SX679_.jpg',
    description: 'Elevate your monitor to the perfect ergonomic height. Solid steel construction holds displays up to 27". Hidden cable management channel keeps your desk clean and organized.',
    features: ['Supports up to 27"', 'Cable Management', 'Non-slip Feet', 'Steel Build', 'Open Storage Below'],
    reviews: [
      { author: 'James O.', rating: 4, text: 'Solid and sturdy. Looks premium on my desk. Great cable management.', date: '2024-01-30' },
      { author: 'Mia C.', rating: 5, text: 'Transformed my workspace. The elevated monitor position reduced my neck strain significantly.', date: '2024-02-08' },
    ],
  },
  {
    sku: 'SKU-008', title: 'BenQ ScreenBar Plus Monitor Light', category: 'Accessories',
    price: 109.99, originalPrice: 129.99, rating: 4.5, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/41mSkDLG9EL._AC_SX679_.jpg',
    description: 'Monitor-mounted light bar with wireless remote dial. Asymmetric optical design illuminates only your desk, eliminating screen glare. Auto-dimming sensor adjusts to ambient light.',
    features: ['Wireless Remote Dial', 'Auto-dimming', 'No Screen Glare', 'USB-C Powered', 'Color Temp Adjustable'],
    reviews: [
      { author: 'Sofia V.', rating: 5, text: 'No more eye strain during late night work sessions. The dial controller is super convenient.', date: '2024-01-25' },
      { author: 'Noah J.', rating: 5, text: "Best desk accessory I've bought. Light quality is excellent and setup is dead simple.", date: '2024-02-02' },
      { author: 'Isla P.', rating: 4, text: 'Great light, no screen glare at all. Wish it was a bit brighter at max setting.', date: '2024-02-18' },
    ],
  },
  {
    sku: 'SKU-013', title: 'Elgato Stream Deck MK.2', category: 'Accessories',
    price: 149.99, originalPrice: 179.99, rating: 4.7, reviewCount: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFr8dG9enJfg5v7auUc7qZXTsh86QAdKj8A&s',
    description: '15 customizable LCD keys to launch unlimited actions. Control streaming apps, social media, lights, audio, and more with a tap. Create multi-step commands with drag-and-drop ease.',
    features: ['15 LCD Keys', 'Fully Customizable', 'Drag & Drop', 'Multi-step Actions', 'USB-C'],
    reviews: [
      { author: 'Lucas F.', rating: 5, text: 'Transformed my streaming workflow. The customizable keys are endlessly useful.', date: '2024-01-06' },
      { author: 'Hannah J.', rating: 5, text: 'Not just for streamers — I use it for all kinds of productivity shortcuts.', date: '2024-01-21' },
      { author: 'Ethan P.', rating: 4, text: 'Excellent product. The software could be a bit more intuitive.', date: '2024-02-05' },
      { author: 'Olivia T.', rating: 5, text: 'Game changer for content creation. Every creator should have one.', date: '2024-02-23' },
    ],
  },
  {
    sku: 'SKU-016', title: 'Anker 737 Power Bank 24000mAh', category: 'Accessories',
    price: 79.99, originalPrice: 99.99, rating: 4.6, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/71usOrOSV4L.jpg',
    description: '140W total output with 3 ports for charging laptops, tablets, and phones simultaneously. Smart digital display shows real-time wattage, voltage, and remaining charge. Charges itself in just 1.5 hours.',
    features: ['24000mAh', '140W Output', '3 Ports', 'Digital Display', '1.5hr Recharge'],
    reviews: [
      { author: 'Nina T.', rating: 5, text: 'Charges my MacBook Pro and iPhone at full speed simultaneously. Incredible.', date: '2024-01-15' },
      { author: 'George L.', rating: 4, text: 'Very powerful and the display is super useful. A bit heavy but expected for the capacity.', date: '2024-02-01' },
      { author: 'Amara D.', rating: 5, text: 'Best power bank I have ever owned. The 1.5hr recharge time is insane.', date: '2024-02-18' },
    ],
  },
  {
    sku: 'SKU-019', title: 'Elgato Key Light Air', category: 'Accessories',
    price: 99.99, originalPrice: 129.99, rating: 4.5, reviewCount: 3,
    image: 'https://images.kabum.com.br/produtos/fotos/111534/key-light-air-elgato-10lab9901_1586356470_g.jpg',
    description: 'Professional studio lighting for streaming and video calls. 1400 lumens with adjustable color temperature (2900–7000K) and brightness (0–100%). Control via app, Stream Deck, or voice assistants.',
    features: ['1400 Lumens', '2900–7000K Temp', 'App Controlled', 'Wi-Fi', 'Stream Deck Compatible'],
    reviews: [
      { author: 'Zara H.', rating: 5, text: 'My video calls look so much more professional now. The color temp control is great.', date: '2024-01-18' },
      { author: 'Patrick O.', rating: 4, text: 'Great light, easy to set up via app. The clamp is very sturdy.', date: '2024-02-03' },
      { author: 'Leah W.', rating: 5, text: 'Perfect for my streaming setup. Pairs great with my Stream Deck.', date: '2024-02-21' },
    ],
  },
]

const extraProducts = [
  // ── Audio ───────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-023', title: 'Bose QuietComfort 45 Wireless Headphones', category: 'Audio',
    price: 279.99, originalPrice: 329.99, rating: 4.7, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/51HHABMPoVL.jpg',
    description: 'Legendary Bose noise cancellation in an incredibly comfortable over-ear design. Quiet Mode blocks out the world, Aware Mode keeps you connected to your surroundings. Up to 24 hours of battery life.',
    features: ['Quiet & Aware Mode', '24hr Battery', 'Bluetooth 5.1', 'USB-C Charging', 'Foldable Design'],
    reviews: [
      { author: 'Monica R.', rating: 5, text: 'Bose comfort is unmatched. Wore these on a 10-hour flight without any discomfort.', date: '2024-01-08' },
      { author: 'Derek S.', rating: 5, text: 'The noise cancellation is excellent. Perfect for open-plan offices.', date: '2024-01-24' },
      { author: 'Paula T.', rating: 4, text: 'Great headphones. Sound signature is warm and pleasant for long listening sessions.', date: '2024-02-09' },
      { author: 'Aaron K.', rating: 5, text: 'Aware Mode is fantastic. I can hear what is going on without taking them off.', date: '2024-02-26' },
    ],
  },
  {
    sku: 'SKU-024', title: 'Sony WF-1000XM5 True Wireless Earbuds', category: 'Audio',
    price: 249.99, originalPrice: 299.99, rating: 4.8, reviewCount: 5,
    image: 'https://m.media-amazon.com/images/I/61GJAFdM9pL.jpg',
    description: 'Best-in-class noise cancellation in a compact earbud. 8.4mm driver delivers premium sound. Up to 8 hours battery with 24 more in the case. Multipoint connection for two devices simultaneously.',
    features: ['Best-in-class ANC', '8.4mm Driver', '8+24hr Battery', 'Multipoint', 'IPX4 Water Resistant'],
    reviews: [
      { author: 'Keiko N.', rating: 5, text: 'These are the best earbuds I have ever used. ANC rivals full over-ear cans.', date: '2024-01-03' },
      { author: 'Bruno M.', rating: 5, text: 'Sound quality is incredible. Rich bass, clear mids, crisp highs.', date: '2024-01-17' },
      { author: 'Tanya W.', rating: 5, text: 'Multipoint works flawlessly. Switching from laptop to phone is seamless.', date: '2024-02-01' },
      { author: 'Justin L.', rating: 5, text: 'Smaller than XM4 and noticeably better ANC. Worth every cent.', date: '2024-02-14' },
      { author: 'Sara O.', rating: 4, text: 'Phenomenal sound and ANC. The touch controls take some getting used to.', date: '2024-02-28' },
    ],
  },
  {
    sku: 'SKU-025', title: 'JBL Charge 5 Portable Bluetooth Speaker', category: 'Audio',
    price: 149.99, originalPrice: 179.99, rating: 4.6, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/61qMO3TS2RL._AC_UF1000,1000_QL80_.jpg',
    description: 'Powerful portable speaker with deep bass from a separate woofer and tweeter. IP67 waterproof and dustproof. 20-hour playtime and a built-in power bank to charge your devices.',
    features: ['IP67 Waterproof', '20hr Playtime', 'Power Bank', 'JBL PartyBoost', 'USB-C Charging'],
    reviews: [
      { author: 'Diego F.', rating: 5, text: 'Bass is outstanding for such a compact speaker. Survived a beach trip no problem.', date: '2024-01-11' },
      { author: 'Fran B.', rating: 4, text: 'Great sound and I love being able to charge my phone from it.', date: '2024-01-26' },
      { author: 'Hank V.', rating: 5, text: 'The IP67 rating is real — dropped it in the pool and it kept playing.', date: '2024-02-10' },
      { author: 'Iris L.', rating: 5, text: 'Loud and clear. The PartyBoost feature is great for pairing two together.', date: '2024-02-24' },
    ],
  },
  {
    sku: 'SKU-026', title: 'Sennheiser HD 660S2 Open-Back Headphones', category: 'Audio',
    price: 349.99, originalPrice: 399.99, rating: 4.8, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/81xpWUthgjL._AC_UF1000,1000_QL80_.jpg',
    description: 'Reference-grade open-back headphones for audiophiles and studio professionals. 300-ohm impedance driver delivers exceptional detail and a wide natural soundstage. Includes balanced and unbalanced cables.',
    features: ['Open-Back Design', '300-ohm Driver', 'Wide Soundstage', 'Balanced Cable Included', 'Audiophile Grade'],
    reviews: [
      { author: 'Leonard A.', rating: 5, text: 'The most natural, accurate sound I have ever heard from headphones. Incredible.', date: '2024-01-14' },
      { author: 'Camille D.', rating: 5, text: 'Perfect for mixing. The soundstage is enormous and imaging is razor sharp.', date: '2024-02-02' },
      { author: 'Niko P.', rating: 5, text: 'Sennheiser quality at its finest. These will last decades.', date: '2024-02-19' },
    ],
  },

  // ── Peripherals ─────────────────────────────────────────────────────────────
  {
    sku: 'SKU-027', title: 'Apple Magic Keyboard with Touch ID', category: 'Peripherals',
    price: 99.99, originalPrice: 109.99, rating: 4.7, reviewCount: 3,
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXCK3?wid=4000&hei=4000&fmt=jpeg&qlt=90&.v=1730320444782',
    description: 'Thin, light wireless keyboard with a built-in Touch ID sensor for secure logins and Apple Pay. Scissor mechanism keys with 1mm travel. Rechargeable via Lightning. Works wirelessly up to 10 meters.',
    features: ['Touch ID', 'Scissor Mechanism', 'Rechargeable', 'Bluetooth', 'Full-size Layout'],
    reviews: [
      { author: 'Rose K.', rating: 5, text: 'Touch ID is incredibly convenient. Unlocks Mac instantly, works with Apple Pay.', date: '2024-01-09' },
      { author: 'Simon G.', rating: 5, text: 'The low-profile keys feel great and the battery lasts months.', date: '2024-01-28' },
      { author: 'Tina M.', rating: 4, text: 'Clean design, reliable connection. Miss having USB-C though.', date: '2024-02-15' },
    ],
  },
  {
    sku: 'SKU-028', title: 'Wacom Intuos Pro Medium Drawing Tablet', category: 'Peripherals',
    price: 249.99, originalPrice: 279.99, rating: 4.6, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/51+U2gtSrBL.jpg',
    description: '8192 levels of pressure sensitivity with tilt recognition. Includes Pro Pen 2 with 8 customizable ExpressKeys. Wireless Bluetooth and USB connectivity. Compatible with Photoshop, Illustrator, Clip Studio Paint.',
    features: ['8192 Pressure Levels', 'Pro Pen 2', 'Tilt Recognition', 'Wireless BT', '8 ExpressKeys'],
    reviews: [
      { author: 'Anya C.', rating: 5, text: 'The pen feels incredibly natural. Night-and-day difference from my old tablet.', date: '2024-01-06' },
      { author: 'Mike S.', rating: 4, text: 'Pro Pen 2 is phenomenal. Took a week to get used to the surface texture.', date: '2024-01-22' },
      { author: 'Layla F.', rating: 5, text: 'Best professional drawing tablet for the price. The wireless mode is super convenient.', date: '2024-02-07' },
      { author: 'Ravi N.', rating: 5, text: 'Industry standard for digital illustration. Worth every penny for professionals.', date: '2024-02-23' },
    ],
  },
  {
    sku: 'SKU-029', title: 'Logitech G Pro X Superlight 2 Mouse', category: 'Peripherals',
    price: 159.99, originalPrice: 179.99, rating: 4.9, reviewCount: 4,
    image: 'https://images6.kabum.com.br/produtos/fotos/677446/mouse-gamer-sem-fio-logitech-g-pro-x-superlight-2-dex-lightspeed-44-000-dpi-design-assimetrico-para-destros-preto-910-007356_1733493210_gg.jpg',
    description: 'Ultra-lightweight gaming mouse at just 60g. HERO 2 sensor delivers up to 32,000 DPI with zero smoothing. LIGHTSPEED wireless at 1ms polling rate. Used by pro esports players worldwide.',
    features: ['60g Ultralight', '32K DPI HERO 2', '1ms LIGHTSPEED', '95hr Battery', 'PTFE Feet'],
    reviews: [
      { author: 'Alex B.', rating: 5, text: 'The best gaming mouse I have ever used. The HERO 2 sensor is flawless.', date: '2024-01-05' },
      { author: 'Zara P.', rating: 5, text: 'Insanely light. You almost forget it is there. Performance is elite.', date: '2024-01-20' },
      { author: 'Danny W.', rating: 5, text: 'Worth the premium. The wireless performance is identical to wired.', date: '2024-02-06' },
      { author: 'Hana T.', rating: 5, text: 'I was skeptical about the price. Not anymore — it is the perfect mouse.', date: '2024-02-22' },
    ],
  },
  {
    sku: 'SKU-030', title: 'Blue Yeti USB Microphone', category: 'Peripherals',
    price: 89.99, originalPrice: 129.99, rating: 4.5, reviewCount: 5,
    image: 'https://m.media-amazon.com/images/I/61vI0Zii07L.jpg',
    description: 'Professional USB microphone with four pickup patterns: cardioid, bidirectional, omnidirectional, and stereo. Built-in headphone amplifier for zero-latency monitoring. Mute button and gain control on the mic.',
    features: ['4 Pickup Patterns', 'Zero-latency Monitor', 'Gain & Mute Controls', 'USB Plug & Play', 'Built-in Headphone Jack'],
    reviews: [
      { author: 'Cole R.', rating: 5, text: 'The go-to mic for podcasters. Records incredibly clear audio right out of the box.', date: '2024-01-07' },
      { author: 'Ellie S.', rating: 4, text: 'Great mic, versatile pickup patterns. The stereo mode is amazing for music.', date: '2024-01-23' },
      { author: 'Fred T.', rating: 5, text: 'Used it for voiceover work. Clients are always impressed by the audio quality.', date: '2024-02-08' },
      { author: 'Gina M.', rating: 4, text: 'Solid mic. Picks up room noise if your environment is not treated.', date: '2024-02-20' },
      { author: 'Hugo C.', rating: 5, text: 'Classic for a reason. Reliable, great sounding, and easy to use.', date: '2024-02-27' },
    ],
  },

  // ── Monitors ─────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-031', title: 'Dell S2722QC 27" 4K USB-C Monitor', category: 'Monitors',
    price: 379.99, originalPrice: 429.99, rating: 4.6, reviewCount: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3q1KRZcuwPZ4Qnb0ZY97gS5PsBm69yMcwUg&s',
    description: '27-inch 4K IPS monitor with USB-C 65W power delivery. 99% sRGB color coverage and factory calibration. Built-in 2x5W speakers. Four-side ultra-thin bezels for seamless multi-monitor setups.',
    features: ['4K IPS', 'USB-C 65W PD', '99% sRGB', 'Built-in Speakers', 'Ultra-thin Bezels'],
    reviews: [
      { author: 'Iris W.', rating: 5, text: 'One cable to rule them all. 4K video and 65W charging from a single USB-C. Perfect.', date: '2024-01-12' },
      { author: 'Jerome H.', rating: 4, text: 'Great picture quality. The built-in speakers are decent for video calls.', date: '2024-02-01' },
      { author: 'Kim P.', rating: 5, text: 'Elegant design and excellent color accuracy. Sets up in minutes.', date: '2024-02-17' },
    ],
  },
  {
    sku: 'SKU-032', title: 'Samsung Odyssey G7 32" Curved Gaming Monitor', category: 'Monitors',
    price: 499.99, originalPrice: 599.99, rating: 4.7, reviewCount: 4,
    image: 'https://m.media-amazon.com/images/I/61r-XPKCzKL._AC_UF894,1000_QL80_.jpg',
    description: '32-inch QHMD 1000R curved panel with 240Hz refresh rate and 1ms response time. VESA DisplayHDR 600 certified. G-Sync compatible and AMD FreeSync Premium Pro for tear-free gaming.',
    features: ['240Hz Refresh Rate', '1ms Response', 'QHMD 2560x1440', 'HDR600', 'FreeSync Premium Pro'],
    reviews: [
      { author: 'Lance K.', rating: 5, text: '240Hz is incredibly smooth. Fast-paced games feel completely different.', date: '2024-01-08' },
      { author: 'Megan F.', rating: 5, text: 'The curvature is immersive without being overwhelming. HDR looks stunning.', date: '2024-01-25' },
      { author: 'Owen B.', rating: 5, text: 'Best gaming monitor I have owned. The combination of speed and color is unbeatable.', date: '2024-02-10' },
      { author: 'Pearl S.', rating: 4, text: 'Excellent gaming performance. The HDR blooming can be noticeable in dark scenes.', date: '2024-02-25' },
    ],
  },

  // ── Storage ──────────────────────────────────────────────────────────────────
  {
    sku: 'SKU-033', title: 'Kingston XS2000 Portable SSD 2TB', category: 'Storage',
    price: 129.99, originalPrice: 169.99, rating: 4.7, reviewCount: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYGFm9WYLmo0AAy3WbstrPDELLStNaBbL90A&s',
    description: 'Pocket-sized external SSD with blazing 2,000 MB/s read speeds via USB 3.2 Gen 2x2. IP55 water and dust resistance. Includes USB-C to USB-C and USB-C to USB-A cables.',
    features: ['2,000 MB/s Read', 'USB 3.2 Gen 2x2', 'IP55 Rated', 'Pocket-sized', '2TB Capacity'],
    reviews: [
      { author: 'Quinn A.', rating: 5, text: '2000 MB/s is real. Faster than my internal SATA SSD. Tiny form factor is a bonus.', date: '2024-01-10' },
      { author: 'Ruth C.', rating: 5, text: 'The IP55 rating gives me peace of mind on location shoots. Screaming fast.', date: '2024-01-27' },
      { author: 'Steven P.', rating: 4, text: 'Outstanding speeds. You need a USB 3.2 Gen 2x2 port to hit max performance.', date: '2024-02-13' },
    ],
  },
  {
    sku: 'SKU-034', title: 'Seagate Expansion 8TB Desktop Drive', category: 'Storage',
    price: 129.99, originalPrice: 149.99, rating: 4.3, reviewCount: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB3NDdfh7sE1_OtnxPhfDUWUK2_eoAfFGAPg&s',
    description: 'Massive 8TB desktop storage for photos, videos, and backups. Simple USB 3.0 plug-and-play connectivity. Includes Seagate Toolkit backup software for automatic scheduled backups.',
    features: ['8TB Capacity', 'USB 3.0', 'Plug & Play', 'Backup Software', '3-year Rescue Services'],
    reviews: [
      { author: 'Tara H.', rating: 5, text: 'My entire video archive fits on one drive. Setup was instant.', date: '2024-01-06' },
      { author: 'Ulrich D.', rating: 4, text: 'Solid drive for the price. Backup software works reliably in the background.', date: '2024-01-21' },
      { author: 'Vera S.', rating: 4, text: 'Great capacity. A bit louder than expected but acceptable for a desktop drive.', date: '2024-02-05' },
      { author: 'Walter N.', rating: 3, text: 'Does the job. Slower than SSD obviously but fine for cold storage and backups.', date: '2024-02-22' },
    ],
  },

  // ── Accessories ──────────────────────────────────────────────────────────────
  {
    sku: 'SKU-035', title: 'Belkin MagSafe 3-in-1 Wireless Charger', category: 'Accessories',
    price: 99.99, originalPrice: 119.99, rating: 4.5, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/41WylSv6vlL.jpg',
    description: 'Charge iPhone, Apple Watch, and AirPods simultaneously. MagSafe delivers up to 15W fast wireless charging. Apple Watch charges in Nightstand mode. Foldable and travel-ready design.',
    features: ['MagSafe 15W', 'Apple Watch Charger', 'AirPods Pad', 'Foldable Design', 'USB-C Power Adapter Included'],
    reviews: [
      { author: 'Xena P.', rating: 5, text: 'One pad for all my Apple devices. My bedside table has never been cleaner.', date: '2024-01-13' },
      { author: 'Yann F.', rating: 4, text: 'Works perfectly. MagSafe clicks right into place and charges at full speed.', date: '2024-02-01' },
      { author: 'Zoe W.', rating: 5, text: 'Foldable design is perfect for travel. Belkin quality as always.', date: '2024-02-17' },
    ],
  },
  {
    sku: 'SKU-036', title: 'Ergotron LX Desk Monitor Arm', category: 'Accessories',
    price: 149.99, originalPrice: 179.99, rating: 4.8, reviewCount: 4,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlBTt0eE4eot5vVQccGMZlS-i36wy-cFctQ&s',
    description: 'Fully adjustable single monitor arm supporting displays up to 34" and 7–25 lbs. CF (constant force) technology for smooth height, tilt, pan, and rotation adjustments. Integrated cable management.',
    features: ['Supports up to 34"', 'Full Adjustment Range', 'Cable Management', 'VESA Compatible', 'Easy Install'],
    reviews: [
      { author: 'Adam S.', rating: 5, text: 'The build quality is exceptional. Holds my 32" monitor perfectly, zero drift.', date: '2024-01-09' },
      { author: 'Beth L.', rating: 5, text: 'Installation was easy. The cable management is clean and the movement is silky smooth.', date: '2024-01-26' },
      { author: 'Carl O.', rating: 5, text: 'Best monitor arm on the market. Constant force mechanism is buttery smooth.', date: '2024-02-12' },
      { author: 'Dana R.', rating: 4, text: 'Premium product. The clamp requires a thick desk — check compatibility first.', date: '2024-02-26' },
    ],
  },
  {
    sku: 'SKU-037', title: 'Logitech Spotlight Presentation Remote', category: 'Accessories',
    price: 79.99, originalPrice: 99.99, rating: 4.6, reviewCount: 3,
    image: 'https://m.media-amazon.com/images/I/515XwCsqcDL.jpg',
    description: 'Advanced wireless presentation clicker with digital laser pointer, auto-advance timer, and Bluetooth or USB receiver. Works up to 100 feet away. Rechargeable via USB-C. Compatible with PowerPoint, Keynote, and more.',
    features: ['100ft Range', 'Digital Pointer', 'Presentation Timer', 'Bluetooth + USB', 'Rechargeable'],
    reviews: [
      { author: 'Eric V.', rating: 5, text: 'Makes presentations so much more professional. The digital pointer is crisp on any screen.', date: '2024-01-14' },
      { author: 'Faye H.', rating: 5, text: 'Best presentation remote available. The built-in timer keeps me on track.', date: '2024-02-03' },
      { author: 'Greg M.', rating: 4, text: 'Excellent range and build. Logitech software adds useful extras.', date: '2024-02-20' },
    ],
  },
  {
    sku: 'SKU-038', title: 'UGREEN 100W USB-C 6-Port Charging Station', category: 'Accessories',
    price: 59.99, originalPrice: 79.99, rating: 4.7, reviewCount: 5,
    image: 'https://http2.mlstatic.com/D_Q_NP_659508-CBT104242751091_012026-O.webp',
    description: '6-port charging hub with 100W total output — two USB-C ports (65W + 45W) and four USB-A ports. GaN technology runs cooler and more efficiently than traditional chargers. Charges laptops, tablets, and phones simultaneously.',
    features: ['100W Total Output', '2x USB-C GaN', '4x USB-A', 'Simultaneous 6 Devices', 'Compact GaN Design'],
    reviews: [
      { author: 'Helen J.', rating: 5, text: 'Replaced five chargers with one. Desk looks so much cleaner.', date: '2024-01-04' },
      { author: 'Ivan T.', rating: 5, text: 'Charges my MacBook Pro at full 65W while also charging my phone and earbuds.', date: '2024-01-19' },
      { author: 'Julia M.', rating: 5, text: 'Compact for what it does. Runs warm but never hot thanks to GaN tech.', date: '2024-02-04' },
      { author: 'Karl B.', rating: 4, text: 'Great value. All 6 ports work simultaneously without throttling.', date: '2024-02-18' },
      { author: 'Lena S.', rating: 5, text: 'Travel essential. Replaced my entire bag of chargers.', date: '2024-02-27' },
    ],
  },
]

async function seed() {
  console.log('Connecting to MongoDB Atlas...')
  await mongoose.connect(uri)
  console.log('Connected.')

  await Product.deleteMany({})
  console.log('Cleared existing products.')

  await Product.insertMany([...products, ...extraProducts])
  const total = products.length + extraProducts.length
  console.log(`Inserted ${total} products successfully.`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
