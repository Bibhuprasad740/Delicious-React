import { Link, useParams } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const categoryData = {
    "main-dishes": {
        name: "Main Dishes",
        description: "Delicious meals crafted with fresh ingredients.",
        items: [
            {
                id: "1",
                name: "Grilled Chicken",
                description: "Juicy grilled chicken served with seasonal vegetables and herb-infused rice.",
                price: "$12.99",
                image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400",
                isVeg: false,
                spicyLevel: "mild",
                prepTime: "20 mins"
            },
            {
                id: "2",
                name: "Paneer Butter Masala",
                description: "Creamy paneer dish with aromatic spices and fresh naan bread.",
                price: "$10.99",
                image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
                isVeg: true,
                spicyLevel: "medium",
                prepTime: "25 mins"
            },
            {
                id: "3",
                name: "Salmon Teriyaki",
                description: "Fresh Atlantic salmon glazed with homemade teriyaki sauce.",
                price: "$15.99",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
                isVeg: false,
                spicyLevel: "mild",
                prepTime: "20 mins"
            }
        ],
    },
    beverages: {
        name: "Beverages",
        description: "Refreshing drinks to complement your meal.",
        items: [
            {
                id: "4",
                name: "Cold Coffee",
                description: "Chilled coffee with whipped cream and chocolate drizzle.",
                price: "$4.99",
                image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
                isVeg: true,
                size: "regular",
                canAddShot: true
            },
            {
                id: "5",
                name: "Mango Lassi",
                description: "Traditional Indian yogurt drink with fresh mango pulp.",
                price: "$3.99",
                image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400",
                isVeg: true,
                size: "regular",
                canAddShot: false
            },
            {
                id: "6",
                name: "Fresh Lime Soda",
                description: "Refreshing lime soda with mint leaves.",
                price: "$2.99",
                image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400",
                isVeg: true,
                size: "regular",
                canAddShot: false
            }
        ],
    },
    "desserts": {
        name: "Desserts",
        description: "Sweet treats to end your meal on a high note.",
        items: [
            {
                id: "7",
                name: "Chocolate Cake",
                description: "Triple-layered chocolate cake with ganache filling.",
                price: "$5.99",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
                isVeg: true,
                containsNuts: false,
                isGlutenFree: false
            },
            {
                id: "8",
                name: "Vanilla Ice Cream",
                description: "Creamy vanilla ice cream with choice of toppings.",
                price: "$3.99",
                image: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?w=400",
                isVeg: true,
                containsNuts: false,
                isGlutenFree: true
            },
            {
                id: "9",
                name: "Tiramisu",
                description: "Classic Italian dessert with coffee-soaked ladyfingers.",
                price: "$6.99",
                image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
                isVeg: true,
                containsNuts: false,
                isGlutenFree: false
            }
        ],
    },
    pizzas: {
        name: "Pizzas",
        description: "Crispy and cheesy pizzas with a variety of toppings.",
        items: [
            {
                id: "10",
                name: "Margherita Pizza",
                description: "Classic pizza with San Marzano tomatoes and fresh buffalo mozzarella.",
                price: "$8.99",
                image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
                isVeg: true,
                size: "medium",
                crustOptions: ["thin", "thick"]
            },
            {
                id: "11",
                name: "Pepperoni Pizza",
                description: "Spicy pepperoni with melted mozzarella and fresh basil.",
                price: "$9.99",
                image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
                isVeg: false,
                size: "medium",
                crustOptions: ["thin", "thick"]
            },
            {
                id: "12",
                name: "Vegetarian Supreme",
                description: "Loaded with bell peppers, mushrooms, olives, and onions.",
                price: "$10.99",
                image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
                isVeg: true,
                size: "medium",
                crustOptions: ["thin", "thick"]
            }
        ],
    },
};


export default function CategoryDetails() {
    const { categoryId } = useParams();
    const category = categoryData[categoryId] || {};

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                    <h1 className="text-2xl font-bold">{category.name}</h1>
                </div>
                <Link to="/menu" className="text-orange-600 hover:text-orange-700 font-medium">
                    Back to Menu
                </Link>
            </div>
            <p className="text-gray-600 mb-8">{category.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.items?.map((item) => (
                    <Link key={item.id} to={`/meal/${item.id}`} className="group">
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-medium">
                                    {item.price}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center space-x-1 mb-2">
                                    {renderStars(4)} {/* You might want to add a rating field to your data */}
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-1">
                                        <div
                                            className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm ${item.isVeg ? 'border-green-700' : 'border-red-700'
                                                }`}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-700' : 'bg-red-700'
                                                    }`}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {item.calories || '300'} cal {/* You might want to add a calories field to your data */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}