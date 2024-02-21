'use client';
import type { NextPage } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import LayoutStyle from 'components/templates/LayoutStyle';
import SigninFormContainer from 'containers/SigninFormContainer';
import { useCookies } from 'next-client-cookies';
import ClientComponentContaier from 'components/ClientComponentContaier';
import Button from 'components/atoms/Button';
import Link from 'next/link';

const SigninTopContainer: NextPage = () => {
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
            router.refresh();
        } else {
            console.log(err);
        }
    };

    console.log('asdfadfa');
    return (
        <ClientComponentContaier>
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
                        <Box marginBottom={2}>
                            {' '}
                            <img src="logo.png" alt="logo" height={44} />
                        </Box>
                        <Box width="100%">
                            {/*
                            로그인폼 컨테이너
                            SigninForm의 사용자명/비밀번호로부터 인증 API를 호출하고,
                            onSignin 콜백이 호출된다
                        */}
                            <SigninFormContainer onSignin={handleSignin} />
                        </Box>
                        <Box width="100%" marginTop={1}>
                            <Link href={'/signup'}>
                                <Button width="100%">회원가입</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Flex>
            </LayoutStyle>
        </ClientComponentContaier>
    );
};

export default SigninTopContainer;
