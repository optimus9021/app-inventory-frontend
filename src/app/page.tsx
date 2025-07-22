'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/inventory/Header';
import { StatsCards } from '@/components/inventory/StatsCards';
import { SearchFilter } from '@/components/inventory/SearchFilter';
import { InventoryTable } from '@/components/inventory/InventoryTable';
import { apiService } from '@/lib/api';
import { InventoryItem } from '@/types';
import { debounce } from '@/lib/utils';

export default function Home() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced search function
  const debouncedSearch = debounce((term: string) => {
    if (term) {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(items);
    }
  }, 300);

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, items, debouncedSearch]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await apiService.getInventoryItems();
      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      // For demo purposes, use sample data if API fails
      const sampleData: InventoryItem[] = [
        { id: 1, name: 'Laptop Dell XPS 13', quantity: 15, price: 18500000, description: 'High-performance ultrabook' },
        { id: 2, name: 'iPhone 14 Pro', quantity: 8, price: 15999000, description: 'Latest iPhone model' },
        { id: 3, name: 'Samsung Monitor 27"', quantity: 25, price: 3200000, description: '4K resolution monitor' },
        { id: 4, name: 'Mechanical Keyboard', quantity: 3, price: 1500000, description: 'RGB backlit keyboard' },
        { id: 5, name: 'Wireless Mouse', quantity: 0, price: 800000, description: 'Ergonomic design mouse' },
      ];
      setItems(sampleData);
      setFilteredItems(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleAddClick = () => {
    console.log('Add item clicked');
    // TODO: Open add item modal
  };

  const handleEdit = (item: InventoryItem) => {
    console.log('Edit item:', item);
    // TODO: Open edit modal
  };

  const handleDelete = (id: number) => {
    console.log('Delete item:', id);
    // TODO: Implement delete functionality
  };

  const handleView = (item: InventoryItem) => {
    console.log('View item:', item);
    // TODO: Open view modal
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <StatsCards items={filteredItems} />
          
          {/* Search and Filters */}
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onAddClick={handleAddClick}
          />
          
          {/* Inventory Table */}
          <InventoryTable
            items={filteredItems}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>
      </main>
    </div>
  );
}
