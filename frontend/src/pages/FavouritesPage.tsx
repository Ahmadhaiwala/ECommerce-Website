import { useFavourite } from "../context/FavouriteContext"
import { useCart } from "../context/CartContext"
import { Heart, ShoppingCart, Star, Trash2 } from "lucide-react"

export default function FavouritesPage() {
  const { favourites, toggleFavourite } = useFavourite()
  const { addToCart } = useCart()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favourites</h1>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{favourites.length} saved</span>
        </div>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
            <Heart className="w-14 h-14 mb-3 opacity-30" />
            <p className="text-lg font-medium">No favourites yet</p>
            <a href="/" className="mt-3 text-sm text-purple-600 hover:underline">Discover products</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favourites.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img src={item.thumbnail} alt={item.title} className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" />
                  {item.discountPercentage > 10 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      -{Math.round(item.discountPercentage)}%
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavourite(item)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow hover:scale-110 transition"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-1.5">
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-1">{item.title}</h2>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{item.category}</span>
                    {item.brand && <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">{item.brand}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-base font-bold text-green-600 dark:text-green-400">${item.price}</span>
                    <button
                      onClick={() => addToCart({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail, brand: item.brand, category: item.category })}
                      className="flex items-center gap-1.5 text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
