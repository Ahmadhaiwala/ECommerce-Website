import { createContext, useContext, useState } from "react"

export interface FavItem {
  id: number
  title: string
  price: number
  thumbnail: string
  brand: string
  category: string
  rating: number
  discountPercentage: number
}

interface FavContextType {
  favourites: FavItem[]
  toggleFavourite: (item: FavItem) => void
  isFavourite: (id: number) => boolean
}

export const FavouriteContext = createContext<FavContextType | null>(null)

export const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<FavItem[]>([])

  const toggleFavourite = (item: FavItem) => {
    setFavourites((prev) =>
      prev.find((f) => f.id === item.id) ? prev.filter((f) => f.id !== item.id) : [...prev, item]
    )
  }

  const isFavourite = (id: number) => favourites.some((f) => f.id === id)

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouriteContext.Provider>
  )
}

export const useFavourite = () => {
  const ctx = useContext(FavouriteContext)
  if (!ctx) throw new Error("useFavourite must be used inside FavouriteProvider")
  return ctx
}
