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
import React from 'react';
import styled from 'styled-components';

const TextTitle = styled(Text)`
    width: 70px;
`;

const index = ({ data }) => {
    console.log(data);
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
                            <Input />
                        </Box>
                    </Flex>
                    <Flex alignItems={'center'} gap={'8px'}>
                        <TextTitle fontWeight={'bold'}>상세 주소</TextTitle>
                        <Box width={'580px'}>
                            <Input />
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
                                            src={`https://shapp.shop${item.thumbnailUrl}`}
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
            <Box marginTop={2} textAllign={'center'}>
                <Button width={'290px'}>결제하기</Button>
            </Box>
        </div>
    );
};

export default index;
