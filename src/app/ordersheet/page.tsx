import OrdersheetTopContainer from 'containers/OrdersheetTopContainer';
import { NextPage } from 'next';
import React from 'react';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const OrdersheetPage: NextPage = () => {
    return <OrdersheetTopContainer />;
};

export default OrdersheetPage;
