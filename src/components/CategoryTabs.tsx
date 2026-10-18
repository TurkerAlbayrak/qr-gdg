'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { QrCategory } from '@/types/qr';
import { QR_CATEGORIES } from '@/lib/qrGenerators';

interface CategoryTabsProps {
  selectedCategory: QrCategory | 'all';
  onSelectCategory: (cat: QrCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryTabs({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CategoryTabsProps) {
  const categories: { id: QrCategory | 'all'; name: string }[] = [
    { id: 'all', name: 'Tümü' },
    ...QR_CATEGORIES.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <div className="space-y-3 mb-4">
      {/* Search Input Bar */}
      <div className="relative max-w-sm mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="QR türü ara (wifi, instagram, vcard, menü...)"
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            aria-label="Aramayı Temizle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 justify-start sm:justify-center">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                isSelected
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-2xs'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
