import { Review } from "../types";

const reviewsDummyData = [
    {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        foodItemId: '1', // Pizza Slice
        rating: 4.5,
        comment: 'The pizza was amazing! Perfectly crispy and cheesy.',
        createdAt: '2023-10-15',
    },
    {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        foodItemId: '7', // Sushi Roll
        rating: 5,
        comment: 'Best sushi I’ve ever had. Fresh and delicious!',
        createdAt: '2023-10-14',
    },
    {
        id: '3',
        userId: 'user3',
        userName: 'Alice Johnson',
        foodItemId: '3', // Pasta Bowl
        rating: 4,
        comment: 'The pasta was good, but a bit too salty for my taste.',
        createdAt: '2023-10-13',
    },
    {
        id: '4',
        userId: 'user4',
        userName: 'Bob Brown',
        foodItemId: '12', // Chocolate Cake
        rating: 4.7,
        comment: 'The chocolate cake was heavenly. Highly recommend!',
        createdAt: '2023-10-12',
    },
    {
        id: '5',
        userId: 'user5',
        userName: 'Charlie Davis',
        foodItemId: '5', // Chicken Wings
        rating: 4.8,
        comment: 'Spicy and flavorful! The blue cheese dip was a perfect match.',
        createdAt: '2023-10-11',
    },
    {
        id: '6',
        userId: 'user6',
        userName: 'Eva Green',
        foodItemId: '6', // Greek Salad
        rating: 4.2,
        comment: 'Fresh and healthy. Loved the feta cheese and olives!',
        createdAt: '2023-10-10',
    },
] as Review[];

export default reviewsDummyData;