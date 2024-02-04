import React from 'react';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import Input from 'components/atoms/Input';
import { SearchIcon } from 'components/atoms/IconButton';
import {
    GetProductListReturnedData,
    Product,
} from 'services/products/getProductList';
import ProductCard from 'components/organisms/ProductCard';
import useSearch from 'services/products/useSearch';

const index = () => {
    const { data, isLoading, isError } = useSearch({
        searchCategory: 'TOP',
    });

    const onClickSearchIcon = () => {};

    // 상품 카드 캐러셀을 렌더링 // 이름 바꾸기
    const renderProductCardCarousel = (products: Product[]) => {
        return (
            <>
                {products?.map((p: Product, i: number) => (
                    <ProductCard
                        title={p.productName}
                        price={p.productPrice}
                        imageUrl={`http://52.79.222.161:8080${p.productThumbnail}`}
                        key={i}
                    />
                ))}
            </>
        );
    };

    return (
        <Layout isLogined={false}>
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
                                <Input />
                            </Box>
                            <Flex alignItems={'center'}>
                                <SearchIcon
                                    size={28}
                                    onClick={onClickSearchIcon}
                                />
                            </Flex>
                        </Flex>
                        <Text as="h2" variant="large" marginLeft={'140px'}>
                            모두
                        </Text>
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
            </Flex>
        </Layout>
    );
};

export default index;
