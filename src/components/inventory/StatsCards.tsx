import { Card, CardContent } from '@/components/ui/card'
import { Package, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react'
import { InventoryItem } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface StatsCardsProps {
  items: InventoryItem[]
}

export function StatsCards({ items }: StatsCardsProps) {
  const totalItems = items.length
  const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const lowStockItems = items.filter(item => item.quantity < 10).length
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)

  const stats = [
    {
      label: 'Total Items',
      value: totalItems.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Total Quantity',
      value: totalQuantity.toString(),
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Low Stock',
      value: lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Total Value',
      value: formatCurrency(totalValue),
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
