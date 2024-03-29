export type LoginResponseBody = {
    accessToken: string;
    refreshToken: string;
};

export type Category = 'TOP' | 'BOTTOM' | 'OUTER' | 'ACCESSORY';

export type User = {
    username: string;
    password: string;
    name: string;
    email: string;
};

type ProductDetailImaage = {
    url: string;
};

export type Product = {
    productId: number;
    productName: string;
    price: number;
    description: string;
    stockQuantity: number;
    thumbnailUrl: string;
    imgUrl: string;
    brandName: string;
    category: string;
    isPurchased: boolean;
    sellerName: string;
    isPurchased: boolean;
    isSeller: boolean;
    imgList: ProductDetailImaage[];
};
