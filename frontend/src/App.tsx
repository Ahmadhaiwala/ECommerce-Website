import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import Home from "./pages/Home"
import CartPage from "./pages/CartPage"
import FavouritesPage from "./pages/FavouritesPage"
import OrdersPage from "./pages/OrdersPage"
import AuthPage from "./pages/AuthPage"
import { Providers } from "./context/Provider"
import { useAuth } from "./context/AuthContext"

function AppRoutes() {
  const { user } = useAuth()

  if (!user) return <AuthPage />

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  )
}

export default App
