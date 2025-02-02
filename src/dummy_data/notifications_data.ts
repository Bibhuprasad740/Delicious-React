import { Notification } from "../types";

const notificationsDummyData: Notification[] = [
    {
        id: '1',
        title: 'Order #12345 Confirmed',
        message: 'Your order has been received and is being processed.',
        timestamp: '2024-10-27T10:30:00Z',
        isRead: false,
        type: 'order',
    },
    {
        id: '2',
        title: 'New Offer Available!',
        message: 'Get 20% off on your next order with code OCT20.',
        timestamp: '2024-10-26T14:00:00Z',
        isRead: true,
        type: 'promo',
    },
    {
        id: '3',
        title: 'Order #67890 Delivered',
        message: 'Your order has been successfully delivered.',
        timestamp: '2024-10-25T16:45:00Z',
        isRead: true,
        type: 'order',
    },
    {
        id: '4',
        title: 'System Update',
        message: 'We have improved our app with a new design and features.',
        timestamp: '2024-10-24T09:15:00Z',
        isRead: true,
        type: 'system',
    },
    {
        id: '5',
        title: 'Order #13579 Preparing',
        message: 'Your order is currently being prepared.',
        timestamp: '2024-10-27T11:15:00Z',
        isRead: false,
        type: 'order',
    },
    {
        id: '6',
        title: 'Exclusive Birthday Offer!',
        message: 'Enjoy 50% off on your birthday!',
        timestamp: '2024-10-27T12:00:00Z',
        isRead: false,
        type: 'promo',
    },
] as Notification[];

export default notificationsDummyData;
