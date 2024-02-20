import PurchaseListTopContainer from 'containers/PurchaseListTopContainer';
import { NextPage } from 'next';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const PurchaseListPage: NextPage = () => {
    console.log('PurchaseListPage');
    return <PurchaseListTopContainer />;
};

export default PurchaseListPage;
