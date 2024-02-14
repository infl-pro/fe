import Link from 'next/link';
import styled from 'styled-components';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import { GetServerSidePropsContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { Category } from 'types';
import { useRouter } from 'next/navigation';

// 헤더 루트
const HeaderRoot = styled.header`
    height: 88px;
    padding: 16px 0px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

// 내비게이션
const Nav = styled(Flex)`
    & > span:not(:first-child) {
        margin-left: 16px;
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

const categoryNameDict: Record<Category, string> = {
    TOP: '상의',
    BOTTOM: '하의',
    OUTER: '아우터',
    ACCESSORY: '액세서리',
};

/**
 * 헤더
 */
const Header = ({ isLogined }: HeaderProps) => {
    const router = useRouter();
    // const { isLogined, isLoading } = useSelector(
    //     (state: RootState) => state.auth,
    // );
    // 임시 state

    const onClickLogout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            destroyCookie(null, 'token', { path: '/' });
            alert('로그아웃 되었습니다.');
            router.push('/');
            router.refresh();
        }
    };

    return (
        <HeaderRoot>
            <Flex
                paddingLeft={'32px'}
                paddingRight={'32px'}
                justifyContent="space-between"
            >
                <Nav as="nav" height="56px" alignItems="center">
                    <NavLink>
                        <Link href="/">
                            <Anchor as="a">LOGO</Anchor>
                        </Link>
                    </NavLink>
                    <NavLink>
                        <Box display={{ base: 'block', md: 'none' }}>
                            <Link href="/">
                                <Anchor as="a">모두</Anchor>
                            </Link>
                        </Box>
                    </NavLink>
                    {/* 카테고리 링크 */}
                    {Object.keys(categoryNameDict).map(
                        (category: string, i: number) => (
                            <NavLink key={i}>
                                <Box display={{ base: 'block', md: 'none' }}>
                                    <Link
                                        href={`/category/${category.toLowerCase()}`}
                                    >
                                        <Anchor as="a">
                                            {
                                                categoryNameDict[
                                                    category as Category
                                                ]
                                            }
                                        </Anchor>
                                    </Link>
                                </Box>
                            </NavLink>
                        ),
                    )}
                </Nav>
                <Nav as="nav" height="56px" alignItems="center">
                    {isLogined && (
                        <>
                            <NavLink>
                                <Link href="/cart">장바구니</Link>
                            </NavLink>
                            <NavLink>
                                <Link href="/purchaseList">주문내역</Link>
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
                                return (
                                    <Button onClick={onClickLogout}>
                                        로그아웃
                                    </Button>
                                );
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
