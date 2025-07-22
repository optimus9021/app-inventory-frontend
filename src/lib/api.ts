import { InventoryItem } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error(`API request failed:`, error)
      throw error
    }
  }

  // Inventory methods
  async getInventoryItems(): Promise<InventoryItem[]> {
    return this.request<InventoryItem[]>('/api/inventory')
  }

  async getInventoryItem(id: number): Promise<InventoryItem> {
    return this.request<InventoryItem>(`/api/inventory/${id}`)
  }

  async createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    return this.request<InventoryItem>('/api/inventory', {
      method: 'POST',
      body: JSON.stringify(item),
    })
  }

  async updateInventoryItem(id: number, item: Partial<InventoryItem>): Promise<InventoryItem> {
    return this.request<InventoryItem>(`/api/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    })
  }

  async deleteInventoryItem(id: number): Promise<void> {
    return this.request<void>(`/api/inventory/${id}`, {
      method: 'DELETE',
    })
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>('/api/health')
  }
}

export const apiService = new ApiService()
