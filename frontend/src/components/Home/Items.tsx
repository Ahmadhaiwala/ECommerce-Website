import { useContext, useMemo } from "react"
import { ProductContext } from "../../context/ProductContext"
import { FilterContext } from "../../context/FilterContext"
import { useCart } from "../../context/CartContext"
import { useFavourite } from "../../context/FavouriteContext"
import { Star, Package, Search, Heart, ShoppingCart } from "lucide-react"

export default function Items() {
  const productContext = useContext(ProductContext)
  const filterContext = useContext(FilterContext)
  const { addToCart } = useCart()
  const { toggleFavourite, isFavourite } = useFavourite()

  if (!productContext || !filterContext) return <div>Context error</div>

  const { productdata } = productContext
  const { appliedFilters, searchQuery, category } = filterContext

  const filtered = useMemo(() => {
    return productdata.filter((item: any) => {
      if (category && category !== "all" && item.category !== category) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          item.title?.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        if (!matches) return false
      }
      if (appliedFilters.price > 0 && item.price > appliedFilters.price) return false
      if (appliedFilters.brands.length > 0 && !appliedFilters.brands.includes(item.brand)) return false
      if (appliedFilters.rating > 0 && item.rating < appliedFilters.rating) return false
      return true
    })
  }, [productdata, searchQuery, appliedFilters, category])

  return (
    <div className="flex-1 min-h-screen">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {filtered.length} {filtered.length === 1 ? "result" : "results"} found
        {searchQuery && <span className="ml-1">for "<span className="text-purple-600 font-medium">{searchQuery}</span>"</span>}
      </p>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
          <Search className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item: any) => (
            <div key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div className="overflow-hidden relative">
                <img src={item.thumbnail} alt={item.title}
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.discountPercentage > 10 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    -{Math.round(item.discountPercentage)}%
                  </span>
                )}
                <button
                  onClick={() => toggleFavourite({ id: item.id, title: item.title, price: item.price, thumbnail: item.thumbnail, brand: item.brand, category: item.category, rating: item.rating, discountPercentage: item.discountPercentage })}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow transition hover:scale-110"
                >
                  <Heart className={`w-4 h-4 transition ${isFavourite(item.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
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
                  <span className="ml-1 flex items-center gap-0.5">
                    <Package className="w-3 h-3" /> {item.stock}
                  </span>
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
  )
}
