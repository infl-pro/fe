import Separator from 'components/atoms/Separator';
import Box from 'components/layout/Box';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';

interface LayoutProps {
    children: React.ReactNode;
    isLogined: boolean;
}

const Layout = ({ children, isLogined }: LayoutProps) => {
    return (
        <>
            <Header isLogined={isLogined} />
            <main>{children}</main>
            <Separator />
            <Box>
                <Footer />
            </Box>
        </>
    );
};

export default Layout;
