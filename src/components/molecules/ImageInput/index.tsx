import {
    AddPhotoAlternateIcon,
    CloseIcon,
    EditIcon,
} from 'components/atoms/IconButton';
import Box from 'components/layout/Box';
import Flex from 'components/layout/Flex';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const ProfileImageWrapper = styled.div`
    width: 290px;
    height: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1024px) {
        width: 100%;
        height: 120px;
    }
`;

const ProfileImage = styled.div<{
    src?: string;
}>`
    width: 100%;
    height: 100%;
    border-radius: 25px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 29px;
    transition: 0.28s;
    position: relative;
    z-index: 0;
    ${({ src }) =>
        src &&
        css`
            background-image: url(${src});
        `}
    &:hover {
        box-shadow: inset 178px 178px 178px 178px rgba(0, 0, 0, 0.6);
        div {
            display: flex;
        }
    }
    @media screen and (max-width: 1024px) {
        box-shadow: inset 178px 178px 178px 178px rgba(0, 0, 0, 0.6);
        border-radius: 15px;
        div {
            display: flex;
        }
    }
`;

const CircleIconWrapper = styled.div`
    width: 60px;
    height: 60px;
    background: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: none;
    cursor: pointer;
    z-index: 1;
    > span {
        font-weight: 600;
        font-size: 21px;
    }
`;

const BackgroundIconWrapper = styled(Flex)`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
`;

const ImageInput = () => {
    const [src, setSrc] = useState();

    const handleChange = e => {
        setSrc(e.target.files[0]);
    };

    const clearImages = () => {
        setSrc(null);
    };

    console.log(src);
    return (
        <ProfileImageWrapper>
            <ProfileImage src={src && URL.createObjectURL(src)}>
                {!src && (
                    <BackgroundIconWrapper>
                        <AddPhotoAlternateIcon size={150} />
                    </BackgroundIconWrapper>
                )}
                <label htmlFor="profileImage" style={{ zIndex: '1' }}>
                    <CircleIconWrapper>
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleChange}
                            id="profileImage"
                            // ref={fileInput}
                            accept="image/*"
                        />
                        <EditIcon size={29} />
                    </CircleIconWrapper>
                </label>
                {src && (
                    <CircleIconWrapper>
                        <CloseIcon size={29} onClick={clearImages} />
                    </CircleIconWrapper>
                )}
            </ProfileImage>
        </ProfileImageWrapper>
    );
};

export default ImageInput;
