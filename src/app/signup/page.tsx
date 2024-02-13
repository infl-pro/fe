'use client';
import ClientComponentContaier from 'components/ClientComponentContaier';
import React from 'react';
import LayoutStyle from 'components/templates/LayoutStyle';
import Flex from 'components/layout/Flex';
import { Box } from '@mui/material';
import SignupForm from 'components/organisms/SignupForm';
import SignupFormContainer from 'containers/SignupFormContainer';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
    const router = useRouter();

    const handleSignup = async (err?: Error) => {
        console.log(err);
        if (!err) {
            alert('회원가입에 성공하였습니다. 로그인해주세요');
            router.push('/signin');
        }
    };

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
                        <Box marginBottom={2} fontSize={'large'}>
                            회원가입
                        </Box>
                        <Box width="100%">
                            <SignupFormContainer onSignup={handleSignup} />
                        </Box>
                    </Flex>
                </Flex>
            </LayoutStyle>
        </ClientComponentContaier>
    );
};

export default SignupPage;
