'use client';
import Separator from 'components/atoms/Separator';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import ProductCard from 'components/organisms/ProductCard';
import Layout from 'components/templates/LayoutStyle';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from 'components/atoms/Button';
import ClientComponentContaier from 'components/ClientComponentContaier';
import { usePathname, useSearchParams } from 'next/navigation';
import getProduct from 'services/products/getProduct';
import { Product } from 'types';
import styled from 'styled-components';
import Axios from 'utils/Axios';
import ScaleImage from 'components/atoms/ScaleImage';

export const NumberInput = styled.input`
    width: 50px;
    height: 29px;
    font-size: 30px;
    margin-top: 8px;
`;

const extractProductFromUrl = (pathname: string) => {
    const parts = pathname.split('/products/');

    const category = parts[1];

    return category;
};

const ProductPageContent = ({ isLogined }: { isLogined: boolean }) => {
    const [itemData, setItemData] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    const pathname = usePathname();

    const getData = async id => {
        const data = await getProduct(id);
        setItemData(data);
        console.log(data);
    };

    useEffect(() => {
        console.log(pathname);
        const productId = extractProductFromUrl(pathname);
        getData(productId);
    }, [pathname]);

    const handleAddToCartButtonClick = async () => {
        try {
            const productId = Number(itemData.productId);

            const response = await Axios.post('/cart/add', {
                productId,
                quantity,
            });

            console.log(response);

            alert('카트에 추가되었습니다.');
        } catch (e) {
            console.log(e);
        }
    };

    console.log(itemData, 'itemData');
    return (
        <ClientComponentContaier>
            <Layout isLogined={isLogined}>
                {itemData && (
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
                                    title={itemData.productName}
                                    price={itemData.price}
                                    imageUrl={`https://shapp.shop${itemData.thumbnailUrl}`}
                                />
                            </Flex>
                            <Separator />
                            <Box paddingTop={1}>
                                <Text as="h2" variant="large" marginTop={0}>
                                    게시자
                                </Text>
                                {itemData.sellerName}
                            </Box>
                        </Box>
                        <Box padding={2} width={{ base: '700px', md: '100%' }}>
                            <Flex
                                justifyContent="space-between"
                                flexDirection="column"
                                height={{ base: '100%', md: 'auto' }}
                            >
                                {/* 상품 개요를 표시, 줄바꿈별로 텍스트 컴포넌트로 감싼다 */}
                                {/* <Content
                                    dangerouslySetInnerHTML={{
                                        __html: contents,
                                    }}
                                    className="ql-editor"
                                /> */}
                                <Box
                                    dangerouslySetInnerHTML={{
                                        __html: itemData.description,
                                    }}
                                >
                                    {/* {product.description
                                .split('\n')
                                .map((text: string, i: number) => (
                                    <Text key={i} as="p">
                                        {text}
                                    </Text>
                                ))} */}
                                </Box>
                                <Flex flexWrap={'wrap'}>
                                    {itemData.imgList.map((item, idx) => (
                                        <ScaleImage
                                            key={idx}
                                            src={`https://shapp.shop${item.url}`}
                                            width={250}
                                            height={250}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    ))}
                                </Flex>
                                <Flex gap={'10px'} marginLeft={'10px'}>
                                    <Box>
                                        <div style={{ textAlign: 'center' }}>
                                            수량
                                        </div>
                                        <NumberInput
                                            type="number"
                                            value={quantity}
                                            onChange={e =>
                                                setQuantity(
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
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
                            </Flex>
                        </Box>
                    </Flex>
                )}
            </Layout>
        </ClientComponentContaier>
    );
};

export default ProductPageContent;
