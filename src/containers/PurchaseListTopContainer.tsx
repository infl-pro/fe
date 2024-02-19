'use client';
import { Box } from '@mui/material';
import ClientComponentContaier from 'components/ClientComponentContaier';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import PurchaseListContainer from 'containers/PurchaseListContainer';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PurchaseListTopContainer = () => {
    // 인증 가드
    const { token } = parseCookies();

    const router = useRouter();

    if (!token) {
        router.push('/signin');
    }
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

                            <PurchaseListContainer />
                        </Box>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default PurchaseListTopContainer;
