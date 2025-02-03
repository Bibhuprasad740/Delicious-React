import { useState, useEffect } from 'react';
import { Bell, Check, Clock, CheckCircle } from 'lucide-react';
import notificationsDummyData from '../dummy_data/notifications_data';
import { Notification } from '../types';

const Notifications = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

    useEffect(() => {
        setNotifications(notificationsDummyData);
        const unreadCount = notificationsDummyData.filter((notification) => !notification.isRead).length;
        setUnreadNotifications(unreadCount);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications((prevNotifications) => {
            const updatedNotifications = prevNotifications.map((notification) =>
                notification.id === id ? { ...notification, isRead: true } : notification
            );
            setUnreadNotifications(updatedNotifications.filter((notification) => !notification.isRead).length);
            return updatedNotifications;
        });
    };

    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) => ({ ...notification, isRead: true }))
        );
        setUnreadNotifications(0);
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        const timeUnits: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
            { unit: 'year', seconds: 31536000 },
            { unit: 'month', seconds: 2592000 },
            { unit: 'week', seconds: 604800 },
            { unit: 'day', seconds: 86400 },
            { unit: 'hour', seconds: 3600 },
            { unit: 'minute', seconds: 60 },
            { unit: 'second', seconds: 1 }
        ];

        for (const { unit, seconds } of timeUnits) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-interval, unit);
            }
        }

        return 'Just now';
    };

    return (
        <div className="mb-12 min-h-screen bg-gray-50">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg">
                <div className="max-w-3xl mx-auto p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">Notifications</h1>
                            {unreadNotifications > 0 && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white text-orange-600">
                                    {unreadNotifications} new
                                </span>
                            )}
                        </div>
                        <button
                            onClick={markAllAsRead}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <CheckCircle className="h-5 w-5 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="max-w-3xl mx-auto p-6 space-y-4">
                {notifications.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                        <Bell className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-500">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-6 bg-white rounded-xl shadow-sm transition-all hover:shadow-md ${!notification.isRead ? 'border-l-8 border-r-2 border-orange-500' : ''
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-gray-900">
                                                {notification.title}
                                            </h3>
                                            {!notification.isRead && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {notification.message}
                                        </p>
                                        <div className="flex items-center gap-4 pt-2">
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {formatTimestamp(notification.timestamp)}
                                            </div>
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="inline-flex items-center text-xs text-orange-600 hover:text-orange-700 font-medium"
                                                >
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;