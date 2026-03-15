import { createContext, useState } from "react"

export interface FilterState {
    price: number;
    brands: string[];
    rating: number;
}

interface FilterContextType {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    appliedFilters: FilterState;
    setAppliedFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const FilterContext = createContext<FilterContextType | null>(null)

export const FilterProvider = ({ children }: any) => {

  const [category, setCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
      price: 0,
      brands: [],
      rating: 0
  })

  return (
    <FilterContext.Provider
      value={{ 
          category, setCategory, 
          searchQuery, setSearchQuery, 
          appliedFilters, setAppliedFilters 
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}