import { FoodItem } from "../types";

const foodItems = [
    {
        id: '1',
        name: "Pizza Slice",
        price: 50,
        description: "Fresh baked pizza slice with melted mozzarella and tangy tomato sauce",
        categoryId: "snacks-appetizers",
        category: "Snacks & Appetizers",
        rating: 4.5,
        calories: 250,
        ingredients: ["mozzarella cheese", "tomato sauce", "pizza dough", "oregano"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee"
        ],
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },
    {
        id: '2',
        name: "Mini Burger",
        price: 60,
        description: "Juicy mini burger with premium beef patty and cheddar cheese",
        categoryId: "snacks-appetizers",
        category: "Snacks & Appetizers",
        rating: 4.3,
        calories: 300,
        ingredients: ["beef patty", "cheddar cheese", "lettuce", "tomato", "burger bun"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            "https://images.unsplash.com/photo-1550317138-10000687a72b"
        ],
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        id: '3',
        name: "Pasta Bowl",
        price: 70,
        description: "Fresh pasta in rich tomato sauce with basil and parmesan",
        categoryId: "main-course",
        category: "Main Course",
        rating: 4.4,
        calories: 400,
        ingredients: ["penne pasta", "tomato sauce", "basil", "parmesan cheese", "olive oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
            "https://images.unsplash.com/photo-1556761223-4c4282c73f77"
        ],
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
    },
    {
        id: '4',
        name: "Spring Rolls",
        price: 40,
        description: "Crispy vegetable spring rolls with sweet chili sauce",
        categoryId: "asian-cuisine",
        category: "Asian Cuisine",
        rating: 4.2,
        calories: 200,
        ingredients: ["cabbage", "carrots", "spring roll wrapper", "mushrooms", "glass noodles"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1536510233921-8e5043fce771",
            "https://images.unsplash.com/photo-1544037803-b11e40a76220"
        ],
        image: "https://images.unsplash.com/photo-1536510233921-8e5043fce771"
    },
    {
        id: '5',
        name: "Chicken Wings",
        price: 80,
        description: "Spicy buffalo chicken wings with blue cheese dip",
        categoryId: "snacks-appetizers",
        category: "Snacks & Appetizers",
        rating: 4.6,
        calories: 450,
        ingredients: ["chicken wings", "buffalo sauce", "butter", "blue cheese dip"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1",
            "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
        ],
        image: "https://images.unsplash.com/photo-1569691899455-88464f6d3ab1"
    },
    {
        id: '6',
        name: "Greek Salad",
        price: 55,
        description: "Fresh Greek salad with feta cheese and olives",
        categoryId: "salads",
        category: "Salads",
        rating: 4.3,
        calories: 180,
        ingredients: ["cucumber", "tomatoes", "red onion", "feta cheese", "kalamata olives", "olive oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1540420773420-3366772f4999",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        ],
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999"
    },
    {
        id: '7',
        name: "Sushi Roll",
        price: 90,
        description: "California roll with fresh crab meat and avocado",
        categoryId: "japanese",
        category: "Japanese",
        rating: 4.7,
        calories: 320,
        ingredients: ["crab meat", "avocado", "cucumber", "sushi rice", "nori seaweed"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c"
        ],
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351"
    },
    {
        id: '8',
        name: "Mushroom Risotto",
        price: 75,
        description: "Creamy mushroom risotto with truffle oil",
        categoryId: "main-course",
        category: "Main Course",
        rating: 4.5,
        calories: 380,
        ingredients: ["arborio rice", "mushrooms", "parmesan", "white wine", "truffle oil"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
            "https://images.unsplash.com/photo-1549203438-a7696aad3b33"
        ],
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371"
    },
    {
        id: '9',
        name: "Cola",
        price: 25,
        description: "Chilled cola with ice",
        categoryId: "beverages",
        category: "Beverages",
        rating: 4.2,
        calories: 140,
        ingredients: ["carbonated water", "high fructose corn syrup", "caramel color", "phosphoric acid"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1544145945-f90425340c7e",
            "https://images.unsplash.com/photo-1629203849820-fdd70d49c28a"
        ],
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e"
    },
    {
        id: '10',
        name: "Lemon Soda",
        price: 20,
        description: "Refreshing lemon-flavored carbonated drink",
        categoryId: "beverages",
        category: "Beverages",
        rating: 4.1,
        calories: 120,
        ingredients: ["carbonated water", "lemon juice", "sugar", "citric acid"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97"
        ],
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd"
    },
    {
        id: '11',
        name: "Orange Juice",
        price: 30,
        description: "Fresh squeezed orange juice",
        categoryId: "beverages",
        category: "Beverages",
        rating: 4.4,
        calories: 110,
        ingredients: ["orange juice", "pulp"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1613478223719-2ab802602423",
            "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b"
        ],
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423"
    },
    {
        id: '12',
        name: "Chocolate Cake",
        price: 65,
        description: "Rich chocolate cake with ganache frosting",
        categoryId: "desserts",
        category: "Desserts",
        rating: 4.8,
        calories: 350,
        ingredients: ["chocolate", "flour", "eggs", "sugar", "butter", "cream"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62"
        ],
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587"
    },
    {
        id: '13',
        name: "Pad Thai",
        price: 85,
        description: "Classic Thai stir-fried rice noodles with tofu, shrimp, and peanuts",
        categoryId: "asian-cuisine",
        category: "Asian Cuisine",
        rating: 4.6,
        calories: 380,
        ingredients: ["rice noodles", "tofu", "shrimp", "peanuts", "bean sprouts", "eggs", "tamarind sauce"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1559314809-0d155014e29e",
            "https://images.unsplash.com/photo-1634862745558-1c702a512d5b"
        ],
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e"
    },
    {
        id: '14',
        name: "Dim Sum Platter",
        price: 95,
        description: "Assorted steamed dumplings with various fillings",
        categoryId: "asian-cuisine",
        category: "Asian Cuisine",
        rating: 4.7,
        calories: 420,
        ingredients: ["shrimp dumplings", "pork shumai", "vegetable dumplings", "rice flour", "bamboo shoots"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c",
            "https://images.unsplash.com/photo-1614740020710-a230273f88d7",
        ],
        image: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c"
    },
    {
        id: '15',
        name: "Ramen Bowl",
        price: 95,
        description: "Traditional Japanese ramen with chashu pork and soft-boiled egg",
        categoryId: "japanese",
        category: "Japanese",
        rating: 4.8,
        calories: 550,
        ingredients: ["ramen noodles", "pork chashu", "soft-boiled egg", "nori", "bamboo shoots", "pork broth"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
            "https://images.unsplash.com/photo-1591814468924-caf88d1232e1"
        ],
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624"
    },
    {
        id: '16',
        name: "Tempura Set",
        price: 88,
        description: "Crispy tempura with assorted vegetables and prawns",
        categoryId: "japanese",
        category: "Japanese",
        rating: 4.5,
        calories: 480,
        ingredients: ["prawns", "sweet potato", "broccoli", "tempura batter", "dipping sauce"],
        dietaryType: "non-veg",
        images: [
            "https://images.unsplash.com/photo-1615761136599-86165bdf1a83",
            "https://images.unsplash.com/photo-1616761496231-5e22b8dfb97b"
        ],
        image: "https://images.unsplash.com/photo-1615761136599-86165bdf1a83"
    },
    {
        id: '17',
        name: "Caesar Salad",
        price: 65,
        description: "Classic Caesar salad with romaine lettuce and garlic croutons",
        categoryId: "salads",
        category: "Salads",
        rating: 4.4,
        calories: 320,
        ingredients: ["romaine lettuce", "croutons", "parmesan cheese", "caesar dressing", "black pepper"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
            "https://images.unsplash.com/photo-1580013759032-c96505e24c1f"
        ],
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9"
    },
    {
        id: '18',
        name: "Quinoa Buddha Bowl",
        price: 70,
        description: "Healthy quinoa bowl with roasted vegetables and tahini dressing",
        categoryId: "salads",
        category: "Salads",
        rating: 4.6,
        calories: 380,
        ingredients: ["quinoa", "roasted chickpeas", "sweet potato", "kale", "tahini dressing", "avocado"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
            "https://images.unsplash.com/photo-1543339308-43e59d6b73a6"
        ],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
    },
    {
        id: '19',
        name: "Tiramisu",
        price: 70,
        description: "Classic Italian tiramisu with coffee-soaked ladyfingers",
        categoryId: "desserts",
        category: "Desserts",
        rating: 4.7,
        calories: 380,
        ingredients: ["mascarpone cheese", "ladyfingers", "coffee", "cocoa powder", "eggs"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9",
            "https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc"
        ],
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9"
    },
    {
        id: '20',
        name: "Apple Pie",
        price: 60,
        description: "Warm apple pie with vanilla ice cream",
        categoryId: "desserts",
        category: "Desserts",
        rating: 4.5,
        calories: 420,
        ingredients: ["apples", "pie crust", "cinnamon", "butter", "vanilla ice cream"],
        dietaryType: "veg",
        images: [
            "https://images.unsplash.com/photo-1535920527002-b35e96722eb9",
            "https://images.unsplash.com/photo-1621236378699-8597ffc3b360"
        ],
        image: "https://images.unsplash.com/photo-1535920527002-b35e96722eb9"
    },
    {
        id: '21',
        name: 'Grilled Salmon Bowl',
        price: 24.99,
        description: 'Fresh Atlantic salmon served with quinoa, roasted vegetables, and our signature sauce',
        categoryId: "main-course",
        category: "Main Course",
        rating: 4.8,
        calories: 650,
        ingredients: ['Atlantic Salmon', 'Quinoa', 'Roasted Vegetables', 'Signature Sauce'],
        dietaryType: 'non-veg',
        images: [
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1580959375944-abd7e991f971?auto=format&fit=crop&q=80&w=800'
        ],
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    }
] as FoodItem[];

export default foodItems;