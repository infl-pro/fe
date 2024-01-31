import { Category } from 'types';
import Axios from 'utils/Axios';
import { useQuery } from '@tanstack/react-query';

export type GetProductListParams = {
    page?: number;
    searchCategory?: Category;
    searchValue?: string;
};

type Product = {
    productId: number;
    productName: string;
    productPrice: number;
    productThumbnail: string;
    brandName: string;
};

type GetProductListReturnedData = {
    content: Product[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
};

// 위 타입과 동일한 부분 합치기
export type UseSearchProps = {
    page?: number;
    searchCategory?: Category;
    searchValue?: string;
    initial?: Product[];
};

const getProductList = async (
    params?: GetProductListParams,
): Promise<GetProductListReturnedData> => {
    const requestOptions = params ? { params } : {};

    const response = await Axios.get('/productList', requestOptions);
    return response.data;
};

const useSearch = ({
    page,
    searchCategory,
    searchValue,
    initial,
}: UseSearchProps) => {
    const params: GetProductListParams = {};

    page && (params.page = page);
    searchCategory && (params.searchCategory = searchCategory);
    searchValue && (params.searchValue = searchValue);

    console.log(params);

    const { data, isLoading, isError } = useQuery<
        GetProductListReturnedData,
        Error,
        GetProductListParams
    >({
        queryKey: ['productList', params],
        queryFn: ({ queryKey }) => {
            const params = queryKey[1];

            console.log(params);
            if (Object.keys(params).length !== 0) {
                console.log('aaa');
                return getProductList(params);
            } else {
                return getProductList();
            }
        },
        gcTime: Infinity,
        staleTime: Infinity,
    });

    return {
        products: data ?? initial ?? [],
        isLoading,
        isError,
    };
};

export default useSearch;
