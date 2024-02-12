import { Category } from 'types';
import Axios from 'utils/Axios';

export type OptionType = 'id' | 'price';

export type OrderType = 'desc' | 'asc';

export type GetProductListParams = {
    page?: number;
    searchCategory?: Category;
    searchValue?: string;
    option?: OptionType;
    order?: OrderType;
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
): Promise<GetProductListReturnedData> => {
    const requestOptions = params ? { params } : {};

    const response = await Axios.get('/productList', requestOptions);

    console.log('response', response);
    console.log('~~~~~$$$$$$$$$$~~~~~', response.data);
    return response.data.data;
};

export default getProductList;
