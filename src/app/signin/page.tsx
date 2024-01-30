'use client';
import type { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import LayoutStyle from 'components/templates/LayoutStyle';
import SigninFormContainer from 'containers/SigninFormContainer';
import { useCookies } from 'next-client-cookies';

const SigninPage: NextPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 인증 후의 이벤트 핸들러
    const handleSignin = async (err?: Error) => {
        if (!err) {
            // 로그인에 성공하고, 쿼리가 지정되어 있을 때는 해당 URL로 이동한다.
            // 기본은 톱 페이지로 이동한다.
            const redirectUrl = searchParams.get('redirect_to');
            const redirectTo = redirectUrl ?? '/';

            console.log('Redirecting', redirectTo);
            router.push(redirectTo);
        }
    };

    console.log('asdfadfa');
    return (
        <LayoutStyle isLogined={false}>
            <Flex
                paddingTop={4}
                paddingBottom={3}
                paddingLeft={{ md: 2 }}
                paddingRight={{ md: 2 }}
                justifyContent="center"
            >
                <Flex
                    width="400px"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box marginBottom={2}>LOGO</Box>
                    <Box width="100%">
                        {/*
                            로그인폼 컨테이너
                            SigninForm의 사용자명/비밀번호로부터 인증 API를 호출하고,
                            onSignin 콜백이 호출된다
                        */}
                        <SigninFormContainer onSignin={handleSignin} />
                    </Box>
                </Flex>
            </Flex>
        </LayoutStyle>
    );
};

export default SigninPage;
