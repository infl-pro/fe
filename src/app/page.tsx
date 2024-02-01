import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import ProductCard from 'components/organisms/ProductCard';
// import ProductCardCarousel from 'components/organisms/ProductCardCarousel';
// import Layout from 'components/templates/Layout';
// import getAllProducts from 'services/products/get-all-products';
// import { ApiContext, Product } from 'types';
import useSearch from 'services/products/useSearch';
import getProductList from 'services/products/getProductList';
import HomePageContent from 'components/templates/HomePageContent';

const HomePage: NextPage = async () => {
    const data = await getProducts();

    console.log('@@@@@@@@', data);

    // 컴포넌트에 데이터 넣어주기
    return <HomePageContent data={data} />;
};

async function getProducts() {
    const { data } = await getProductList({});
    // response.data.data 는 왜 undefined인지??
    // axios로 revalidate 설정하는 법 ?

    console.log('!!!!!!!!!!!!!!!!!!', data);
    return data;
}

export default HomePage;
