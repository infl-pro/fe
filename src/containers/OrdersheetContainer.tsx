import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Axios from 'utils/Axios';
import OrdersheetPageContent from 'components/templates/OrdersheetPageContent';

const OrdersheetContainer = () => {
    const searchParams = useSearchParams();

    const productIds = searchParams.get('productIds');

    const [data, setData] = useState([]);

    console.log(productIds);
    useEffect(() => {
        const cartIds = productIds.split(',').map(Number);
        console.log(cartIds);

        Axios.post('/orders/form', {
            cartId: cartIds,
        })
            .then(res => {
                console.log(res.data);
                setData(res.data.data);
            })
            .catch(e => alert('주문정보를 불러오는데 실패했습니다.'));
    }, [productIds]);

    if (data.length === 0) return;
    return <OrdersheetPageContent data={data} />;
};

export default OrdersheetContainer;
