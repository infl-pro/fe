import type { NextPage } from 'next';
import SellContainer from 'containers/SellContainer';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const SellPage: NextPage = () => {
    return <SellContainer />;
};

export default SellPage;
