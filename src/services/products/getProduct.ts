import Axios from 'utils/Axios';
import { GetProductListReturned } from './getProductList';
import { Product } from 'types';

export type GetProductParams = {
    /**
     * 취득할 상품
     */
    id: number;
};

/**
 * 제품 API(개별 취득)
 * @param params 상품 ID
 * @returns 상품
 */

const getProduct = async (id: number): Promise<Product> => {
    const response = await Axios.get(`/product/${id}`);

    console.log('getProduct', response);
    return response.data;
};

export default getProduct;
