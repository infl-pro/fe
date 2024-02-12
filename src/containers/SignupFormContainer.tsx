import SignupForm from 'components/organisms/SignupForm';
import { setGlobalSpinnerAction } from 'lib/features/globalSpinner/globalSpinnerSlice';
import { setCookie } from 'nookies';
import { useDispatch } from 'react-redux';
import signup from 'services/auth/signup';

interface SignupFormContainerProps {
    /**
     * 로그인 했을 때 호출되는 이벤트 핸들러
     */
    onSignup: (error?: Error) => void;
}

/**
 * 로그인폼 컨테이너
 */
const SignupFormContainer = ({ onSignup }: SignupFormContainerProps) => {
    const dispatch = useDispatch();

    // 로그인 버튼을 눌렀을 때의 이벤트 핸들러
    const handleSignup = async (
        username: string,
        name: string,
        password: string,
        confirmPassword: string,
        email: string,
    ) => {
        try {
            dispatch(setGlobalSpinnerAction(true));
            const returnedData = await signup({
                username,
                name,
                password,
                confirmPassword,
                email,
            });
            // returnedData로 할게 있나
            onSignup && onSignup();
        } catch (err: unknown) {
            if (err instanceof Error) {
                // 에러 내용을 표시한다
                window.alert(err.message);
                onSignup && onSignup(err);
            }
        } finally {
            dispatch(setGlobalSpinnerAction(false));
        }
    };

    return <SignupForm onSignup={handleSignup} />;
};

export default SignupFormContainer;
