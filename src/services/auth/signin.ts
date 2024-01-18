import { AxiosResponse } from 'axios';
import Axios from '../../utils/Axios';

export type SigninParams = {
    /**
     * 사용자명
     * 사용자의 사용자명은 "user"
     */
    username: string;
    /**
     * 비밀번호
     * 사용자의 비밀번호는 "password"
     */
    password: string;
};

/**
 * 인증 API(로그인)
 * @param params 파라미터
 * @returns 로그인 사용자
 */
const signin = async (params: SigninParams): Promise<AxiosResponse> => {
    //response.data를 반환해야 할지 api 붙여보고 판단
    return await Axios.post('/login', params);
};

export default signin;
