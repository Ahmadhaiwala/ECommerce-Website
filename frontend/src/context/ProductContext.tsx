import { createContext, useState, useEffect, type ReactNode } from "react";


export interface ProductContextType {
    productdata: any[];
}


export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    
    const [productdata, setproductdata] = useState<any[]>([]);
    
    useEffect(() => {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => setproductdata(data.products))
}, []);
    console.log("productdata",productdata)
    return (
        <ProductContext.Provider value={{ productdata }}>
            {children}
        </ProductContext.Provider>
    );
}
