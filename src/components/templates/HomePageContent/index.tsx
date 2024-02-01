'use client';
import Link from 'next/link';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import ProductCard from 'components/organisms/ProductCard';
// import Layout from 'components/templates/Layout';
// import getAllProducts from 'services/products/get-all-products';
// import { ApiContext, Product } from 'types';
import useSearch from 'services/products/useSearch';
import Layout from '../LayoutStyle';
import {
    GetProductListReturnedData,
    Product,
} from 'services/products/getProductList';
import ClientComponentContaier from 'components/ClientComponentContaier';

const HomePageContent = ({ data }: { data: GetProductListReturnedData }) => {
    console.log(data);
    const { content, pageNumber, totalElements, totalPage } = data;

    // 상품 카드 캐러셀을 렌더링
    const renderProductCardCarousel = (products: Product[]) => {
        // thumnail 안들어오는듯
        return (
            <>
                {products.map((p: Product, i: number) => (
                    <ProductCard
                        title={p.productName}
                        price={p.productPrice}
                        imageUrl={p.productThumbnail}
                        key={i}
                    />
                ))}
            </>
        );
    };

    return (
        <ClientComponentContaier>
            <Layout isLogined={false}>
                <Flex paddingBottom={2} justifyContent="center">
                    <Box
                        paddingLeft={{ base: 2, md: 0 }}
                        paddingRight={{ base: 2, md: 0 }}
                        width={{ base: '100%', md: '1040px' }}
                    >
                        <Box marginBottom={3}>
                            {/* <Text as="h2" variant="large">
                                의류
                            </Text> */}
                            {renderProductCardCarousel(content)}
                        </Box>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default HomePageContent;
