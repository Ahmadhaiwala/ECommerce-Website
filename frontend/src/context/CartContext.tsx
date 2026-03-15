import { createContext, useContext, useState } from "react"

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  brand: string
  category: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  total: number
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id))

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id)
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, quantity: qty } : c))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
