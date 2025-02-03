import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import categories from '../dummy_data/categories_data';
import foodItems from '../dummy_data/food_items_data';
import FoodItemCard from '../components/FoodItemCard';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFoodItems = selectedCategory
    ? foodItems.filter((item) =>
      item.categoryId === selectedCategory &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <div className="mb-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-0">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search Bar */}
        <div className="relative mb-4 m-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for your favorite dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-4 border-0 ring-1 ring-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 transition-shadow text-lg"
          />
        </div>

        {/* Main Content */}
        <div className="flex gap-0 border-orange-500">
          {/* Categories Sidebar */}
          <div className="w-48 shrink-0 bg-white shadow-md">
            <div className="p-2 h-full overflow-y-auto">
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`
                      group relative px-2 py-4 rounded-lg cursor-pointer transition-all duration-200
                      ${selectedCategory === category.id
                        ? 'bg-orange-50 shadow-md'
                        : 'hover:bg-slate-50'}
                    `}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <span className="font-medium text-slate-700">{category.name}</span>
                      <ChevronRight className={`
                        ml-auto h-5 w-5 transition-transform
                        ${selectedCategory === category.id
                          ? 'rotate-90 text-orange-500'
                          : 'text-slate-400'}
                      `} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="flex-1 bg-white shadow-md">
            <div className="px-1 py-4 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredFoodItems.map((item) => (
                  <FoodItemCard item={item} />
                ))}
                {filteredFoodItems.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                    <Search className="h-12 w-12 mb-4" />
                    <p className="text-lg">No items found. Try another search or category.</p>
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