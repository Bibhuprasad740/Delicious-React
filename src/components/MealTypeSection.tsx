import { Cake, Coffee, Calendar, Plus, Trash2, Minus, Clock } from 'lucide-react';
import { CartItem, TimeSlot } from '../types';

// This component handles different meal types with distinct styling
export default function MealTypeSection({
    type,
    items,
    updateQuantity,
    removeFromCart
}: {
    type: string;
    items: CartItem[];
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
}) {
    // Configuration for different meal types
    const typeConfig = {
        'birthday-special': {
            icon: Cake,
            title: 'Birthday Special Platters',
            containerClasses: 'border-2 border-orange-100',
            headerClasses: 'bg-orange-100 border-b border-orange-100',
            iconClasses: 'text-orange-600',
            titleClasses: 'text-orange-800',
            listClasses: 'divide-y divide-orange-200',
            itemClasses: 'bg-white',
            imageClasses: 'border-2 border-orange-300',
            priceClasses: 'text-orange-700'
        },
        'monthly-meal': {
            icon: Calendar,
            title: 'Monthly Special Offerings',
            containerClasses: 'border-2 border-green-100',
            headerClasses: 'bg-green-100 border-b border-green-100',
            iconClasses: 'text-green-600',
            titleClasses: 'text-green-800',
            listClasses: 'divide-y divide-green-200',
            itemClasses: 'bg-white',
            imageClasses: 'border-2 border-green-300',
            priceClasses: 'text-green-700'
        },
        'regular': {
            icon: Coffee,
            title: 'Regular Menu Items',
            containerClasses: '',
            headerClasses: 'bg-gray-100 border-b border-gray-300',
            iconClasses: 'text-gray-700',
            titleClasses: 'text-gray-800',
            listClasses: 'divide-y divide-gray-200',
            itemClasses: '',
            imageClasses: '',
            priceClasses: 'text-gray-900'
        }
    };

    // Get configuration for current type, defaulting to regular if type not found
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.regular;
    const Icon = config.icon;

    if (!items || items.length === 0) return null;

    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-8 ${config.containerClasses}`}>
            <div className={`p-4 flex items-center space-x-3 ${config.headerClasses}`}>
                <Icon className={`h-6 w-6 ${config.iconClasses}`} />
                <h2 className={`text-xl font-semibold ${config.titleClasses}`}>{config.title}</h2>
            </div>
            <ul className={config.listClasses}>
                {items.map((cartItem) => (
                    <li key={cartItem.foodItem.id} className={`p-6 ${config.itemClasses}`}>
                        <div className="flex items-center">
                            <img
                                src={cartItem.foodItem.image}
                                alt={cartItem.foodItem.name}
                                className={`h-24 w-24 object-cover rounded-md ${config.imageClasses}`}
                            />
                            <div className="ml-6 flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {cartItem.foodItem.name}
                                    </h3>
                                    <p className={`text-lg font-medium ${config.priceClasses}`}>
                                        ${(cartItem.foodItem.price * cartItem.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    {cartItem.foodItem.description}
                                </p>
                                
                                {/* Display timeslot information for monthly meals */}
                                {type === 'monthly-meal' && cartItem.timeslot && (
                                    <div className="mt-2 flex items-center text-sm text-green-600">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span className="font-medium">
                                            {cartItem.timeslot.slot}: {cartItem.timeslot.time}
                                        </span>
                                    </div>
                                )}
                                
                                <div className="mt-4 flex items-center justify-between">
                                    {type === 'regular' ? (
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(cartItem.foodItem.id, cartItem.quantity - 1)}
                                                className="p-1 rounded-md hover:bg-gray-100"
                                                disabled={cartItem.quantity <= 1}
                                            >
                                                <Minus className="h-5 w-5 text-gray-500" />
                                            </button>
                                            <span className="text-gray-700">{cartItem.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(cartItem.foodItem.id, cartItem.quantity + 1)}
                                                className="p-1 rounded-md hover:bg-gray-100"
                                            >
                                                <Plus className="h-5 w-5 text-gray-500" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div /> // Empty div to maintain layout for special items
                                    )}
                                    <button
                                        onClick={() => removeFromCart(cartItem.foodItem.id)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}