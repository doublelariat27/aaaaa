'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart, Leaf, Package } from 'lucide-react'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  seller: string
  category: string
}

const BANANA_WASTE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kulit Pisang Organik',
    description: 'Kulit pisang segar berkualitas tinggi, cocok untuk pupuk dan bahan kompos',
    price: 15000,
    image: '/products/kulit-pisang.jpg',
    seller: 'Tani Organik Jaya',
    category: 'limbah-pisang'
  },
  {
    id: '2',
    name: 'Bonggol Pisang Premium',
    description: 'Bonggol pisang bersih, dapat digunakan untuk kerajinan atau pupuk',
    price: 25000,
    image: '/products/bonggol-pisang.jpg',
    seller: 'Harmoni Sawah',
    category: 'limbah-pisang'
  },
  {
    id: '3',
    name: 'Serat Pisang (Abaca)',
    description: 'Serat pisang pilihan untuk kerajinan tangan dan tas handmade',
    price: 45000,
    image: '/products/serat-pisang.jpg',
    seller: 'Kerajinan Tradisional',
    category: 'limbah-pisang'
  },
  {
    id: '4',
    name: 'Daun Pisang Segar',
    description: 'Daun pisang besar untuk alas makanan atau kerajinan, organik tanpa kimia',
    price: 12000,
    image: '/products/daun-pisang.jpg',
    seller: 'Petani Organik Sejati',
    category: 'limbah-pisang'
  },
  {
    id: '5',
    name: 'Ampas Pisang (Banana Waste)',
    description: 'Ampas pisang berkualitas, tinggi nutrisi untuk pakan ternak',
    price: 20000,
    image: '/products/ampas-pisang.jpg',
    seller: 'Peternakan Maju',
    category: 'limbah-pisang'
  },
  {
    id: '6',
    name: 'Mix Limbah Pisang (Bonus)',
    description: 'Paket hemat berisi kulit, bonggol, dan daun pisang segar',
    price: 40000,
    image: '/products/mix-limbah-pisang.jpg',
    seller: 'Tani Organik Jaya',
    category: 'limbah-pisang'
  },
  {
    id: '7',
    name: 'Bonggol Pisang Halus',
    description: 'Bonggol pisang yang sudah diproses halus, untuk pupuk khusus',
    price: 35000,
    image: '/products/bonggol-halus.jpg',
    seller: 'Petani Organik Sejati',
    category: 'limbah-pisang'
  },
  {
    id: '8',
    name: 'Kulit Pisang Kering (Chips)',
    description: 'Kulit pisang yang sudah dikeringkan, tahan lama dan mudah disimpan',
    price: 18000,
    image: '/products/kulit-pisang-kering.jpg',
    seller: 'Harmoni Sawah',
    category: 'limbah-pisang'
  }
]

export default function MarketplacePage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [products] = useState<Product[]>(BANANA_WASTE_PRODUCTS)

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return 0
      } else if (sortBy === 'priceAsc') {
        return a.price - b.price
      } else if (sortBy === 'priceDesc') {
        return b.price - a.price
      }
      return 0
    })

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: null
    })
    toast.success(`${product.name} ditambahkan ke keranjang!`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">Edible Cutlery Limbah Pisang Pertama di Indonesia</h1>
          </div>
          <p className="text-gray-600 text-lg">Produk limbah pisang organik berkualitas tinggi dari petani terpercaya</p>
        </div>

        {/* Filter Section */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Cari limbah pisang..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="newest">Terbaru</option>
                <option value="priceAsc">Harga Terendah</option>
                <option value="priceDesc">Harga Tertinggi</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Products Grid */}
        <div>
          <p className="text-gray-600 mb-6 font-medium text-sm">
            Menampilkan {filteredProducts.length} produk
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition border-0 flex flex-col">
                {/* Product Image */}
                <div className="h-40 bg-gray-200 overflow-hidden hover:scale-105 transition duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Seller */}
                  <p className="text-xs text-emerald-700 font-semibold mb-2 line-clamp-1">
                    {product.seller}
                  </p>

                  {/* Name */}
                  <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 h-10">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>

                  {/* Price and Button */}
                  <div className="mt-auto">
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <p className="text-emerald-600 font-bold text-lg">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Beli
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
