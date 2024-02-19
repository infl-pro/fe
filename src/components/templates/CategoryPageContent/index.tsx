import React, { useState } from 'react';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import Input from 'components/atoms/Input';
import { SearchIcon } from 'components/atoms/IconButton';
import {
    GetProductListReturnedData,
    OptionType,
    OrderType,
    Product,
} from 'services/products/getProductList';
import ProductCard from 'components/organisms/ProductCard';
import useSearch from 'services/products/useSearch';
import Link from 'next/link';
import { Pagination } from '@mui/material';
import OrderMenuItem from 'components/atoms/OrderMenuItem';
import { parseCookies } from 'nookies';

const index = ({ searchCategory }) => {
    const [input, setInput] = useState('');
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [option, setOption] = useState<OptionType>('id');
    const [order, setOrder] = useState<OrderType>('desc');

    const { data, isLoading, isError } = useSearch({
        searchCategory,
        searchValue: keyword,
        page,
        option,
        order,
    });

    const { token } = parseCookies();

    const onClickSearchIcon = () => {
        setKeyword(input);
    };

    const onClickOrderMenu = (option, order) => {
        setOption(option);
        setOrder(order);
    };

    // 상품 카드 캐러셀을 렌더링 // 이름 바꾸기
    const renderProductCardCarousel = (products: Product[]) => {
        return (
            <>
                {products?.map((p: Product, i: number) => (
                    <Link href={`/products/${p.productId}`} key={i}>
                        <ProductCard
                            title={p.productName}
                            price={p.productPrice}
                            imageUrl={`https://shapp.shop/api${p.productThumbnail}`}
                        />
                    </Link>
                ))}
            </>
        );
    };

    console.log('categoryData', data);
    return (
        <Layout isLogined={!!token}>
            <Flex
                paddingBottom={2}
                alignItems="center"
                flexDirection={'column'}
            >
                <Box
                    paddingLeft={{ base: 2, md: 0 }}
                    paddingRight={{ base: 2, md: 0 }}
                    width={{ base: '1070px', md: '1040px' }}
                >
                    <Box marginBottom={3} marginTop={1}>
                        <Flex width="100%" justifyContent={'right'} gap={'4px'}>
                            <Box width={'290px'}>
                                <Input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                            </Box>
                            <Flex alignItems={'center'}>
                                <SearchIcon
                                    size={28}
                                    onClick={onClickSearchIcon}
                                />
                            </Flex>
                        </Flex>
                        <Flex justifyContent={'space-between'} marginTop={2}>
                            <Text as="h2" variant="large" marginLeft={'140px'}>
                                {searchCategory.toUpperCase()}
                            </Text>
                            <Flex gap={'15px'}>
                                <OrderMenuItem
                                    onClick={() =>
                                        onClickOrderMenu('id', 'desc')
                                    }
                                >
                                    신상품순
                                </OrderMenuItem>
                                <OrderMenuItem
                                    onClick={() =>
                                        onClickOrderMenu('price', 'asc')
                                    }
                                >
                                    낮은 가격순
                                </OrderMenuItem>
                                <OrderMenuItem
                                    onClick={() =>
                                        onClickOrderMenu('price', 'desc')
                                    }
                                >
                                    높은 가격순
                                </OrderMenuItem>
                            </Flex>
                        </Flex>
                        <Flex
                            flexWrap={'wrap'}
                            justifyContent={'center'}
                            gap={'29px'}
                            marginTop={1}
                        >
                            {renderProductCardCarousel(data?.content ?? [])}
                        </Flex>
                    </Box>
                </Box>
                <Pagination
                    count={!isLoading && data.totalPage}
                    onChange={(e, page) => setPage(Number(page))}
                />
            </Flex>
        </Layout>
    );
};

export default index;
