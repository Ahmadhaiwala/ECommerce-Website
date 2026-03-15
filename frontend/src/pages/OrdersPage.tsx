import { useOrders } from "../context/OrderContext"
import { ClipboardList, Package, Truck, CheckCircle } from "lucide-react"

const statusConfig = {
  Processing: { icon: <Package className="w-4 h-4" />, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400" },
  Shipped: { icon: <Truck className="w-4 h-4" />, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400" },
  Delivered: { icon: <CheckCircle className="w-4 h-4" />, color: "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400" },
}

export default function OrdersPage() {
  const { orders } = useOrders()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{orders.length} orders</span>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
            <ClipboardList className="w-14 h-14 mb-3 opacity-30" />
            <p className="text-lg font-medium">No orders yet</p>
            <a href="/" className="mt-3 text-sm text-purple-600 hover:underline">Start shopping</a>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const { icon, color } = statusConfig[order.status]
              return (
                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-white">{order.id}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${color}`}>
                      {icon} {order.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img src={item.thumbnail} alt={item.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-400">x{item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
                    <span className="text-base font-bold text-gray-900 dark:text-white">Total: ${order.total.toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
