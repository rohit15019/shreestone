import React from 'react';
import { useRoom360 } from '../../../context/Room360Context';
import { Filter, X, RotateCcw } from 'lucide-react';

const COLOR_OPTIONS = ['', 'White', 'Black', 'Grey', 'Beige', 'Brown', 'Blue', 'Green', 'Gold'];
const FINISH_OPTIONS = ['', 'Glossy', 'Matt', 'Satin', 'Carving'];
const SIZE_OPTIONS = ['', '600×600 mm', '600×1200 mm', '800×1600 mm', '1200×1800 mm'];

const Filters = () => {
  const { filters, setFilters } = useRoom360();

  const handleReset = () => {
    setFilters({ color: '', finish: '', size: '', search: '' });
  };

  const hasActiveFilters = Boolean(filters.color || filters.finish || filters.size || filters.search);

  return (
    <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-3 border border-gray-200/80 dark:border-charcoal-700 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-charcoal-900 dark:text-white uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-gold" />
          <span>Tile Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-gold hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {/* Color Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Color
          </label>
          <select
            value={filters.color}
            onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
            className="w-full text-xs bg-gray-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gold"
          >
            <option value="">All Colors</option>
            {COLOR_OPTIONS.filter(Boolean).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Finish Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Finish
          </label>
          <select
            value={filters.finish}
            onChange={(e) => setFilters(prev => ({ ...prev, finish: e.target.value }))}
            className="w-full text-xs bg-gray-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gold"
          >
            <option value="">All Finishes</option>
            {FINISH_OPTIONS.filter(Boolean).map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            Size
          </label>
          <select
            value={filters.size}
            onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value }))}
            className="w-full text-xs bg-gray-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-white border border-gray-200 dark:border-charcoal-700 rounded-lg px-2 py-1.5 focus:outline-none focus:border-gold"
          >
            <option value="">All Sizes</option>
            {SIZE_OPTIONS.filter(Boolean).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
