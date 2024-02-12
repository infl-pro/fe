import Axios from '../../utils/Axios';

export type SignupParams = {
    /**
     * 사용자명
     * 사용자의 사용자명은 "user"
     */
    username: string;
    name: string;
    /**
     * 비밀번호
     * 사용자의 비밀번호는 "password"
     */
    password: string;
    confirmPassword: string;
    email: string;
};

type SignupReturnedData = {
    userId: number;
    username: string;
    name: string;
    email: string;
};

/**
 * 회원가입 API
 * @param params 파라미터
 * @returns 사용자 정보
 */
const signup = async (params: SignupParams): Promise<SignupReturnedData> => {
    const response = await Axios.post('/account/signup', params);
    console.log(response);
    return response.data;
};

export default signup;
