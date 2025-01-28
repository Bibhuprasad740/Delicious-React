import React from 'react';
import { Clock, Users, Gift, Sparkles } from 'lucide-react';

export default function Offers() {
    const offers = [
        {
            title: 'Bulk Order Discount',
            description: 'Perfect for office lunches or family gatherings. Order 5 or more meals and save big!',
            savings: '15% OFF',
            feature: 'Most Popular',
            icon: Users,
            duration: 'Limited time offer',
            minOrder: '5 meals minimum'
        },
        {
            title: 'Monthly Meal Plan',
            description: 'Curated meals delivered to your doorstep every day. Pause or cancel anytime.',
            savings: '20% OFF',
            feature: 'Best Value',
            icon: Clock,
            duration: 'Monthly subscription',
            minOrder: 'Starts at $199/month'
        },
        {
            title: 'Birthday Special',
            description: 'Make your celebration extra special with our curated party platters and desserts.',
            savings: '10% OFF',
            feature: 'Free Cake',
            icon: Gift,
            duration: '7 days validity',
            minOrder: 'Order 48hrs in advance'
        },
        {
            title: 'Daily Free Meal',
            description: 'Join our elite membership for exclusive perks, early access, and special discounts.',
            savings: 'FREE',
            feature: 'New',
            icon: Sparkles,
            duration: 'Annual membership',
            minOrder: 'Priority service'
        }
    ];

    return (
        <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our exclusive deals and save big on your favorite meals
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offers.map((offer, index) => {
                        const Icon = offer.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-xl border-2 border-gray-100 hover:border-orange-500 overflow-hidden transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="p-6 relative">
                                    {/* Decorative circle */}
                                    <div className="absolute -right-12 -top-12 bg-orange-500/10 w-32 h-32 rounded-full group-hover:bg-orange-500/20 transition-all duration-300" />

                                    {/* Content */}
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <Icon className="h-8 w-8 text-orange-500" />
                                            <span className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full">
                                                {offer.feature}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
                                        <p className="text-gray-600 text-sm mb-4">{offer.description}</p>

                                        <div className="text-3xl font-bold text-orange-500 mb-4">
                                            {offer.savings}
                                        </div>

                                        <div className="text-sm text-gray-500 mb-6">
                                            <p>{offer.duration}</p>
                                            <p>{offer.minOrder}</p>
                                        </div>

                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors duration-200">
                                            Proceed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}