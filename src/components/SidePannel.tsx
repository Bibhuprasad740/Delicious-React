import { Link } from 'react-router-dom';
import {
    X, User, Palette, Moon, Sun, LayoutGrid, Grid, List,
    Users, Settings, HelpCircle, Shield, LogOut
} from 'lucide-react';

interface SidePanelProps {
    isOpen: boolean;
    onClose: () => void;
    isDarkTheme: boolean;
    onToggleDarkTheme: () => void;
    isGridLayout: boolean;
    onToggleLayout: () => void;
    user: {
        name: string;
        email: string;
    };
}

const SidePanel = ({
    isOpen,
    onClose,
    isDarkTheme,
    onToggleDarkTheme,
    isGridLayout,
    onToggleLayout,
    user,
}: SidePanelProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 transition-opacity">
            <div className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300">
                {/* Header with close button */}
                <div className="p-6 border-b dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold dark:text-white">Menu</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b dark:border-gray-700">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                            <h3 className="font-medium dark:text-white">{user.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Main Menu Items */}
                <nav className="p-4">
                    <div className="space-y-1">
                        {/* Preferences Section */}
                        <div className="mb-6 space-y-4">
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium dark:text-white">Theme</span>
                                </div>
                                <button
                                    onClick={onToggleDarkTheme}
                                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700"
                                >
                                    {isDarkTheme ? (
                                        <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    ) : (
                                        <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                <div className="flex items-center gap-3">
                                    <LayoutGrid className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <span className="text-sm font-medium dark:text-white">Layout</span>
                                </div>
                                <button
                                    onClick={onToggleLayout}
                                    className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700"
                                >
                                    {isGridLayout ? (
                                        <Grid className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    ) : (
                                        <List className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <Link
                            to="/community"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium dark:text-white">Community</span>
                        </Link>

                        <Link
                            to="/settings"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium dark:text-white">Settings</span>
                        </Link>

                        <Link
                            to="/help-support"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium dark:text-white">Help & Support</span>
                        </Link>

                        <Link
                            to="/privacy-policy"
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm font-medium dark:text-white">Privacy Policy</span>
                        </Link>
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t dark:border-gray-700">
                    <button
                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;