import { useCart } from "../context/CartContext"
import { useOrders } from "../context/OrderContext"
import { Trash2, Plus, Minus, ShoppingCart, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart()
  const { placeOrder } = useOrders()
  const [ordered, setOrdered] = useState(false)

  const handleCheckout = () => {
    if (!cart.length) return
    placeOrder(cart, total)
    clearCart()
    setOrdered(true)
    setTimeout(() => setOrdered(false), 3000)
  }

  if (ordered) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Order Placed!</h2>
          <p className="text-gray-500 dark:text-gray-400">Your order has been placed successfully.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Cart</h1>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{cart.length} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
            <ShoppingCart className="w-14 h-14 mb-3 opacity-30" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <a href="/" className="mt-3 text-sm text-purple-600 hover:underline">Browse products</a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Items */}
            <div className="flex-1 flex flex-col gap-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.brand}</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                      <Minus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-gray-800 dark:text-white">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                      <Plus className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-200 w-16 text-right shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-72 shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
                <h2 className="font-bold text-gray-800 dark:text-white mb-4">Order Summary</h2>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>Subtotal</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Shipping</span><span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between font-bold text-gray-900 dark:text-white mb-5">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition shadow">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
