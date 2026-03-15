import Category from "../components/Home/Category"
import Items from "../components/Home/Items"
import Filter from "../components/Home/Filter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
      <Category />
      <div className="flex flex-1 max-w-[1600px] w-full mx-auto px-4 py-6 gap-6">
        <aside className="shrink-0 sticky top-[112px] self-start">
          <Filter />
        </aside>
        <main className="flex-1 min-w-0">
          <Items />
        </main>
      </div>
    </div>
  )
}
