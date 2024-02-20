'use client';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import ProductCard from 'components/organisms/ProductCard';
import Layout from '../LayoutStyle';
import getProductList, {
    GetProductListReturnedData,
    OptionType,
    OrderType,
    Product,
} from 'services/products/getProductList';
import ClientComponentContaier from 'components/ClientComponentContaier';
import Input from 'components/atoms/Input';
import { SearchIcon } from 'components/atoms/IconButton';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import OrderMenuItem from 'components/atoms/OrderMenuItem';
import Link from 'next/link';

const HomePageContent = ({
    data,
    isLogined,
}: {
    data: GetProductListReturnedData;
    isLogined: boolean;
}) => {
    const [input, setInput] = useState('');
    const [listData, setListData] = useState(data);
    const [option, setOption] = useState<OptionType>('id');
    const [order, setOrder] = useState<OrderType>('desc');

    const onClickSearchIcon = async () => {
        try {
            if (!input) return;
            const data = await getProductList({
                searchValue: input,
            });
            setListData(data);
        } catch (e) {
            console.log(e);
        }
    };

    const onChangePagenation = async page => {
        try {
            const data = await getProductList({
                page,
                option,
                order,
                searchValue: input,
            });
            setListData(data);
        } catch (e) {
            console.log(e);
        }
    };

    const onClickOrderMenu = async (option, order) => {
        try {
            const data = await getProductList({
                option,
                order,
            });
            setListData(data);
        } catch (e) {
            console.log(e);
        }
    };

    // 상품 카드 캐러셀을 렌더링
    const renderProductCardCarousel = (products: Product[]) => {
        console.log('products', products);
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

    console.log('isLogined', isLogined);
    return (
        <ClientComponentContaier>
            <Layout isLogined={isLogined}>
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
                            <Flex
                                width="100%"
                                justifyContent={'right'}
                                gap={'4px'}
                            >
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
                            <Flex
                                justifyContent={'space-between'}
                                marginTop={2}
                            >
                                <Text
                                    as="h2"
                                    variant="large"
                                    marginLeft={'140px'}
                                >
                                    ALL
                                </Text>
                                <Flex gap={'15px'}>
                                    <OrderMenuItem
                                        onClick={() => {
                                            onClickOrderMenu('id', 'desc');
                                            setOption('id');
                                            setOrder('desc');
                                        }}
                                    >
                                        신상품순
                                    </OrderMenuItem>
                                    <OrderMenuItem
                                        onClick={() => {
                                            onClickOrderMenu('price', 'asc');
                                            setOption('price');
                                            setOrder('asc');
                                        }}
                                    >
                                        낮은 가격순
                                    </OrderMenuItem>
                                    <OrderMenuItem
                                        onClick={() => {
                                            onClickOrderMenu('price', 'desc');
                                            setOption('price');
                                            setOrder('desc');
                                        }}
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
                                {renderProductCardCarousel(
                                    listData.content ?? [],
                                )}
                            </Flex>
                        </Box>
                    </Box>
                    <Pagination
                        count={listData.totalPage}
                        onChange={(e, page) => onChangePagenation(page)}
                    />
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default HomePageContent;
