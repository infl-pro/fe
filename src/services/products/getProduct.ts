import Axios from 'utils/Axios';

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

const getProduct = async (
    params: GetProductParams,
): Promise<GetProductListReturned> => {
    const response = await Axios.get('/product', { params });

    console.log('getProduct', response);
    return response.data;
};

export default getProduct;
