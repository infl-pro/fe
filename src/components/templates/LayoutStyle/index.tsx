import Separator from 'components/atoms/Separator';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import styled from 'styled-components';

interface LayoutProps {
    children: React.ReactNode;
    isLogined: boolean;
}

const AllContainer = styled(Flex)`
    min-height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

const Layout = ({ children, isLogined }: LayoutProps) => {
    return (
        <AllContainer>
            <Box>
                <Header isLogined={isLogined} />
                <main>{children}</main>
            </Box>
            <Box>
                <Separator />
                <Footer />
            </Box>
        </AllContainer>
    );
};

export default Layout;
