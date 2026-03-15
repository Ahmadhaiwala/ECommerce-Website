import { createContext, useContext, useState } from "react"
import type { CartItem } from "./CartContext"

export interface Order {
  id: string
  items: CartItem[]
  total: number
  date: string
  status: "Processing" | "Shipped" | "Delivered"
}

interface OrderContextType {
  orders: Order[]
  placeOrder: (items: CartItem[], total: number) => void
}

export const OrderContext = createContext<OrderContextType | null>(null)

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([])

  const placeOrder = (items: CartItem[], total: number) => {
    const statuses: Order["status"][] = ["Processing", "Shipped", "Delivered"]
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider")
  return ctx
}
