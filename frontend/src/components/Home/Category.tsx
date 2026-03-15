import { useContext, useMemo } from "react"
import { ProductContext } from "../../context/ProductContext"
import { FilterContext } from "../../context/FilterContext"
import {
  ShoppingBag, Smartphone, Laptop, Sparkles, ShoppingCart,
  Home, Armchair, Shirt, Watch, Glasses, Car, Lightbulb, Package
} from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  all: <ShoppingBag className="w-3.5 h-3.5" />,
  smartphones: <Smartphone className="w-3.5 h-3.5" />,
  laptops: <Laptop className="w-3.5 h-3.5" />,
  fragrances: <Sparkles className="w-3.5 h-3.5" />,
  skincare: <Sparkles className="w-3.5 h-3.5" />,
  groceries: <ShoppingCart className="w-3.5 h-3.5" />,
  "home-decoration": <Home className="w-3.5 h-3.5" />,
  furniture: <Armchair className="w-3.5 h-3.5" />,
  tops: <Shirt className="w-3.5 h-3.5" />,
  "womens-dresses": <Shirt className="w-3.5 h-3.5" />,
  "womens-shoes": <ShoppingBag className="w-3.5 h-3.5" />,
  "mens-shirts": <Shirt className="w-3.5 h-3.5" />,
  "mens-shoes": <ShoppingBag className="w-3.5 h-3.5" />,
  "mens-watches": <Watch className="w-3.5 h-3.5" />,
  "womens-watches": <Watch className="w-3.5 h-3.5" />,
  "womens-bags": <ShoppingBag className="w-3.5 h-3.5" />,
  "womens-jewellery": <Sparkles className="w-3.5 h-3.5" />,
  sunglasses: <Glasses className="w-3.5 h-3.5" />,
  automotive: <Car className="w-3.5 h-3.5" />,
  motorcycle: <Car className="w-3.5 h-3.5" />,
  lighting: <Lightbulb className="w-3.5 h-3.5" />,
}

export default function Category() {
  const productContext = useContext(ProductContext)
  const filterContext = useContext(FilterContext)

  if (!productContext || !filterContext) return null

  const { productdata } = productContext
  const { category, setCategory } = filterContext

  const categories = useMemo(() => {
    const cats = [...new Set(productdata.map((p: any) => p.category).filter(Boolean))] as string[]
    return ["all", ...cats]
  }, [productdata])

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3 sticky top-[57px] z-10 shadow-sm">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => {
          const isActive = category === cat
          const icon = categoryIcons[cat] ?? <Package className="w-3.5 h-3.5" />
          const label = cat === "all" ? "All" : cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0
                ${isActive
                  ? "bg-purple-600 text-white shadow-md scale-105"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
