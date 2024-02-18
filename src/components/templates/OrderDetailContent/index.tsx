import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import React from 'react';
import styled from 'styled-components';

const TextLabel = styled(Text)`
    font-weight: bold;
    margin-right: 4px;
`;

const index = ({ detailData }) => {
    console.log(detailData, 'detailData');
    return (
        <Box border={'1px solid gray'} marginTop={4} padding={1}>
            <Box>
                <Box>주문자 정보</Box>
                <Flex>
                    <TextLabel>이름</TextLabel>
                    <Text>?</Text>
                </Flex>
                <Flex>
                    <TextLabel>이메일</TextLabel>
                    <Text>?</Text>
                </Flex>
                <Flex>
                    <TextLabel>주소</TextLabel>
                    <Text>?</Text>
                </Flex>
                <Flex>
                    <TextLabel>상세 주소</TextLabel>
                    <Text>?</Text>
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
            <Button>결제 취소</Button>
        </Box>
    );
};

export default index;
