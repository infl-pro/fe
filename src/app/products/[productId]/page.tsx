import ProductPageContent from 'components/templates/ProductPageContent';
import React from 'react';
import getProduct from 'services/products/getProduct';

const ProductPage = () => {
    return <ProductPageContent />;
};

export default ProductPage;

// 여기부터
async function getProduct() {
    const { data } = await getProduct(1);
    // response.data.data 는 왜 undefined인지??
    // axios로 revalidate 설정하는 법 ?

    return data;
}
