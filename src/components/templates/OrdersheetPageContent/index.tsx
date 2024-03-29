import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import ScaleImage from 'components/atoms/ScaleImage';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import React, { useState } from 'react';
import styled from 'styled-components';
import Axios from 'utils/Axios';
import * as PortOne from '@portone/browser-sdk/v2';
import { useRouter } from 'next/navigation';

const TextTitle = styled(Text)`
    width: 70px;
`;

const index = ({ data }) => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');

    const router = useRouter();

    const onClickPayment = async () => {
        const requestBody = {
            // Store ID 설정
            storeId: data.storeId,
            // 채널 키 설정
            channelKey: data.channelKey,
            paymentId: data.paymentId,
            orderName: data.orderName,
            totalAmount: data.totalAmount,
            currency: data.currency,
            payMethod: data.payMethod,
            redirectUrl: `https://shapp.shop/api${data.redirectUrl}`,
            customer: {
                customerId: data.customer.userId,
                address: {
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                },
            },
            products: data.products.map(item => ({
                id: item.id,
                name: item.name,
                amount: item.amount,
                quantity: item.quantity,
            })),
            customData: {
                cartList: data.customData.cartList,
            },
        };

        console.log(requestBody, 'requestBody');

        const response = await PortOne.requestPayment(requestBody);

        if (response.code != null) {
            // 오류 발생
            return alert(response.message);
        }

        const res = await Axios.post('/payment', response);
        if (res.data.success) {
            alert('주문이 완료되었습니다.');
            router.push('/purchaseList');
        } else {
            alert('주문 생성 실패');
        }
    };

    console.log(data, 'data');
    return (
        <div>
            <Box marginBottom={3}>
                <Text variant={'mediumLarge'}>주문 정보</Text>
                <Flex flexDirection={'column'} gap={'8px'}>
                    <Flex marginTop={2} alignItems={'center'} gap={'8px'}>
                        <TextTitle fontWeight={'bold'}>이름</TextTitle>
                        <Box marginLeft={1}>{data?.customer.name}</Box>
                    </Flex>
                    <Flex alignItems={'center'} gap={'8px'}>
                        <TextTitle fontWeight={'bold'}>이메일</TextTitle>
                        <Box marginLeft={1}>{data?.customer.email}</Box>
                    </Flex>
                    <Flex alignItems={'center'} gap={'8px'}>
                        <TextTitle fontWeight={'bold'}>주소</TextTitle>
                        <Box width={'580px'}>
                            <Input
                                onChange={e => setAddressLine1(e.target.value)}
                                value={addressLine1}
                            />
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} gap={'8px'}>
                        <TextTitle fontWeight={'bold'}>상세 주소</TextTitle>
                        <Box width={'580px'}>
                            <Input
                                onChange={e => setAddressLine2(e.target.value)}
                                value={addressLine2}
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <Box marginBottom={1}>
                <Text variant={'mediumLarge'}>주문 상품 정보</Text>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>상품 정보</TableCell>
                            <TableCell align="right">주문 수량</TableCell>
                            <TableCell align="right">주문 금액</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.products?.map(item => (
                            <TableRow
                                key={item.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Flex gap={'8px'} alignItems={'center'}>
                                        <ScaleImage
                                            src={`https://shapp.shop/api${item.thumbnailUrl}`}
                                            width={150}
                                            height={150}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <Flex
                                            flexDirection={'column'}
                                            gap={'8px'}
                                        >
                                            <Box>상품명: {item.name}</Box>
                                            <Box>
                                                판매자명: {item.sellerName}
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </TableCell>
                                <TableCell align="right">
                                    {item.quantity}
                                </TableCell>
                                <TableCell align="right">
                                    {item.amount}원
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAllign={'center'} margin={1}>
                <Text fontWeight={'bold'}>총금액: {data.totalAmount}원</Text>
            </Box>
            <Box marginTop={2} textAllign={'center'}>
                <Button width={'290px'} onClick={onClickPayment}>
                    결제하기
                </Button>
            </Box>
        </div>
    );
};

export default index;
