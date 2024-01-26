import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import DropzoneWithImages, { FileData } from './';

export default { title: 'Molecules/DropzoneWithImages' } as Meta<
    typeof DropzoneWithImages
>;

const Container = styled.div`
    width: 288px;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr;
`;

export const Standard = () => {
    const [images, setImages] = useState<FileData[]>([]);

    const handleChange = (images: FileData[]) => {
        setImages(images);
    };

    return (
        <Container>
            <DropzoneWithImages
                images={images}
                onChange={handleChange}
                maximumNumber={2}
            />
        </Container>
    );
};
