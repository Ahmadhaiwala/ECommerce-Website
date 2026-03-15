import { Outlet, useLocation, NavLink } from "react-router-dom"
import Topdeals from "../product/Topdeals"
import { useContext, useState } from "react"
import { FilterContext } from "../../context/FilterContext"
import { useTheme } from "../../context/ThemeContext"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { useFavourite } from "../../context/FavouriteContext"
import { useOrders } from "../../context/OrderContext"
import { Search, X, Sun, Moon, LogOut, User, ShoppingBag, ShoppingCart, Heart, ClipboardList, Home } from "lucide-react"

export default function Navbar() {
  const location = useLocation()
  const filterContext = useContext(FilterContext)
  const { dark, toggleDark } = useTheme()
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const { favourites } = useFavourite()
  const { orders } = useOrders()
  const [localSearch, setLocalSearch] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)

  const isHome = location.pathname === "/"

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filterContext) filterContext.setSearchQuery(localSearch)
  }

  const handleClear = () => {
    setLocalSearch("")
    if (filterContext) filterContext.setSearchQuery("")
  }

  return (
    <>
      <Topdeals />
      <nav className="w-full sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-4 py-3">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">Flowbite</span>
          </a>

          {/* NAV LINKS */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex space-x-1 font-medium text-sm">
              {[
                { label: "Home", path: "/", icon: <Home className="w-4 h-4" />, count: 0 },
                { label: "Orders", path: "/orders", icon: <ClipboardList className="w-4 h-4" />, count: orders.length },
                { label: "Favourites", path: "/favourites", icon: <Heart className="w-4 h-4" />, count: favourites.length },
                { label: "Cart", path: "/cart", icon: <ShoppingCart className="w-4 h-4" />, count: cart.length },
              ].map(({ label, path, icon, count }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    end={path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-4 py-2 rounded-lg transition relative
                      ${isActive ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-semibold" : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                    }
                  >
                    {icon}
                    {label}
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {count > 9 ? "9+" : count}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* SEARCH */}
          {isHome && (
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search by name, brand, category..."
                  className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
                {localSearch && (
                  <button type="button" onClick={handleClear} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button type="submit" className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition">
                Search
              </button>
            </form>
          )}

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block">{user?.username}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user?.username}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setShowUserMenu(false) }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>
      <Outlet />
    </>
  )
}
