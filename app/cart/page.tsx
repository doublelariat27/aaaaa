'use client'

import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Keranjang Anda masih kosong!')
      return
    }
    toast.success('Terima kasih! Pesanan Anda diproses. Hubungi seller untuk konfirmasi.')
    clearCart()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-emerald-600" />
          <h1 className="text-4xl font-bold text-gray-900">Keranjang Belanja</h1>
        </div>

        {cart.length === 0 ? (
          <Card className="p-12 text-center border-0">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Keranjang Anda Kosong</h2>
            <p className="text-gray-600 mb-8">Mulai belanja limbah pisang organik berkualitas tinggi</p>
            <Link href="/marketplace">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8">
                <ArrowLeft size={20} className="mr-2" />
                Kembali ke Marketplace
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="p-6 border-0 space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    {/* Item Image Placeholder */}
                    <div className="h-20 w-20 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      🛍️
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                      <p className="text-emerald-600 font-semibold mt-1">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 1
                          updateQuantity(item.id, newQty)
                        }}
                        className="w-12 text-center border border-gray-300 rounded py-1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right w-24">
                      <p className="text-gray-600 text-sm">Subtotal</p>
                      <p className="font-bold text-gray-900">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 border-0 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} item)</span>
                    <span className="font-semibold">Rp {cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Pajak (0%)</span>
                    <span>Rp 0</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Pengiriman</span>
                    <span className="text-emerald-600 font-semibold">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
                  <span>Total</span>
                  <span className="text-emerald-600">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition mb-3"
                >
                  Checkout
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition mb-4"
                >
                  Kosongkan Keranjang
                </button>

                <Link href="/marketplace">
                  <button className="w-full text-emerald-600 font-semibold py-2 border-2 border-emerald-200 rounded-lg hover:bg-emerald-50 transition">
                    Lanjut Belanja
                  </button>
                </Link>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">💡 Tip:</span> Hubungi seller untuk negosiasi harga pembelian dalam jumlah besar!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
