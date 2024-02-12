'use client';
import { Box } from '@mui/material';
import ClientComponentContaier from 'components/ClientComponentContaier';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import React from 'react';

const PurchaseListPage = () => {
    // 인증 가드 필요
    return (
        <ClientComponentContaier>
            <Layout isLogined>
                <Flex
                    paddingTop={2}
                    paddingBottom={2}
                    paddingLeft={{ base: 2, md: 0 }}
                    paddingRight={{ base: 2, md: 0 }}
                    justifyContent="center"
                >
                    <Box width="1240px">
                        <Box>
                            <Text display="block" variant="large" as="h1">
                                주문내역
                            </Text>
                            {/*
              카트 컨테이너
              카트 안에 있는 상품을 표시, 구입, 삭제
            */}
                            dddd
                        </Box>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default PurchaseListPage;
