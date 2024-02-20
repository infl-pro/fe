import type { NextPage } from 'next';
import getProductList from 'services/products/getProductList';
import HomePageContent from 'components/templates/HomePageContent';
import { cookies } from 'next/headers';

const HomePage: NextPage = async () => {
    const data = await getProducts();

    const isLogined = await getIsLogined();

    return <HomePageContent data={data} isLogined={isLogined} />;
};

async function getProducts() {
    const data = await getProductList();

    return data;
}

async function getIsLogined() {
    const cookieStore = cookies();

    const token = cookieStore.get('token');
    console.log(token, 'token');
    return !!token?.value;
}

export default HomePage;
