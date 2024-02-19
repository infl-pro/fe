import Image from 'next/image';
import Link from 'next/link';
import styled, { CSSProperties } from 'styled-components';
import Button from 'components/atoms/Button';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { NumberInput } from 'components/templates/ProductPageContent';
import { useDispatch } from 'react-redux';
import { changeQuantity } from 'lib/features/cart/cartSlice';
import Axios from 'utils/Axios';
import { Checkbox } from '@mui/material';

const style: CSSProperties = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '29px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '29px',
    alignItems: 'center',
    fontWeight: 'bold',
};

// 삭제 버튼의 텍스트
const RemoveText = styled(Text)`
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

interface CartProductProps {
    /**
     * 상품 ID
     */
    id: number;
    /**
     * 상품 이미지 URL
     */
    imageUrl: string;
    /**
     * 상품명
     */
    title: string;
    /**
     * 상품 가격
     */
    price: number;
    /**
     * 상품 수량
     */
    quantity: number;
    /**
     * 구입 버튼을 클릭했을 때의 이벤트 핸들러
     */
    onBuyButtonClick?: (id: number) => void;
    /**
     * 삭제 버튼을 클릭했을 때의 이벤트 핸들러
     */
    onRemoveButtonClick?: (id: number) => void;
    selected?: boolean;
    onChangeCheckBox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 카트 상품
 */
const CartProduct = ({
    id,
    imageUrl,
    title,
    price,
    quantity,
    onBuyButtonClick,
    onRemoveButtonClick,
    selected,
    onChangeCheckBox,
}: CartProductProps) => {
    const [modal, setModal] = useState(false);
    const [quantityInModal, setQuantityInModal] = useState(quantity);

    const dispatch = useDispatch();

    const onClickChangeQuantityButton = async () => {
        try {
            const response = await Axios.patch('/cart/updateQuantity', {
                cartId: id,
                quantity: quantityInModal,
            });
            console.log(response);
            setModal(false);
            dispatch(changeQuantity({ id, quantity: quantityInModal }));
        } catch (e) {
            alert('수량 변경에 실패했습니다.');
        }
    };

    console.log(imageUrl, process.env.NEXT_PUBLIC_BASE_URL + imageUrl);
    return (
        <>
            <Flex justifyContent="space-between" width="586px">
                <Flex>
                    <Checkbox checked={selected} onChange={onChangeCheckBox} />
                    <Box width="120px" height="120px">
                        <Link href={`/products/${id}`}>
                            <Image
                                quality="85"
                                src={`https://shapp.shop/api${imageUrl}`}
                                alt={title}
                                height={120}
                                width={120}
                                objectFit="cover"
                            />
                        </Link>
                    </Box>
                    <Box padding={'8px'}>
                        <Flex
                            height="100%"
                            flexDirection="column"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Text
                                    fontWeight="bold"
                                    variant="mediumLarge"
                                    marginBottom={'8px'}
                                    as="p"
                                >
                                    {title}
                                </Text>
                                <Flex justifyContent={'space-between'}>
                                    <Text as="p">
                                        <b>{price}</b>원
                                    </Text>
                                    <Flex gap="8px" alignItems={'center'}>
                                        <Text as="p">
                                            <b>{quantity}</b>개
                                        </Text>
                                        <Button
                                            height={'29px'}
                                            fontSize={'small'}
                                            paddingTop={'4px'}
                                            onClick={() => setModal(true)}
                                        >
                                            수량 수정
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Box>
                            <Flex marginTop={{ base: 0, md: 2 }}>
                                {/* 구입 버튼 */}
                                <Button
                                    width={{ base: '200px', md: '100px' }}
                                    onClick={() =>
                                        onBuyButtonClick && onBuyButtonClick(id)
                                    }
                                >
                                    개별 주문
                                </Button>
                                {/* 삭제 버튼(데스크톱) */}
                                <Button
                                    marginLeft={1}
                                    width={{ base: '200px', md: '100px' }}
                                    display={{ base: 'block', md: 'none' }}
                                    variant="danger"
                                    onClick={() => {
                                        onRemoveButtonClick &&
                                            onRemoveButtonClick(id);
                                        console.log(id);
                                    }}
                                >
                                    삭제
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>

                <Box display={{ base: 'none', md: 'block' }}>
                    {/* 삭제 버튼(모바일) */}
                    <RemoveText
                        color="danger"
                        onClick={() =>
                            onRemoveButtonClick && onRemoveButtonClick(id)
                        }
                    >
                        카트에서 삭제
                    </RemoveText>
                </Box>
            </Flex>
            {modal && (
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div style={style}>
                        <Box>
                            <Text variant="large">수량 수정</Text>
                        </Box>

                        <NumberInput
                            type="number"
                            defaultValue={quantity}
                            onChange={e =>
                                setQuantityInModal(Number(e.target.value))
                            }
                        />
                        <Button
                            width={'100px'}
                            onClick={onClickChangeQuantityButton}
                        >
                            변경
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default CartProduct;
