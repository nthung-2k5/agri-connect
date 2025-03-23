import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

// This would be replaced with actual database/API calls
const mockProducts = [
    {
        id: 1,
        name: "Gạo Bắc Hương",
        description: "Gạo thơm ngon từ đồng bằng sông Hồng, hạt dài, ít bị cắt gãy khi nấu",
        price: 15000,
        priceUnit: "kg",
        category: "Cây lương thực",
        region: "Đồng bằng sông Hồng",
        image: "https://placehold.co/300x200?text=Gạo+Bắc+Hương",
        quantity: 5000,
        availableUnit: "kg",
        seller: {
            name: "Nông trại Bắc Hương",
            rating: 4.8,
            location: "Hà Nam",
            verified: true
        },
        details: [
            "Vụ mùa: Tháng 10/2024",
            "Xuất xứ: Đồng bằng sông Hồng",
            "Độ ẩm: 14%",
            "Tỷ lệ tấm: <5%"
        ]
    },
    {
        id: 2,
        name: "Cà phê Robusta",
        description: "Cà phê hạt Robusta chất lượng cao từ Tây Nguyên, hương vị đậm đà",
        price: 80000,
        priceUnit: "kg",
        category: "Cây công nghiệp",
        region: "Tây Nguyên",
        image: "https://placehold.co/300x200?text=Cà+phê+Robusta",
        quantity: 2,
        availableUnit: "tấn",
        seller: {
            name: "Hợp tác xã Cà phê Buôn Ma Thuột",
            rating: 4.9,
            location: "Đắk Lắk",
            verified: true
        },
        details: [
            "Thu hoạch: Tháng 12/2024",
            "Độ cao: 600-800m",
            "Chế biến: Phơi khô tự nhiên",
            "Đóng gói: Bao PP"
        ]
    },
    // Add other products as needed
];

export const load: PageServerLoad = async ({ params }) => 
{
    const productId = parseInt(params.id);
    
    // Find the product with the matching ID
    const product = mockProducts.find(p => p.id === productId);
    
    if (!product) 
    {
        throw error(404, 'Không tìm thấy nông sản');
    }
    
    return {
        product
    };
};