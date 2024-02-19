'use client';
import ClientComponentContaier from 'components/ClientComponentContaier';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import OrdersheetContainer from 'containers/OrdersheetContainer';
import { NextPage } from 'next';
import React from 'react';

const OrdersheetTopContainer = () => {
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
                            <Text
                                display="block"
                                variant="large"
                                as="h1"
                                marginBottom={3}
                            >
                                주문/결제
                            </Text>
                            <OrdersheetContainer />
                        </Box>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default OrdersheetTopContainer;
