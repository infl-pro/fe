import ProductPageContent from 'components/templates/ProductPageContent';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import React from 'react';

const ProductPage: NextPage = async () => {
    const isLogined = await getIsLogined();

    return <ProductPageContent isLogined={isLogined} />;
};

async function getIsLogined() {
    const cookieStore = cookies();

    const token = cookieStore.get('token');
    console.log(token, 'token');
    return !!token?.value;
}

export default ProductPage;
