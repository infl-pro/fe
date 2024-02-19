import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
import Axios from 'utils/Axios';

const TextLabel = styled(Text)`
    font-weight: bold;
    margin-right: 4px;
`;

const index = ({ detailData, reloadData }) => {
    const router = useRouter();

    const onClickCancel = async ordersId => {
        try {
            const response = await Axios.post(`/orders/${ordersId}/cancel`);
            console.log(response);
            alert('주문이 취소되었습니다.');
            reloadData();
        } catch (e) {
            alert('주문 취소에 실패했습니다.');
        }
    };

    console.log(detailData, 'detailData');
    return (
        <Box border={'1px solid gray'} marginTop={4} padding={1}>
            <Box>
                <Box>주문자 정보</Box>
                <Flex>
                    <TextLabel>이름</TextLabel>
                    <Text>{detailData.name}</Text>
                </Flex>
                <Flex>
                    <TextLabel>이메일</TextLabel>
                    <Text>{detailData.email}</Text>
                </Flex>
                <Flex>
                    <TextLabel>주소</TextLabel>
                    <Text>{detailData.address}</Text>
                </Flex>
            </Box>
            <Box marginTop={2} marginBottom={2}>
                <Box>최종 결제 정보</Box>
                <Flex>
                    <TextLabel>결제 금액</TextLabel>
                    <Text>{detailData.payment.totalAmount}원</Text>
                </Flex>
                <Flex>
                    <TextLabel>결제 상태</TextLabel>
                    <Text>{detailData.payment.status}</Text>
                </Flex>
            </Box>
            {detailData.payment.status === 'PAID' && (
                <Button onClick={() => onClickCancel(detailData.ordersId)}>
                    결제 취소
                </Button>
            )}
        </Box>
    );
};

export default index;
