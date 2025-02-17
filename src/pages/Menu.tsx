import { useState } from 'react';
import { Search, ChevronRight, Filter } from 'lucide-react';
import categories from '../dummy_data/categories_data';
import foodItems from '../dummy_data/food_items_data';
import FoodItemCard from '../components/FoodItemCard';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const filteredFoodItems = selectedCategory
    ? foodItems.filter((item) =>
      item.categoryId === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Our Menu</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for your favorite dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-0 ring-1 ring-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 transition-shadow text-base"
              />
            </div>
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg"
            >
              <Filter className="h-4 w-4" />
              <span>Categories</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 relative">
          {/* Categories Sidebar - mobile */}
          {showSidebar && (
            <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setShowSidebar(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
                        ${selectedCategory === category.id ? 'bg-orange-100' : 'hover:bg-slate-50'}
                      `}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowSidebar(false);
                      }}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm flex-shrink-0">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={selectedCategory === category.id ? 'font-medium text-orange-600' : 'text-slate-700'}>
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Categories Sidebar - desktop */}
          <div className="hidden md:block w-56 lg:w-64 shrink-0 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-slate-800">Categories</h2>
            </div>
            <div className="p-4 h-full overflow-y-auto">
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`
                      group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-150
                      ${selectedCategory === category.id
                        ? 'bg-orange-100'
                        : 'hover:bg-slate-50'}
                    `}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className={`font-medium ${selectedCategory === category.id ? 'text-orange-600' : 'text-slate-700'}`}>
                      {category.name}
                    </span>
                    {selectedCategory === category.id && (
                      <ChevronRight className="ml-auto h-4 w-4 text-orange-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Food Items Section */}
          <div className="mb-14 flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b p-4 md:p-6">
              <h2 className="text-xl font-semibold text-slate-800">{selectedCategoryName}</h2>
              <p className="text-slate-500 mt-1">{filteredFoodItems.length} items available</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFoodItems.map((item) => (
                  <FoodItemCard key={item.id} item={item} />
                ))}
                {filteredFoodItems.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-500">
                    <Search className="h-12 w-12 mb-6 text-slate-300" />
                    <p className="text-lg text-center">No items found in this category.</p>
                    <p className="text-sm mt-2 text-slate-400">Try selecting another category or adjusting your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;