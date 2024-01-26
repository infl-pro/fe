import { useForm } from 'react-hook-form';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';

export type SigninFormData = {
    username: string;
    password: string;
};

interface SigninFormProps {
    /**
     * 로그인 버튼을 클릭했을 때의 이벤트 핸들러
     */
    onSignin?: (username: string, password: string) => void;
}

/**
 * 로그인폼
 */
const SigninForm = ({ onSignin }: SigninFormProps) => {
    // React Hook Form 사용
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>();
    const onSubmit = (data: SigninFormData) => {
        const { username, password } = data;

        onSignin && onSignin(username, password);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom="8px">
                {/* 로그인 아이디 입력 */}
                <Input
                    {...register('username', { required: true })}
                    name="username"
                    type="text"
                    placeholder="아이디"
                    hasError={!!errors.username}
                />
                {errors.username && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        아이디는 필수입니다
                    </Text>
                )}
            </Box>
            <Box marginBottom="16px">
                {/* 비밀번호 입력 */}
                <Input
                    {...register('password', { required: true })}
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    hasError={!!errors.password}
                />
                {errors.password && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        비밀번호는 필수입니다
                    </Text>
                )}
            </Box>
            <Button width="100%" type="submit">
                로그인
            </Button>
        </form>
    );
};

export default SigninForm;
