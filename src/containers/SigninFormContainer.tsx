import SigninForm from 'components/organisms/SignInForm';
import { setGlobalSpinnerAction } from 'lib/features/globalSpinner/globalSpinnerSlice';
import { setCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import signin from 'services/auth/signin';

interface SigninFormContainerProps {
    /**
     * 로그인 했을 때 호출되는 이벤트 핸들러
     */
    onSignin: (error?: Error) => void;
}

/**
 * 로그인폼 컨테이너
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
    const dispatch = useDispatch();

    // 로그인 버튼을 눌렀을 때의 이벤트 핸들러
    const handleSignin = async (username: string, password: string) => {
        try {
            dispatch(setGlobalSpinnerAction(true));
            const { accessToken } = await signin({ username, password });

            setCookie(null, 'token', accessToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/', // 쿠키 경로
                secure: true,
                sameSite: 'none',
            });

            onSignin && onSignin();
        } catch (err: unknown) {
            window.alert('로그인에 실패하였습니다.');
            if (err instanceof Error) {
                // 에러 내용을 표시한다
                window.alert('로그인에 실패하였습니다.');
                onSignin && onSignin(err);
            }
        } finally {
            dispatch(setGlobalSpinnerAction(false));
        }
    };

    return <SigninForm onSignin={handleSignin} />;
};

export default SigninFormContainer;
