export const products: Array<{
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}> = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description:
      'Experience premium sound quality with these comfortable over-ear headphones. Featuring active noise cancellation, 30-hour battery life, and a sleek design that looks as good as it sounds.',
    price: 129.99,
    imageUrl: '/headphones.jpg',
    category: 'Electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description:
      'Track your fitness goals with this advanced smartwatch. Features include heart rate monitoring, sleep tracking, 20+ exercise modes, and a 7-day battery life. Water-resistant up to 50 meters.',
    price: 89.99,
    imageUrl: '/smartwatch.jpg',
    category: 'Wearables',
    inStock: true,
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    description:
      'Brew the perfect cup of coffee every morning with this programmable coffee maker. Features adjustable brew strength, keep-warm function, and an elegant stainless steel design.',
    price: 79.5,
    imageUrl: '/coffeemaker.jpg',
    category: 'Home & Kitchen',
    inStock: false,
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description:
      'Work in comfort with this ergonomic office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable height and tilt settings for optimal posture.',
    price: 199.99,
    imageUrl: '/chair.jpg',
    category: 'Furniture',
    inStock: true,
  },
  {
    id: '5',
    name: 'Portable Power Bank',
    description:
      'Never run out of battery with this high-capacity power bank. Charge multiple devices simultaneously with 20,000mAh capacity, fast charging support, and compact design for travel.',
    price: 49.99,
    imageUrl: '/powerbank.jpg',
    category: 'Electronics',
    inStock: true,
  },
];

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId) || null;
}
