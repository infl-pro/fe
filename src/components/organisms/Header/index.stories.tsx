import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import Header from './index';
import StoreProvider from 'app/StoreProvider';

export default { title: 'organisms/Header' } as Meta<typeof Header>;

export const NoLogin = () => <Header isLogined={false} />;

export const Login = () => {
    const authUser = {
        id: 1,
        username: 'dummy',
        displayName: 'Hana Kim',
        email: 'hana.kim@example.com',
        profileImageUrl: '/images/sample/1.jpg',
        description: '',
    };

    const ChildComponent = () => {
        // 장바구니 추가 코드??

        return <Header isLogined={true} />;
    };

    return <ChildComponent />;
};
