import { Utensils, Coffee } from 'lucide-react';

interface OptionsSectionProps {
    includeCutlery: boolean;
    onIncludeCutleryChange: (checked: boolean) => void;
    numSoftDrinks: number;
    onNumSoftDrinksChange: (value: number) => void;
    numPlates: number;
    onNumPlatesChange: (value: number) => void;
    totalPrice: number;
    onAddToCart: () => void;
}

const OptionsSection = ({
    includeCutlery,
    onIncludeCutleryChange,
    numSoftDrinks,
    onNumSoftDrinksChange,
    numPlates,
    onNumPlatesChange,
    totalPrice,
    onAddToCart,
}: OptionsSectionProps) => {
    return (
        <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Utensils className="w-5 h-5 text-gray-500" />
                    <span>Include cutlery</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={includeCutlery}
                        onChange={(e) => onIncludeCutleryChange(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Coffee className="w-5 h-5 text-gray-500" />
                    <span>Soft Drinks</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onNumSoftDrinksChange(Math.max(0, numSoftDrinks - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{numSoftDrinks}</span>
                    <button
                        onClick={() => onNumSoftDrinksChange(numSoftDrinks + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span>Number of Plates</span>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onNumPlatesChange(Math.max(1, numPlates - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="w-8 text-center">{numPlates}</span>
                    <button
                        onClick={() => onNumPlatesChange(numPlates + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between font-semibold text-lg">
                <span>Total Price</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
                onClick={onAddToCart}
                className="w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default OptionsSection;