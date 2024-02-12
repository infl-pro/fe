import { Category } from 'types';
import Axios from 'utils/Axios';
import { useQuery } from '@tanstack/react-query';
import getProductList, {
    GetProductListParams,
    GetProductListReturned,
    GetProductListReturnedData,
    Product,
} from './getProductList';

const useSearch = ({
    page,
    searchCategory,
    searchValue,
    option,
    order,
    // initial,
}: GetProductListParams) => {
    const params: GetProductListParams = {};

    page && (params.page = page);
    searchCategory && (params.searchCategory = searchCategory);
    searchValue && (params.searchValue = searchValue);
    option && (params.option = option);
    order && (params.order = order);

    console.log(params);

    const { data, isLoading, isError } = useQuery<
        // ??
        GetProductListReturnedData,
        Error,
        GetProductListReturnedData
    >({
        queryKey: ['productList', params],
        queryFn: ({ queryKey }) => {
            const params = queryKey[1];

            console.log('!!!!!!!!!!!!!!!!!', params);
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

    console.log(data);
    return {
        data: data,
        isLoading,
        isError,
    };
};

export default useSearch;
