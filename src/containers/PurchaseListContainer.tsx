import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import ScaleImage from 'components/atoms/ScaleImage';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';
import React, { useEffect, useState } from 'react';
import Axios from 'utils/Axios';
import OrderDetailContent from 'components/templates/OrderDetailContent';

const PurchaseListContainer = () => {
    const [list, setList] = useState([]);
    const [detailData, setDetailData] = useState();
    const [dataTrigger, setDataTrigger] = useState(false);

    useEffect(() => {
        Axios.get('/orders')
            .then(res => {
                console.log(res);
                setList(res.data.data);
            })
            .catch(e => console.log(e));
    }, [dataTrigger]);

    const onClickOrderItem = async id => {
        try {
            const response = await Axios.get(`/orders/${id}`);
            setDetailData(response.data.data);
        } catch (e) {
            alert('주문 상세 정보를 불러오는데 실패했습니다.');
        }
    };

    const reloadData = () => {
        setDataTrigger(!dataTrigger);
    };

    return (
        <Box marginTop={3}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>상품 정보</TableCell>
                            <TableCell>주문 일자</TableCell>
                            <TableCell>주문 번호</TableCell>
                            <TableCell>주문 금액 </TableCell>
                            <TableCell>주문 상태</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <Flex gap={'8px'} alignItems={'center'}>
                                        <ScaleImage
                                            src={`https://shapp.shop/api${item.productThumbnailUrl}`}
                                            width={150}
                                            height={150}
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <Flex
                                            flexDirection={'column'}
                                            gap={'8px'}
                                        >
                                            <Box
                                                onClick={() =>
                                                    onClickOrderItem(
                                                        item.ordersId,
                                                    )
                                                }
                                            >
                                                <Text
                                                    style={{
                                                        cursor: 'pointer',
                                                        textDecoration:
                                                            'underline',
                                                    }}
                                                >
                                                    {item.productName}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Flex>
                                </TableCell>
                                <TableCell>{item.createAt}</TableCell>
                                <TableCell>{item.ordersId}</TableCell>
                                <TableCell>{item.amount}원</TableCell>
                                <TableCell>{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {detailData && (
                <OrderDetailContent
                    detailData={detailData}
                    reloadData={reloadData}
                />
            )}
        </Box>
    );
};

export default PurchaseListContainer;
