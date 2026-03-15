import { useContext, useMemo } from "react"
import { ProductContext } from "../../context/ProductContext"
import { FilterContext } from "../../context/FilterContext"
import { Flame, TrendingDown } from "lucide-react"

export default function Topdeals() {
  const productContext = useContext(ProductContext)
  const filterContext = useContext(FilterContext)

  const topDeals = useMemo(() => {
    if (!productContext) return []
    return [...productContext.productdata]
      .filter((p: any) => p.discountPercentage >= 15)
      .sort((a: any, b: any) => b.discountPercentage - a.discountPercentage)
      .slice(0, 8)
  }, [productContext?.productdata])

  if (!topDeals.length) return null

  const maxDiscount = Math.round(Math.max(...topDeals.map((p: any) => p.discountPercentage)))

  const handleClick = (cat: string) => {
    if (filterContext) filterContext.setCategory(cat)
  }

  return (
    <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white px-6 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-2.5">
          <Flame className="w-4 h-4 text-orange-300" />
          <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Top Deals Today</span>
          <div className="ml-auto flex items-center gap-1 text-xs text-purple-300">
            <TrendingDown className="w-3.5 h-3.5" />
            Up to {maxDiscount}% off
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-0.5">
          {topDeals.map((item: any) => (
            <button key={item.id} onClick={() => handleClick(item.category)}
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-3 py-2 shrink-0 transition-all duration-200 hover:scale-105"
            >
              <img src={item.thumbnail} alt={item.title} className="w-9 h-9 rounded-lg object-cover" />
              <div className="text-left">
                <p className="text-xs font-semibold text-white line-clamp-1 max-w-[110px]">{item.title}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-purple-200 line-through">
                    ${(item.price / (1 - item.discountPercentage / 100)).toFixed(0)}
                  </span>
                  <span className="text-sm font-bold text-yellow-300">${item.price}</span>
                  <span className="text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    -{Math.round(item.discountPercentage)}%
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
