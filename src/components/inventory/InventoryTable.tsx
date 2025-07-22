import { useState } from 'react'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { InventoryItem } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface InventoryTableProps {
  items: InventoryItem[]
  loading: boolean
  onEdit: (item: InventoryItem) => void
  onDelete: (id: number) => void
  onView: (item: InventoryItem) => void
}

export function InventoryTable({ items, loading, onEdit, onDelete, onView }: InventoryTableProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? items.map(item => item.id) : [])
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems(prev =>
      checked
        ? [...prev, id]
        : prev.filter(itemId => itemId !== id)
    )
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    if (quantity < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Inventory Items ({items.length})</CardTitle>
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">
                {selectedItems.length} selected
              </span>
              <Button variant="destructive" size="sm">
                Delete Selected
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-slate-300"
                  />
                </th>
                <th className="p-4 text-left font-medium text-slate-700">Name</th>
                <th className="p-4 text-left font-medium text-slate-700">Quantity</th>
                <th className="p-4 text-left font-medium text-slate-700">Price</th>
                <th className="p-4 text-left font-medium text-slate-700">Status</th>
                <th className="p-4 text-left font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const status = getStockStatus(item.quantity)
                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-900">{item.name}</p>
                        {item.description && (
                          <p className="text-sm text-slate-500">{item.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{item.quantity}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium">{formatCurrency(item.price)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(item)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(item.id)}
                          className="h-8 w-8 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          
          {items.length === 0 && (
            <div className="p-8 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 p-3">
                <Package className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-slate-900">No items found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Get started by adding your first inventory item.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Package({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}
