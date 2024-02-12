'use client';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import ProductCard from 'components/organisms/ProductCard';
import Layout from 'components/templates/LayoutStyle';
import React from 'react';
import Link from 'next/link';
import Button from 'components/atoms/Button';
import ClientComponentContaier from 'components/ClientComponentContaier';

const ProductPageContent = () => {
    const handleAddToCartButtonClick = () => {
        // const productId = Number(product.id)
        // const result = cart.findIndex((v) => v.id === productId)
        // // 같은 상품이 카트에 없으면 카트에 추가한다
        // if (result === -1) {
        //   addProductToCart(product)
        // }
        // onAddToCartButtonClick && onAddToCartButtonClick(product)
    };

    return (
        <ClientComponentContaier>
            <Layout isLogined={false}>
                <Flex
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={{ base: 0, md: 2 }}
                    paddingRight={{ base: 0, md: 2 }}
                    justifyContent="center"
                    flexDirection={{ base: 'row', md: 'column' }}
                >
                    <Box>
                        <Flex
                            paddingTop={2}
                            paddingBottom={1}
                            justifyContent="center"
                        >
                            <ProductCard
                                variant="detail"
                                // title={product.title}
                                // price={product.price}
                                // imageUrl={product.imageUrl}
                                title={'product.title'}
                                price={300}
                                imageUrl={
                                    'http://52.79.222.161:8080/file/downloadFile/8seconds6-thumbnail.jpg'
                                }
                            />
                        </Flex>
                        <Separator />
                        <Box paddingTop={1}>
                            <Text as="h2" variant="large" marginTop={0}>
                                게시자
                            </Text>
                            product.owner.username
                        </Box>
                    </Box>
                    <Box padding={2} width={{ base: '700px', md: '100%' }}>
                        <Flex
                            justifyContent="space-between"
                            flexDirection="column"
                            height={{ base: '100%', md: 'auto' }}
                        >
                            {/* 상품 개요를 표시, 줄바꿈별로 텍스트 컴포넌트로 감싼다 */}
                            <Box>
                                product.description
                                {/* {product.description
                                .split('\n')
                                .map((text: string, i: number) => (
                                    <Text key={i} as="p">
                                        {text}
                                    </Text>
                                ))} */}
                            </Box>
                            {/*
                카트 추가 버튼 컨테이너
                버튼을 눌렀다면 ShoppingCartContext에 상품을 추가한다 */}

                            <Button
                                width={{ base: '400px', md: '100%' }}
                                height="66px"
                                onClick={handleAddToCartButtonClick}
                            >
                                카트에 추가
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default ProductPageContent;
