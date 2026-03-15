import { useContext, useMemo, useState } from "react"
import { ProductContext } from "../../context/ProductContext"
import { FilterContext } from "../../context/FilterContext"
import { SlidersHorizontal, RotateCcw, Star, Tag, DollarSign } from "lucide-react"

export default function Filter() {
  const productContext = useContext(ProductContext)
  const filterContext = useContext(FilterContext)

  if (!productContext || !filterContext) return <div>Context Error</div>

  const { productdata } = productContext
  const { appliedFilters, setAppliedFilters } = filterContext

  const [price, setPrice] = useState(appliedFilters.price)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(appliedFilters.brands)
  const [selectedRating, setSelectedRating] = useState<number>(appliedFilters.rating)

  const brands = useMemo(() => {
    return [...new Set(productdata.map((p: any) => p.brand).filter(Boolean))] as string[]
  }, [productdata])

  const ratings = [4, 3, 2, 1]

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const handleApply = () => setAppliedFilters({ price, brands: selectedBrands, rating: selectedRating })

  const handleReset = () => {
    setPrice(0); setSelectedBrands([]); setSelectedRating(0)
    setAppliedFilters({ price: 0, brands: [], rating: 0 })
  }

  return (
    <div className="w-[280px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 flex flex-col gap-4 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-purple-600" />
          <h2 className="font-bold text-gray-800 dark:text-white">Filters</h2>
        </div>
        <button onClick={handleReset} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition">
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      {/* Price */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Max Price</h3>
          </div>
          <button onClick={() => setPrice(0)} className="text-xs text-gray-400 hover:text-red-400 transition">Reset</button>
        </div>
        <input type="range" min="0" max="2000" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full accent-purple-500" />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>$0</span>
          <span className="font-medium text-purple-600">{price > 0 ? `$${price}` : "Any"}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Min Rating</h3>
          </div>
          <button onClick={() => setSelectedRating(0)} className="text-xs text-gray-400 hover:text-red-400 transition">Reset</button>
        </div>
        <div className="flex flex-col gap-1.5">
          {ratings.map((r) => (
            <button key={r} onClick={() => setSelectedRating(r)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${selectedRating === r ? "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
            >
              <div className="flex">
                {Array.from({ length: r }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Brand</h3>
          </div>
          <button onClick={() => setSelectedBrands([])} className="text-xs text-gray-400 hover:text-red-400 transition">Reset</button>
        </div>
        <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label key={brand} className="flex justify-between items-center cursor-pointer group">
              <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">{brand}</span>
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="accent-purple-500 w-4 h-4 cursor-pointer" />
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleApply} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow transition hover:-translate-y-0.5">
        Apply Filters
      </button>
    </div>
  )
}
