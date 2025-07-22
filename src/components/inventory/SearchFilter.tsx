import { useState } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function SearchFilter({ searchTerm, onSearchChange, onAddClick }: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button onClick={onAddClick} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Stock Status
              </label>
              <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option value="">All Stock</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Sort By
              </label>
              <select className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
                <option value="name">Name</option>
                <option value="quantity">Quantity</option>
                <option value="price">Price</option>
                <option value="updated">Last Updated</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
