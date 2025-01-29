import React from "react";
import { Link } from "react-router-dom";
import { Timer, Tag, Percent, AlertCircle, Copy, ChevronRight } from "lucide-react";

export default function Offers() {

    const offers = [
        {
            id: "1",
            code: "NEWUSER50",
            title: "50% OFF on First Order",
            description: "Get 50% off up to ₹150 on your first order",
            validTill: "Valid till tonight 10 PM",
            terms: "Min order ₹200",
            tag: "New Users",
            color: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-600"
        },
        {
            id: "2",
            code: "WEEKEND40",
            title: "Weekend Special 40% OFF",
            description: "40% off on all orders above ₹500",
            validTill: "Valid today",
            terms: "Max discount ₹200",
            tag: "Weekend",
            color: "bg-orange-50",
            borderColor: "border-orange-200",
            textColor: "text-orange-600"
        },
        {
            id: "3",
            code: "BURGER30",
            title: "30% OFF on Burgers",
            description: "Get flat 30% off on all burgers",
            validTill: "Valid for next 2 hours",
            terms: "No minimum order",
            tag: "Category Special",
            color: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-600"
        },
        {
            id: "4",
            code: "FREEDEL",
            title: "Free Delivery",
            description: "Free delivery on your next 3 orders",
            validTill: "Valid for 24 hours",
            terms: "Min order ₹300",
            tag: "Limited Time",
            color: "bg-purple-50",
            borderColor: "border-purple-200",
            textColor: "text-purple-600"
        },
        {
            id: "5",
            code: "BULKORDER15",
            title: "Bulk Order Discount",
            description: "Perfect for office lunches or family gatherings. Order 5 or more meals and save big!",
            validTill: "Limited time offer",
            terms: "5 meals minimum",
            tag: "Most Popular",
            color: "bg-yellow-50",
            borderColor: "border-yellow-200",
            textColor: "text-yellow-600"
        },
        {
            id: "6",
            code: "MONTHLY20",
            title: "Monthly Meal Plan",
            description: "Curated meals delivered to your doorstep every day. Pause or cancel anytime.",
            validTill: "Monthly subscription",
            terms: "Starts at $199/month",
            tag: "Best Value",
            color: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-600"
        },
        {
            id: "birthday-special",
            code: "BIRTHDAY40",
            title: "Birthday Special",
            description: "Make your celebration extra special with our curated party platters and desserts.",
            validTill: "7 days validity",
            terms: "Order 2hrs in advance",
            tag: "Maximum Discount",
            color: "bg-pink-50",
            borderColor: "border-pink-200",
            textColor: "text-pink-600"
        },
        {
            id: "8",
            code: "FREEMEAL",
            title: "Daily Free Meal",
            description: "Join our elite membership for exclusive perks, early access, and special discounts.",
            validTill: "Annual membership",
            terms: "Priority service",
            tag: "New",
            color: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-600"
        }
    ];
    
    const [copied, setCopied] = React.useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Available Offers</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Timer className="w-4 h-4" />
                        <span>Offers refresh daily</span>
                    </div>
                </div>

                {/* Refer & Earn Banner */}
                <div className="mt-8 mb-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Refer & Earn</h3>
                            <p className="text-white/90 mb-4">Get ₹100 for every friend who places their first order</p>
                            <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                                Invite Friends
                            </button>
                        </div>
                        <div className="bg-white/20 p-3 rounded-lg">
                            <Percent className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            {/* Offer Header */}
                            <div className={`${offer.color} ${offer.borderColor} p-4 border-b`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${offer.color} ${offer.textColor}`}>
                                        {offer.tag}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(offer.code)}
                                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                                    >
                                        {offer.code}
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{offer.title}</h3>
                            </div>

                            {/* Offer Details */}
                            <div className="p-4">
                                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                                <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Timer className="w-4 h-4" />
                                        <span>{offer.validTill}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{offer.terms}</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/offers/${offer.id}`}
                                    className="flex items-center justify-between w-full text-sm font-medium text-orange-600 hover:text-orange-700 group"
                                >
                                    View Details
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}