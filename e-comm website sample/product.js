// ==========================================
// 🚨 CLEAN & ERROR-FREE PRODUCTS DATA 🚨
// ==========================================
const products = [
    {
        id: 'top-spider-graphic', 
        category: 'women', 
        title: 'Spider Graphic Drawstring Crop Top', 
        subtitle: 'Trendy Y2K Style',
        price: '₹399', mrp: '₹899', priceNum: 399, discount: '55% OFF',
        sizes: ['XS', 'S', 'M', 'L'],
        description: 'Elevate your streetwear aesthetic with this edgy spider graphic crop top. Features adjustable side drawstrings for a customized fit. Made from breathable, stretchable ribbed cotton blend.',
        sizeChart: [
            { size: 'XS', chest: '32"', length: '15"' },
            { size: 'S', chest: '34"', length: '16"' },
            { size: 'M', chest: '36"', length: '17"' },
            { size: 'L', chest: '38"', length: '18"' }
        ],
        colors: [
            { name: 'Black', hex: '#111827', images: ['./clothes images/blacktop.jpeg', './clothes images/blacktop(1).jpeg', './clothes images/blacktop(3).jpeg'] },
            { name: 'Pink', hex: '#fbcfe8', images: ['./clothes images/toppink.jpeg', './clothes images/toppink(1).jpeg', './clothes images/toppink(2).jpeg'] }
        ]
    },
    {
        id: 'top-asymmetric-layered', 
        category: 'women', 
        title: 'Asymmetric Layered Casual Top', 
        subtitle: 'Stylish Party Wear',
        price: '₹349', mrp: '₹999', priceNum: 349, discount: '65% OFF',
        sizes: ['XS', 'S', 'M', 'L'],
        description: 'A chic layered top featuring a unique asymmetric neckline and off-shoulder detail. Designed to hug your body beautifully for evening parties or weekend hangouts.',
        sizeChart: [
            { size: 'XS', chest: '32"', length: '16"' },
            { size: 'S', chest: '34"', length: '17"' },
            { size: 'M', chest: '36"', length: '18"' },
            { size: 'L', chest: '38"', length: '19"' }
        ],
        colors: [
            { name: 'Solid Black', hex: '#000000', images: ['./clothes images/topblack(1).jpeg', './clothes images/topblack.jpeg', './clothes images/topblack(2).jpeg'] },
            { name: 'Red', hex: '#ef4444', images: ['./clothes images/topred(2).jpeg', './clothes images/topred(1).jpeg', './clothes images/topred.jpeg'] },
            { name: 'White', hex: '#f8fafc', images: ['./clothes images/topwhite1.jpeg', './clothes images/topwhite.jpeg'] },
            { name: 'TABADTOD', hex: '#1e293b', images: ['./clothes images/top1.jpeg', './clothes images/top1(a).jpeg', './clothes images/top1(b).jpeg', './clothes images/top1(c).jpeg', './clothes images/top1(d).jpeg'] }
        ]
    },
    {
        id: 'women-jeans-1', 
        category: 'women', 
        title: 'Streetwear Graphic Denim Jeans', 
        subtitle: 'Light Fade High-Rise',
        price: '₹791', mrp: '₹1,999', priceNum: 791, discount: '60% OFF',
        sizes: ['26', '28', '30', '32'],
        description: 'Statement high-rise jeans featuring unique graphic patchwork and light fade detailing. Crafted from durable denim for a wide-leg fit.',
        sizeChart: [
            { size: '26', chest: '26"', length: '38"' },
            { size: '28', chest: '28"', length: '39"' },
            { size: '30', chest: '30"', length: '40"' },
            { size: '32', chest: '32"', length: '40"' }
        ],
        images: ['./clothes images/jeans1.jpeg', './clothes images/jeans1(a).jpeg']
    },
    {
        id: 'women-jeans-2', 
        category: 'women', 
        title: 'Classic Wide Leg Denim', 
        subtitle: 'Standard Blue Wash',
        price: '₹899', mrp: '₹1,799', priceNum: 899, discount: '50% OFF',
        sizes: ['26', '28', '30', '32', '34'],
        description: 'High-waisted wide leg jeans crafted with premium cotton denim.',
        sizeChart: [
            { size: '26', chest: '26"', length: '39"' },
            { size: '28', chest: '28"', length: '39"' },
            { size: '30', chest: '30"', length: '40"' },
            { size: '32', chest: '32"', length: '41"' }
        ],
        images: ['./clothes images/jeans2.jpeg', './clothes images/jenas2(a).jpeg', './clothes images/jeans2(b).jpeg']
    },
    {
        id: 'women-lowers', 
        category: 'women', 
        title: 'Piping Wide-Leg Cotton Joggers', 
        subtitle: 'Comfort Track Pants',
        price: '₹399', mrp: '₹899', priceNum: 399, discount: '55% OFF',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'Ultra-soft fleece cotton joggers featuring stylish contrast piping along the sides.',
        sizeChart: [
            { size: 'S', chest: '28"', length: '38"' },
            { size: 'M', chest: '30"', length: '39"' },
            { size: 'L', chest: '32"', length: '40"' }
        ],
        images: ['./clothes images/lower1.jpeg', './clothes images/lower2.jpeg', './clothes images/lower3.jpeg', './clothes images/lower4.jpeg', './clothes images/lower5.jpeg', './clothes images/lower6.jpeg']
    },
    {
        id: 'men-shirt-1', 
        category: 'men', 
        title: 'Textured Casual Shirt', 
        subtitle: 'Spread Collar Slim Fit',
        price: '₹599', mrp: '₹1,499', priceNum: 599, discount: '60% OFF',
        sizes: ['38', '40', '42', '44'],
        description: 'Crafted from premium textured cotton, this spread collar shirt offers a sharp slim fit.',
        sizeChart: [
            { size: '38', chest: '40"', length: '28"' },
            { size: '40', chest: '42"', length: '29"' }
        ],
        images: ['./clothes images/shirt1.jpeg', './clothes images/shirt1(a).jpeg']
    },
    {
        id: 'men-shirt-2', 
        category: 'men', 
        title: 'Solid Olive Green Shirt', 
        subtitle: 'Premium Cotton Blend',
        price: '₹499', mrp: '₹1,299', priceNum: 499, discount: '61% OFF',
        sizes: ['38', '40', '42', '44'],
        description: 'A versatile olive green solid shirt designed for modern men.',
        sizeChart: [
            { size: '38', chest: '40"', length: '28"' },
            { size: '40', chest: '42"', length: '29"' }
        ],
        images: ['./clothes images/shirt2.jpeg', './clothes images/shirt2(a).jpeg']
    },
    {
        id: 'men-shirt-3', 
        category: 'men', 
        title: 'Classic Formal White Shirt', 
        subtitle: 'Office Wear Essential',
        price: '₹649', mrp: '₹1,499', priceNum: 649, discount: '56% OFF',
        sizes: ['38', '40', '42', '44'],
        description: 'The definitive classic white formal shirt tailored to perfection.',
        sizeChart: [
            { size: '38', chest: '40"', length: '28"' },
            { size: '40', chest: '42"', length: '29"' }
        ],
        images: ['./clothes images/shirt3.jpeg', './clothes images/shirt3(a).jpeg']
    },
    {
        id: 'men-shirt-4-colors', 
        category: 'men', 
        title: 'Everyday Linen Blend Shirts', 
        subtitle: 'Breathable Summer Wear',
        price: '₹449', mrp: '₹1,199', priceNum: 449, discount: '62% OFF',
        sizes: ['38', '40', '42', '44'],
        description: 'Beat the heat in style with these relaxed-fit linen blend shirts.',
        sizeChart: [
            { size: '38', chest: '40"', length: '28"' },
            { size: '40', chest: '42"', length: '29"' }
        ],
        colors: [
            { name: 'Grey/White', hex: '#d1d5db', images: ['./clothes images/shirt4.png', './clothes images/shirt4(a).png', './clothes images/shirt4(b).png', './clothes images/shirt4(c).png'] },
            { name: 'Navy Blue', hex: '#1e3a8a', images: ['./clothes images/shirt4blue.png', './clothes images/shirt4blue(a).png', './clothes images/shirt4blue(b).png', './clothes images/shirt4blue(c).png'] },
            { name: 'Pale Pink', hex: '#fbcfe8', images: ['./clothes images/shirt4pale.png', './clothes images/shirt4pale(a).png', './clothes images/shirt4pale(b).png', './clothes images/shirt4pale(c).png'] }
        ]
    },
    {
        id: 'men-shirt-5', 
        category: 'men', 
        title: 'Striped Casual Button Down', 
        subtitle: 'Weekend Fashion',
        price: '₹549', mrp: '₹1,399', priceNum: 549, discount: '60% OFF',
        sizes: ['38', '40', '42', '44'],
        description: 'Soft fabric feel with a relaxed fit striped pattern.',
        sizeChart: [
            { size: '38', chest: '40"', length: '28"' }
        ],
        images: ['./clothes images/shirt5.png', './clothes images/shirt5(a).png', './clothes images/shirt5(b).png', './clothes images/shirt5(c).png']
    },
    {
        id: 'men-jeans-1', 
        category: 'men', 
        title: 'Rugged Biker Denim', 
        subtitle: 'Distressed Straight Fit',
        price: '₹999', mrp: '₹2,499', priceNum: 999, discount: '60% OFF',
        sizes: ['30', '32', '34', '36'],
        description: 'Heavy-duty biker denim with distressed detailing.',
        sizeChart: [
            { size: '30', chest: '30"', length: '40"' }
        ],
        images: ['./clothes images/menjeans1.jpeg', './clothes images/menjeans1(a).jpeg', './clothes images/menjeans1(b).jpeg', './clothes images/menjeans1(c).jpeg', './clothes images/menjeans1(d).jpeg']
    },
    {
        id: 'men-jeans-2', 
        category: 'men', 
        title: 'Classic Urban Denim', 
        subtitle: 'Regular Comfort Fit',
        price: '₹849', mrp: '₹1,999', priceNum: 849, discount: '57% OFF',
        sizes: ['30', '32', '34', '36'],
        description: 'Urban denim offering comfort with slight stretch.',
        sizeChart: [
            { size: '30', chest: '30"', length: '40"' }
        ],
        images: ['./clothes images/menjeans2.jpeg', './clothes images/menjeans2(a).jpeg', './clothes images/menjeans2(b).jpeg']
    },
    {
        id: 'kids-wear-1', 
        category: 'kids', 
        title: 'Little Champs Co-ord Set', 
        subtitle: 'Playful Everyday Wear',
        price: '₹349', mrp: '₹899', priceNum: 349, discount: '61% OFF',
        sizes: ['2-3Y', '4-5Y', '6-7Y'],
        description: '100% organic cotton co-ord set for active kids.',
        sizeChart: [
            { size: '2-3Y', chest: '22"', length: '14"' }
        ],
        images: ['./clothes images/kidswear1.jpeg', './clothes images/kidswear1(a).jpeg', './clothes images/kidswear1(b).jpeg', './clothes images/kidswear1(c).jpeg']
    },
    {
        id: 'kids-wear-2', 
        category: 'kids', 
        title: 'Toddler Denim Overalls', 
        subtitle: 'Cute & Comfortable',
        price: '₹499', mrp: '₹1,299', priceNum: 499, discount: '61% OFF',
        sizes: ['1-2Y', '2-3Y', '3-4Y'],
        description: 'Adjustable strap denim overalls for toddlers.',
        sizeChart: [
            { size: '1-2Y', chest: '20"', length: '18"' }
        ],
        images: ['./clothes images/kidswear2.jpeg', './clothes images/kidswear2(a).jpeg', './clothes images/kidswear2(b).jpeg']
    },
    {
        id: 'kids-girl-1', 
        category: 'kids', 
        title: 'Girls Floral Dress Set', 
        subtitle: 'Party & Casual Wear',
        price: '₹399', mrp: '₹999', priceNum: 399, discount: '60% OFF',
        sizes: ['3-4Y', '5-6Y', '7-8Y'],
        description: 'Lightweight floral dress for girls.',
        sizeChart: [
            { size: '3-4Y', chest: '22"', length: '22"' }
        ],
        images: ['./clothes images/girlkid1.jpeg', './clothes images/girld1(a).jpeg', './clothes images/girlkid1(b).jpeg']
    }
];