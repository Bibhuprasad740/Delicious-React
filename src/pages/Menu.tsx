import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categories from "../dummy_data/categories_data";

export default function Menu() {
  return (
    <div className="mb-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore a wide range of delicious meals, beverages, and desserts crafted with love and fresh ingredients.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Category Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <p className="text-orange-600 font-semibold">4 items</p>
              </div>

              {/* View More Link */}
              <Link
                to={`/category/${category.id}`}
                className="absolute bottom-0 left-0 right-0 bg-orange-600 text-white text-center py-3 font-semibold hover:bg-orange-700 transition-colors"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}