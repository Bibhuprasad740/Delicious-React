import React from "react";
import { Link } from "react-router-dom";
import { Timer, Percent, AlertCircle, Copy, ChevronRight } from "lucide-react";
import offers from "../dummy_data/offers_data";

export default function Offers() {

    const [copied, setCopied] = React.useState(null);

    const handleCopy = (code: any) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="mb-10 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Available Offers</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
                        <Timer className="w-4 h-4" />
                        <span>Offers refresh daily</span>
                    </div>
                </div>

                {/* Refer & Earn Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white mb-8 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Refer & Earn</h3>
                            <p className="text-white/90 mb-4">Get ₹100 for every friend who places their first order</p>
                            <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                                Invite Friends
                            </button>
                        </div>
                        <div className="bg-white/20 p-4 rounded-lg">
                            <Percent className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                {/* Offers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Offer Header */}
                            <div className={`${offer.color} ${offer.borderColor} p-6 border-b`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${offer.color} ${offer.textColor}`}>
                                        {offer.tag}
                                    </span>
                                    <button
                                        onClick={() => handleCopy(offer.code)}
                                        className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                                    >
                                        {offer.code}
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                            </div>

                            {/* Offer Details */}
                            <div className="p-6">
                                <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                                <div className="flex flex-col gap-3 text-sm text-gray-500 mb-6">
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