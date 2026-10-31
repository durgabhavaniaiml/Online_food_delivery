import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Food from './models/Food.js';

dotenv.config();

const sampleFoods = [
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, crisp lettuce, tomato, pickles, and our signature burger sauce.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    category: 'Burgers',
  },
  {
    name: 'Spicy Crispy Chicken Burger',
    description: 'Golden fried crispy chicken breast tossed in spicy peri-peri dust with creamy jalapeño slaw.',
    price: 229,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    category: 'Burgers',
  },
  {
    name: 'Margherita Woodfired Pizza',
    description: 'San Marzano tomato sauce, fresh buffalo mozzarella, extra virgin olive oil, and sweet basil leaves.',
    price: 349,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&auto=format&fit=crop&q=80',
    category: 'Pizza',
  },
  {
    name: 'Loaded Pepperoni Pizza',
    description: 'Double layer of premium smoked pepperoni, mozzarella blend, oregano, and chili honey drizzle.',
    price: 429,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
    category: 'Pizza',
  },
  {
    name: 'Szechuan Chili Noodles',
    description: 'Wok-tossed noodles with bell peppers, spring onions, bok choy, and fiery Szechuan pepper oil.',
    price: 249,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&auto=format&fit=crop&q=80',
    category: 'Chinese',
  },
  {
    name: 'Steamed Dim Sum Basket',
    description: 'Assortment of 6 delicate crystal dumplings filled with seasoned vegetables and ginger-soy dip.',
    price: 219,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&auto=format&fit=crop&q=80',
    category: 'Chinese',
  },
  {
    name: 'Salmon Avocado Roll (8 pcs)',
    description: 'Fresh Norwegian salmon, hass avocado, toasted sesame seeds, served with pickled ginger and wasabi.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    category: 'Sushi',
  },
  {
    name: 'Molten Belgian Chocolate Lava Cake',
    description: 'Warm chocolate cake with an oozy dark ganache center, served with chocolate crisp pearls.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    category: 'Desserts',
  },
  {
    name: 'Classic New York Cheesecake',
    description: 'Velvety smooth cream cheese filling over buttery graham cracker crust with strawberry coulis.',
    price: 209,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
    category: 'Desserts',
  },
  {
    name: 'Fresh Mango Mint Cooler',
    description: 'Chilled Alphonso mango purée with fresh mint leaves, lime juice, and sparkling soda.',
    price: 129,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop&q=80',
    category: 'Drinks',
  },
  {
    name: 'Mediterranean Greek Salad',
    description: 'Crisp romaine, Kalamata olives, cucumbers, cherry tomatoes, and creamy feta dressed in oregano vinaigrette.',
    price: 239,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80',
    category: 'Salads',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding!');
    await Food.deleteMany({});
    await Food.insertMany(sampleFoods);
    console.log(`Successfully seeded ${sampleFoods.length} food items!`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
