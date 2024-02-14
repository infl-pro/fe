import { Controller, useForm } from 'react-hook-form';
import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';
import Text from 'components/atoms/Text';
import Box from 'components/layout/Box';
import Dropdown from 'components/molecules/Dropdown';
import type { Category } from 'types';
import ImageInput from 'components/molecules/ImageInput';
import TextEditor from 'components/atoms/TextEditor';
import DropzoneWithImages from 'components/molecules/DropzoneWithImages';
import { useState } from 'react';

export type FileData = {
    id?: string;
    src?: string;
    file?: File;
    selected?: boolean;
    chosen?: boolean;
};

export type ProductFormData = {
    thumbnail: Blob;
    name: string;
    description: string;
    category: Category;
    price: string;
    stockQuantity: string;
};

interface ProductFormProps {
    /**
     * 게시 버튼을 클릭했을 때의 이벤트 핸들러
     */
    onProductSave?: (data: ProductFormData, images?: File[]) => void;
}

/**
 * 상품 게시폼
 */
const ProductForm = ({ onProductSave }: ProductFormProps) => {
    const [images, setImages] = useState<File[]>();

    // React Hook Form 사용
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProductFormData>();

    const onSubmit = (data: ProductFormData) => {
        console.log(data, 'ProductFormData');
        onProductSave && onProductSave(data, images);
    };

    const handleChangeImages = (newImages: File[]) => {
        // setImages([...images, ...newImages]);
        setImages([...newImages]);
    };

    console.log(images);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box marginBottom={'32px'}>
                <Box marginBottom={'16px'}>
                    <Text as="label" variant="mediumLarge" fontWeight="bold">
                        대표 이미지
                    </Text>
                </Box>
                {/* 상품 이미지 입력 */}
                <Controller
                    control={control}
                    name="thumbnail"
                    rules={{ required: true }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => <ImageInput src={value} onChange={onChange} />}
                />
                {errors.thumbnail && (
                    <Text color="danger" variant="small" paddingLeft="8px">
                        대표 이미지는 필수입니다
                    </Text>
                )}
            </Box>

            <Box marginBottom="32px">
                <Box marginBottom="16px">
                    <Text as="label" variant="mediumLarge" fontWeight="bold">
                        상품 정보
                    </Text>
                </Box>
                <Box marginBottom="8px">
                    <Text as="label" variant="medium">
                        이름
                    </Text>
                    {/* 상품 이름 입력 */}
                    <Input
                        {...register('name', { required: true })}
                        name="name"
                        type="text"
                        placeholder="상품 이름"
                        hasError={!!errors.name}
                    />
                    {errors.name && (
                        <Text color="danger" variant="small" paddingLeft="8px">
                            이름 입력은 필수입니다
                        </Text>
                    )}
                </Box>
                <Box marginBottom="8px">
                    <Text as="label" variant="medium">
                        상세 이미지
                    </Text>
                    {/* 상세 이미지 입력 */}
                    <DropzoneWithImages
                        images={images}
                        onChange={handleChangeImages}
                        maximumNumber={5}
                    />
                </Box>
                <Box marginBottom="8px">
                    <Text as="label" variant="medium">
                        설명
                    </Text>
                    {/* 상품 설명 입력 */}
                    <Controller
                        control={control}
                        name="description"
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <TextEditor
                                content={value}
                                onChange={onChange}
                                hasError={!!error}
                            />
                        )}
                    />
                    {errors.description && (
                        <Text color="danger" variant="small" paddingLeft="8px">
                            설명 입력은 필수입니다
                        </Text>
                    )}
                </Box>
                <Box marginBottom="8px">
                    <Text as="label" variant="medium">
                        카테고리
                    </Text>
                    {/* 카테고리 드롭다운 */}
                    <Controller
                        control={control}
                        name="category"
                        rules={{ required: true }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <Dropdown
                                options={[
                                    { value: 'TOP', label: '상의' },
                                    { value: 'BOTTOM', label: '하의' },
                                    { value: 'OUTER', label: '아우터' },
                                    { value: 'ACCESSORY', label: '액세서리' },
                                ]}
                                hasError={!!error}
                                value={value}
                                placeholder="카테고리를 선택해 주십시오"
                                onChange={v => onChange(v?.value)}
                            />
                        )}
                    />
                    {errors.category && (
                        <Text color="danger" variant="small" paddingLeft="8px">
                            카테고리 선택은 필수입니다
                        </Text>
                    )}
                </Box>
                <Box>
                    <Text as="label" variant="medium">
                        가격(원)
                    </Text>
                    {/* 가격 입력 */}
                    <Input
                        {...register('price', { required: true })}
                        name="price"
                        type="number"
                        placeholder="1000"
                        hasError={!!errors.price}
                    />
                    {errors.price && (
                        <Text color="danger" variant="small" paddingLeft="8px">
                            가격의 입력은 필수입니다
                        </Text>
                    )}
                </Box>
                <Box>
                    <Text as="label" variant="medium">
                        재고 수량
                    </Text>
                    {/* 재고 수량 입력 */}
                    <Input
                        {...register('stockQuantity', { required: true })}
                        name="stockQuantity"
                        type="number"
                        placeholder="1000"
                        hasError={!!errors.stockQuantity}
                    />
                    {errors.stockQuantity && (
                        <Text color="danger" variant="small" paddingLeft="8px">
                            재고 수량의 입력은 필수입니다
                        </Text>
                    )}
                </Box>
            </Box>
            <Button width="100%" type="submit">
                등록
            </Button>
        </form>
    );
};

export default ProductForm;
