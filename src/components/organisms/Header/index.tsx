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
import { useShoppingCartContext } from 'contexts/ShoppingCartContext';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from 'lib/store';

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

/**
 * 헤더
 */
const Header = () => {
    const { cart } = useShoppingCartContext();

    const { isLogined, isLoading } = useSelector(
        (state: RootState) => state.auth,
    );

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
                            <Link href="/search/clothes" passHref>
                                <Anchor as="a">의류</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/book" passHref>
                                <Anchor as="a">책</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Link href="/search/shoes" passHref>
                                <Anchor as="a">신발</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                </Nav>
                <Nav as="nav" height="56px" alignItems="center">
                    <NavLink>
                        <Box display={{ base: 'block', md: 'none' }}>
                            <Link href="/search" passHref>
                                <Anchor as="a">
                                    <SearchIcon />
                                </Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    <NavLink>
                        <Link href="/cart" passHref>
                            <Anchor as="a">
                                <BadgeIconButton
                                    icon={<ShoppingCartIcon size={24} />}
                                    size="24px"
                                    badgeContent={
                                        cart.length === 0
                                            ? undefined
                                            : cart.length
                                    }
                                    badgeBackgroundColor="#ed9f28"
                                />
                            </Anchor>
                        </Link>
                    </NavLink>
                    <NavLink>
                        {(() => {
                            // 인증된 상태라면 아이콘을 표시
                            if (isLogined) {
                                return <Button>로그아웃</Button>;
                            } else if (isLoading) {
                                // 로드 중에는 스피너를 표시
                                return <Spinner size={20} strokeWidth={2} />;
                            } else {
                                // 로그인 하지 않은 경우에는 아이콘을 표시
                                return (
                                    <Link href="/signin">
                                        <Button>로그인</Button>;
                                    </Link>
                                );
                            }
                        })()}
                    </NavLink>
                    <NavLink>
                        <Link href="/sell">
                            <Button as="a">등록</Button>
                        </Link>
                    </NavLink>
                </Nav>
            </Flex>
        </HeaderRoot>
    );
};

export default Header;
