import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import Dropzone from 'components/molecules/Dropzone';
import ImagePreview from 'components/molecules/ImagePreview';

const DropzoneWithImagesContainer = styled(Flex)`
    & > *:not(:first-child) {
        margin-top: 8px;
    }
`;

export type FileData = {
    id?: string;
    src?: string;
    file?: File;
    selected?: boolean;
    chosen?: boolean;
};

interface DropzoneWithImagesProps {
    name?: string;
    images: FileData[];
    maximumNumber?: number;
    hasError?: boolean;
    width?: string;
    height?: string;
    onChange: (images: FileData[]) => void;
}

/**
 * 입력 이미지
 */
const DropzoneWithImages = (props: DropzoneWithImagesProps) => {
    const {
        images,
        maximumNumber,
        name,
        hasError,
        width = '100%',
        height = '260px',
        onChange,
    } = props;
    const files = useMemo(
        () =>
            images
                .filter((img: FileData) => img.file)
                .map((img: FileData) => img.file as File),
        [images],
    );
    const isDropzoneDisplay =
        !maximumNumber || images.length < maximumNumber ? 'block' : 'none';

    const onRemove = useCallback(
        (src: string) => {
            const image = images.find((img: FileData) => img.src === src);
            const newImages = images.filter((img: FileData) => img.src !== src);

            if (image) {
                if (image.file && image.src) {
                    URL.revokeObjectURL(image.src);
                    delete image.src;
                }

                onChange && onChange(newImages);
            }
        },
        [images, onChange],
    );

    const onDrop = useCallback(
        (files: File[]) => {
            const newImages = [];

            for (const file of files) {
                const img = images.find((img: FileData) => img.file === file);

                if (
                    !img &&
                    (!maximumNumber ||
                        images.length + newImages.length < maximumNumber)
                ) {
                    newImages.push({ file, src: URL.createObjectURL(file) });
                }
            }

            onChange && onChange(newImages);
        },
        [images, maximumNumber, onChange],
    );

    console.log(images, 'images');
    return (
        <DropzoneWithImagesContainer flexDirection="column">
            <Flex>
                {images &&
                    images.map((img, index) => {
                        return (
                            <ImagePreview
                                alt={img.id}
                                key={index}
                                src={img.src}
                                height={height}
                                onRemove={onRemove}
                            />
                        );
                    })}
            </Flex>
            <Box style={{ display: isDropzoneDisplay }}>
                <Dropzone
                    acceptedFileTypes={[
                        'image/gif',
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                    ]}
                    name={name}
                    height={height}
                    width={width}
                    value={files}
                    hasError={hasError}
                    onDrop={onDrop}
                />
            </Box>
        </DropzoneWithImagesContainer>
    );
};

export default DropzoneWithImages;
