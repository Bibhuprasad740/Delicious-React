import { Menu, Bell } from 'lucide-react';

interface AppbarProps {
    unreadNotifications: number;
    handleSidePanelToggle: () => void;
}

const AppBar: React.FC<AppbarProps> = ({ unreadNotifications, handleSidePanelToggle }) => {

    return (
        <div className="py-4 px-6 flex items-center justify-between mb-4">
            {/* Menu Icon */}
            <button
                onClick={handleSidePanelToggle}
                className="hover:text-gray-200 transition-colors"
            >
                <Menu className="h-7 w-7" />
            </button>

            {/* App Title */}
            <h1 className="text-3xl font-bold font-sans">Delicious</h1>

            {/* Notifications Icon */}
            <div className="relative">
                <button className="text-orange hover:text-gray-200 transition-colors">
                    <Bell className="h-7 w-7" />
                </button>
                {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadNotifications}
                    </span>
                )}
            </div>
        </div>
    );
};

export default AppBar;