import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'images.kabum.com.br' },
      { protocol: 'https', hostname: 'images8.kabum.com.br' },
      { protocol: 'https', hostname: 'images6.kabum.com.br' },
      { protocol: 'https', hostname: 'keychron.net.br' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'store.storeimages.cdn-apple.com' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
    ],
  },
}

export default nextConfig
