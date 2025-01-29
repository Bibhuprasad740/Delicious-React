import React from 'react';
import { useCartStore, CartItem } from '../store/cartStore';

const CartDisplay: React.FC = () => {
    const cartItems = useCartStore((state) => state.items);

    const renderBirthdaySpecials = (items: CartItem[]) => {
        const birthdaySpecials = items.filter((item) => item.isBirthdaySpecial);
        if (birthdaySpecials.length === 0) return null;

        return (
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                <h2 className="text-lg font-semibold mb-2">Birthday Specials</h2>
                {birthdaySpecials.map((item) => (
                    <div key={item.item.id} className="mb-2">
                        <p>{item.item.name} x {item.quantity}</p>
                        <p>Addons: Cutlery: {item.addons?.cutlery ? 'Yes' : 'No'}, Soft Drinks: {item.addons?.softDrinks}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            {renderBirthdaySpecials(cartItems)}
            {/* ... display other cart items */}
        </div>
    );
};

export default CartDisplay;
