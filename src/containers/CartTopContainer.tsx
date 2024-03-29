'use client';
import type { NextPage } from 'next';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import CartContainer from 'containers/CartContainer';
import ClientComponentContaier from 'components/ClientComponentContaier';
import { parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

const CartTopContainer = () => {
    // 인증 가드
    const { token } = parseCookies();

    const router = useRouter();

    if (!token) {
        router.push('/signin');
    }

    return (
        <ClientComponentContaier>
            <Layout isLogined={!!token}>
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
                                장바구니
                            </Text>
                            {/*
              카트 컨테이너
              카트 안에 있는 상품을 표시, 구입, 삭제
            */}
                            <CartContainer />
                        </Box>
                    </Box>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default CartTopContainer;
