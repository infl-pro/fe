import { Category } from 'types';
import Axios from 'utils/Axios';

export type GetProductListParams = {
    page?: number;
    searchCategory?: Category;
    searchValue?: string;
};

export type Product = {
    productId: number;
    productName: string;
    productPrice: number;
    productThumbnail: string;
    sellerName: string;
};

export type GetProductListReturnedData = {
    content: Product[];
    totalPage: number;
    totalElements: number;
    pageNumber: number;
};

export type GetProductListReturned = {
    success: boolean;
    status: number;
    type: null;
    message: string;
    data: GetProductListReturnedData;
};

const getProductList = async (
    params?: GetProductListParams,
): Promise<GetProductListReturned> => {
    const requestOptions = params ? { params } : {};

    const response = await Axios.get('/productList', requestOptions);

    console.log('~~~~~$$$$$$$$$$~~~~~', response.data.data);
    return response.data;
};

export default getProductList;
