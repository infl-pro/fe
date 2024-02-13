import { useForm } from 'react-hook-form';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import { SignupParams } from 'services/auth/signup';
import Flex from 'components/layout/Flex';
import Axios from 'utils/Axios';
import { useState } from 'react';

interface SignupFormProps {
    /**
     * 회원가입 버튼을 클릭했을 때의 이벤트 핸들러
     */
    onSignup?: (
        username: string,
        name: string,
        password: string,
        confirmPassword: string,
        email: string,
    ) => void;
}

/**
 * 회원가입폼
 */
const SignupForm = ({ onSignup }: SignupFormProps) => {
    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMailSent, setIsMailSent] = useState(false);

    // React Hook Form 사용
    const {
        register,
        handleSubmit,
        watch,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<SignupParams & { authNumber: string }>();
    const onSubmit = (data: SignupParams) => {
        const { username, name, password, confirmPassword, email } = data;
        console.log('onsubmit');
        onSignup && onSignup(username, name, password, confirmPassword, email);
    };

    const onClickIdCheck = async () => {
        try {
            const username = watch('username');
            const response = await Axios.post('/account/validateUsername', {
                username,
            });
            alert('사용할 수 있는 아이디입니다.');
            clearErrors('username');
            setIsIdCheck(true);
        } catch (e) {
            alert(e.response.data.message.username);
            setError('username', {
                type: 'length',
                message: '사용할 수 있는 아이디를 입력해주세요',
            });
        }
    };

    const onClickEmailCheck = async () => {
        try {
            const email = watch('email');
            const username = watch('username');
            console.log(email, 'email', username);
            if (!email) {
                return;
            }
            const response = await Axios.post('/account/verifyEmail', {
                email,
            });
            alert('인증번호가 전송되었습니다.');
            setIsMailSent(true);
        } catch (e) {
            console.log('이메일체크', e);
            alert(e.response.data.message);
        }
    };

    // 로직 통일하는 법 찾아보기
    const idRegister = register('username', {
        required: '아이디는 필수입니다',
        minLength: {
            value: 8,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
        maxLength: {
            value: 16,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
    });

    const passwordRegister = register('password', {
        required: '비밀번호는 필수입니다',
        minLength: {
            value: 8,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
        maxLength: {
            value: 16,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
    });

    const confirmPasswordRegister = register('confirmPassword', {
        required: '비밀번호 확인은 필수입니다',
        minLength: {
            value: 8,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
        maxLength: {
            value: 16,
            message: '8글자 이상 16글자 이하로 입력해주세요',
        },
    });

    const emailRegister = register('email', {
        required: true,
    });

    const onClickJoin = () => {
        console.log('onClickJoin');
        // if (!isAuthenticated) {
        //     return;
        // }
        if (!isIdCheck) {
            setError('username', {
                type: 'length',
                message: '사용할 수 있는 아이디를 입력해주세요',
            });
            alert('중복검사를 실행해주세요');
        }
        handleSubmit(onSubmit)();
    };

    const onClickAuth = async () => {
        try {
            const email = watch('email');
            const authNumber = watch('authNumber');
            const response = await Axios.post('/account/verifyEmailToken', {
                email,
                token: authNumber,
            });
            console.log(response, 'emailauth');
            alert('인증되었습니다.');
        } catch (e) {
            console.log(e);
            alert('인증번호가 일치하지 않습니다.');
        }
    };

    return (
        <>
            <Box marginBottom="16px">
                <Flex gap="4px">
                    {/* 회원가입 아이디 입력 */}
                    <Input
                        {...idRegister}
                        name="username"
                        type="text"
                        placeholder="아이디"
                        hasError={!!errors.username}
                    />

                    <Button
                        variant="primary"
                        fontSize={'14px'}
                        minWidth={'100px'}
                        onClick={onClickIdCheck}
                    >
                        중복 검사
                    </Button>
                </Flex>
                {errors.username && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        아이디는 필수입니다
                    </Text>
                )}
            </Box>
            <Box marginBottom="16px">
                {/* 이름 입력 */}
                <Input
                    {...register('name', { required: true })}
                    name="name"
                    type="text"
                    placeholder="이름"
                    hasError={!!errors.name}
                />
                {errors.name && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        이름은 필수입니다
                    </Text>
                )}
            </Box>
            <Box marginBottom="16px">
                {/* 비밀번호 입력 */}
                <Input
                    {...passwordRegister}
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
            <Box marginBottom="16px">
                {/* 비밀번호 확인 입력 */}
                <Input
                    {...confirmPasswordRegister}
                    name="confirmPassword"
                    type="password"
                    placeholder="비밀번호 확인"
                    hasError={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        비밀번호 확인은 필수입니다
                    </Text>
                )}
            </Box>
            <Box marginBottom="16px">
                <Flex gap="4px">
                    {/* 이메일 입력 */}
                    <Input
                        {...emailRegister}
                        name="email"
                        type="text"
                        placeholder="이메일"
                        hasError={!!errors.email}
                        disabled={isMailSent}
                    />

                    <Button
                        variant="primary"
                        fontSize={'14px'}
                        minWidth={'100px'}
                        paddingLeft={'4px'}
                        paddingRight={'4px'}
                        onClick={onClickEmailCheck}
                        disabled={isMailSent}
                    >
                        이메일 인증
                    </Button>
                </Flex>
                {errors.email && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        이메일은 필수입니다
                    </Text>
                )}
            </Box>
            <Box marginBottom="16px">
                <Flex gap="4px">
                    {/* 인증번호 입력 */}
                    <Input
                        {...register('authNumber', { required: true })}
                        name="authNumber"
                        type="string"
                        placeholder="인증번호"
                        hasError={!!errors.authNumber}
                    />

                    <Button
                        variant="primary"
                        fontSize={'14px'}
                        minWidth={'100px'}
                        paddingLeft={'4px'}
                        paddingRight={'4px'}
                        onClick={onClickAuth}
                    >
                        인증
                    </Button>
                </Flex>
                {errors.authNumber && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        인증번호 입력이 필요합니다
                    </Text>
                )}
            </Box>
            <Button width="100%" onClick={onClickJoin} type="submit">
                회원가입
            </Button>
        </>
    );
};

export default SignupForm;
