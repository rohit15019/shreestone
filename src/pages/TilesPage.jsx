import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, RefreshCw, Sparkles, Filter } from 'lucide-react';
import { tilesData, categoriesData } from '../data/tilesData';
import TileCard from '../components/TileCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import BuyNowModal from '../components/BuyNowModal';

const TilesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const [selectedTile, setSelectedTile] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedCompany('All');
    setSelectedFinish('All');
    setSelectedSize('All');
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  const filteredTiles = useMemo(() => {
    return tilesData.filter(tile => {
      const matchesCat = selectedCategory === 'All' || tile.category === selectedCategory;
      const matchesCompany = selectedCompany === 'All' || tile.company === selectedCompany;
      const matchesFinish = selectedFinish === 'All' || tile.finish === selectedFinish;
      const matchesSize = selectedSize === 'All' || tile.size === selectedSize;
      const matchesSearch = searchQuery === '' || 
        tile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tile.description && tile.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tile.color && tile.color.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tile.company && tile.company.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesCompany && matchesFinish && matchesSize && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.pricePerSqFt - b.pricePerSqFt;
      if (sortBy === 'priceDesc') return b.pricePerSqFt - a.pricePerSqFt;
      return 0;
    });
  }, [selectedCategory, selectedCompany, selectedFinish, selectedSize, searchQuery, sortBy]);

  const handleViewDetails = (tile) => {
    setSelectedTile(tile);
    setIsDetailsOpen(true);
  };

  const handleBuyNow = (tile) => {
    setSelectedTile(tile);
    setIsBuyNowOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-marble-light dark:bg-charcoal-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
            2026 Architectural Studio
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-charcoal-900 dark:text-white">
            Luxury Tile & Slab Collection
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Explore {tilesData.length} Italian-inspired vitrified slabs, carving surfaces, and outdoor pavers. Filter by size, finish, or architectural application.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-6 shadow-card border border-gray-200/80 dark:border-charcoal-700 mb-10 space-y-6">
          {/* Top Row: Search & Category Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pill Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 shadow-sm'
                    : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-charcoal-700'
                }`}
              >
                All Collections ({tilesData.length})
              </button>
              {categoriesData.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-gold-amber via-gold to-gold-light text-charcoal-950 shadow-sm'
                      : 'bg-gray-100 dark:bg-charcoal-900 text-charcoal-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-charcoal-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marble, finish, color..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-sm text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Bottom Row: Secondary Filters (Company, Finish, Size, Sort, Reset) */}
          <div className="pt-4 border-t border-gray-100 dark:border-charcoal-700/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Company Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Company:</span>
                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="All">All Companies</option>
                  {categoriesData.companies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Finish Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Finish:</span>
                <select
                  value={selectedFinish}
                  onChange={(e) => setSelectedFinish(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="All">All Finishes</option>
                  {categoriesData.finishes.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Size:</span>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="All">All Sizes</option>
                  {categoriesData.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-charcoal-900 border border-gray-200 dark:border-charcoal-700 text-xs text-charcoal-900 dark:text-white focus:outline-none focus:border-gold"
                >
                  <option value="default">Featured & Latest</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Reset Filters */}
            {(selectedCategory !== 'All' || selectedFinish !== 'All' || selectedSize !== 'All' || searchQuery !== '' || sortBy !== 'default') && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-amber transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing <strong className="text-charcoal-900 dark:text-white font-semibold">{filteredTiles.length}</strong> architectural surfaces
          </span>
        </div>

        {/* Tiles Grid */}
        {filteredTiles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-charcoal-800 rounded-3xl border border-gray-200 dark:border-charcoal-700">
            <Filter className="w-12 h-12 text-gray-300 dark:text-charcoal-700 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-charcoal-900 dark:text-white">
              No Matching Surfaces Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm mx-auto">
              We couldn't find any tiles matching your active filter criteria. Try resetting your finish or size selection.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-gold text-charcoal-950 text-xs font-bold shadow-md hover:scale-105 transition-transform"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTiles.map((tile) => (
              <TileCard
                key={tile._id}
                tile={tile}
                onViewDetails={handleViewDetails}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODALS */}
      <ProductDetailsModal
        tile={selectedTile}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onBuyNow={(t) => {
          setIsDetailsOpen(false);
          handleBuyNow(t);
        }}
      />
      <BuyNowModal
        tile={selectedTile}
        isOpen={isBuyNowOpen}
        onClose={() => setIsBuyNowOpen(false)}
      />
    </div>
  );
};

export default TilesPage;
