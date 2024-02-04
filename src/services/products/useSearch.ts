import { Category } from 'types';
import Axios from 'utils/Axios';
import { useQuery } from '@tanstack/react-query';
import getProductList, {
    GetProductListParams,
    GetProductListReturned,
    Product,
} from './getProductList';

// 위 타입과 동일한 부분 합치기
export type UseSearchProps = {
    page?: number;
    searchCategory?: Category;
    searchValue?: string;
    // initial?: Product[];
};

const useSearch = ({
    page,
    searchCategory,
    searchValue,
    // initial,
}: UseSearchProps) => {
    const params: GetProductListParams = {};

    page && (params.page = page);
    searchCategory && (params.searchCategory = searchCategory);
    searchValue && (params.searchValue = searchValue);

    console.log(params);

    const { data, isLoading, isError } = useQuery<
        // ??
        GetProductListReturned,
        Error,
        GetProductListReturned
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
        data: data?.data,
        isLoading,
        isError,
    };
};

export default useSearch;
