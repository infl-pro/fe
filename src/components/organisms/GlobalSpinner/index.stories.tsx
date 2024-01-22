import { StoryFn, Meta } from '@storybook/react';
import GlobalSpinner from './index';
import Button from 'components/atoms/Button';
import StoreProvider from 'app/StoreProvider';
import { useDispatch } from 'react-redux';
import { setGlobalSpinnerAction } from 'lib/features/globalSpinner/globalSpinnerSlice';

export default {
    title: 'organisms/GlobalSpinner',
} as Meta<typeof GlobalSpinner>;

export const WithContextProvider = () => {
    const ChildComponent = () => {
        const dispatch = useDispatch();

        const handleClick = () => {
            dispatch(setGlobalSpinnerAction(true));
            // 5초 후에 닫는다
            setTimeout(() => {
                dispatch(setGlobalSpinnerAction(false));
            }, 5000);
        };

        return (
            <>
                <GlobalSpinner />
                <Button onClick={handleClick}>스피너 표시</Button>
            </>
        );
    };

    return (
        <StoreProvider>
            <ChildComponent />
        </StoreProvider>
    );
};
