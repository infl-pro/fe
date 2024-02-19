import type { NextPage } from 'next';
import SigninTopContainer from 'containers/SigninTopContainer';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const SigninPage: NextPage = () => {
    return <SigninTopContainer />;
};

export default SigninPage;
