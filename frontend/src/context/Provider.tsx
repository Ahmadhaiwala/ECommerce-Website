import { ProductProvider } from "./ProductContext"
import { FilterProvider } from "./FilterContext"
import { ThemeProvider } from "./ThemeContext"
import { AuthProvider } from "./AuthContext"
import { CartProvider } from "./CartContext"
import { FavouriteProvider } from "./FavouriteContext"
import { OrderProvider } from "./OrderContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <OrderProvider>
          <CartProvider>
            <FavouriteProvider>
              <ProductProvider>
                <FilterProvider>
                  {children}
                </FilterProvider>
              </ProductProvider>
            </FavouriteProvider>
          </CartProvider>
        </OrderProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
