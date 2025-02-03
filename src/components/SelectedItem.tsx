import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import { FoodItem } from '../types';

interface SelectedItemProps {
    item: FoodItem;
    onRemoveItem: (itemId: string) => void;
}

const SelectedItem = ({ item, onRemoveItem }: SelectedItemProps) => {
    return (
        <motion.div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex items-center space-x-3">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <button
                onClick={() => onRemoveItem(item.id)}
                className="p-1 hover:bg-gray-200 rounded-full"
            >
                <X className="w-5 h-5 text-gray-500" />
            </button>
        </motion.div>
    );
};

export default SelectedItem;