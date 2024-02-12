import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import getProductList from 'services/products/getProductList';
import HomePageContent from 'components/templates/HomePageContent';

const HomePage: NextPage = async () => {
    const data = await getProducts();

    // 컴포넌트에 데이터 넣어주기
    return <HomePageContent data={data} />;
};

async function getProducts() {
    const data = await getProductList();
    // response.data.data 는 왜 undefined인지??
    // axios로 revalidate 설정하는 법 ?

    return data;
}

export default HomePage;
