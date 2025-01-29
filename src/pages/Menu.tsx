import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Coffee, IceCream, Pizza } from "lucide-react";
import { motion } from "framer-motion";

export default function Menu() {
  const categories = [
    {
      id: "main-dishes",
      name: "Main Dishes",
      description: "Delicious meals crafted with fresh ingredients",
      icon: Utensils,
      itemCount: 24,
    },
    {
      id: "beverages",
      name: "Beverages",
      description: "Refreshing drinks to complement your meal",
      icon: Coffee,
      itemCount: 18,
    },
    {
      id: "desserts",
      name: "Desserts",
      description: "Sweet treats to end your meal on a high note",
      icon: IceCream,
      itemCount: 12,
    },
    {
      id: "pizzas",
      name: "Pizzas",
      description: "Crispy and cheesy pizzas with a variety of toppings",
      icon: Pizza,
      itemCount: 15,
    },
  ];

  return (
    <div className="min-h-screen py-10 px-6 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-orange-600">Our Menu</h1>
        <p className="text-gray-700 mt-2 text-lg max-w-xl">
          Explore a wide range of delicious meals, beverages, and desserts.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-4 border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-4 bg-orange-100 rounded-full">
                <Icon className="h-10 w-10 text-orange-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                <p className="text-orange-600 font-semibold mt-2">{category.itemCount} items</p>
              </div>
              <Link
                to={`/category/${category.id}`}
                className="text-orange-500 font-bold text-lg"
              >
                →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
