import Link from 'next/link';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import {
    SearchIcon,
    PersonIcon,
    ShoppingCartIcon,
} from 'components/atoms/IconButton';
import Spinner from 'components/atoms/Spinner';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import BadgeIconButton from 'components/molecules/BadgeIconButton';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/store';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

// 헤더 루트
const HeaderRoot = styled.header`
    height: 88px;
    padding: ${({ theme }) => theme.space[2]} 0px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// 내비게이션
const Nav = styled(Flex)`
    & > span:not(:first-child) {
        margin-left: ${({ theme }) => theme.space[2]};
    }
`;

// 내비게이션 링크
const NavLink = styled.span`
    display: inline;
`;

// 앵커
const Anchor = styled(Text)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

type HeaderProps = {
    isLogined: boolean;
};

/**
 * 헤더
 */
const Header = ({ isLogined }: HeaderProps) => {
    // const { isLogined, isLoading } = useSelector(
    //     (state: RootState) => state.auth,
    // );
    // 임시 state

    return (
        <HeaderRoot>
            <Flex
                paddingLeft={'32px'}
                paddingRight={'32px'}
                justifyContent="space-between"
            >
                <Nav as="nav" height="56px" alignItems="center">
                    <NavLink>
                        <Link href="/" passHref>
                            <Anchor as="a">LOGO</Anchor>
                        </Link>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search" passHref>
                                <Anchor as="a">모두</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/top" passHref>
                                <Anchor as="a">상의</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/bottom" passHref>
                                <Anchor as="a">하의</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/outer" passHref>
                                <Anchor as="a">아우터</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/accessory" passHref>
                                <Anchor as="a">액세서리</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                </Nav>
                <Nav as="nav" height="56px" alignItems="center">
                    {isLogined && (
                        <>
                            <NavLink>
                                <Link href="/cart" passHref>
                                    장바구니
                                </Link>
                            </NavLink>
                            <NavLink>
                                <Link href="/purchaseList" passHref>
                                    주문내역
                                </Link>
                            </NavLink>
                            <NavLink>
                                <Link href="/sell">상품 등록</Link>
                            </NavLink>
                        </>
                    )}
                    <NavLink>
                        {(() => {
                            // 인증된 상태라면 아이콘을 표시
                            if (isLogined) {
                                return <Button>로그아웃</Button>;
                            } else {
                                // 로그인 하지 않은 경우에는 아이콘을 표시
                                return (
                                    <Link href="/signin">
                                        <Button>로그인</Button>
                                    </Link>
                                );
                            }
                        })()}
                    </NavLink>
                </Nav>
            </Flex>
        </HeaderRoot>
    );
};

export default Header;

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { req } = context;
    const { token } = parseCookies({ req });

    return {
        props: {
            isLogined: !!token,
        },
    };
}
