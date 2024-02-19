'use client';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Layout from 'components/templates/LayoutStyle';
import ProductFormContainer from 'containers/ProductFormContainer';
import ClientComponentContaier from 'components/ClientComponentContaier';
import { parseCookies } from 'nookies';

const SellContainer = () => {
    const { token } = parseCookies();

    const router = useRouter();

    if (!token) {
        router.push('/signin');
    }

    const handleSave = (err?: Error) => {
        alert('상품이 등록되었습니다.');
        router.push('/');
        // if (authUser && !err) {
        //     // 성공하면 사용자 페이지로 이동한다
        //     router.push(`/users/${authUser.id}`);
        // }
    };

    return (
        <ClientComponentContaier>
            <Layout isLogined>
                <Flex
                    paddingTop={{
                        base: 4,
                        md: 2,
                    }}
                    paddingBottom={{
                        base: 4,
                        md: 2,
                    }}
                    paddingLeft={{ base: 0, md: 2 }}
                    paddingRight={{ base: 0, md: 2 }}
                    justifyContent="center"
                >
                    <Flex
                        width="800px"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box
                            display={{ base: 'block', md: 'none' }}
                            marginBottom={2}
                        >
                            LOGO
                        </Box>
                        <Box width="100%">
                            {/*
              상품 게시폼 컨테이너
              상품 정보를 입력하고 제품 API를 통해 상품을 저장
            */}
                            <ProductFormContainer onSave={handleSave} />
                        </Box>
                    </Flex>
                </Flex>
            </Layout>
        </ClientComponentContaier>
    );
};

export default SellContainer;
