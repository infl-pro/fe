import { StoryFn, Meta } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import Dropzone from './index';
import Button from 'components/atoms/Button';
import Box from 'components/layout/Box';

export default {
    title: 'Molecules/Dropzone',
    argTypes: {
        height: {
            control: { type: 'number' },
            description: '세로폭',
            table: {
                type: { summary: 'number' },
            },
        },
        width: {
            control: { type: 'number' },
            description: '가로폭',
            table: {
                type: { summary: 'number' },
            },
        },
        hasError: {
            control: { type: 'boolean' },
            description: '변형 에러 플래그',
            table: {
                type: { summary: 'boolean' },
            },
        },
        acceptedFileTypes: {
            options: {
                control: { type: 'array' },
                description: '받은 파일 타입',
                table: {
                    type: { summary: 'array' },
                },
            },
        },
        onDrop: {
            description: '파일이 드롭 입력되었을 때의 이벤트 핸들러',
            table: {
                type: { summary: 'function' },
            },
        },
        onChange: {
            description: '파일이 입력되었을 때의 이벤트 핸들러',
            table: {
                type: { summary: 'function' },
            },
        },
    },
} as Meta<typeof Dropzone>;

const Template: StoryFn<typeof Dropzone> = args => {
    const [files, setFiles] = useState<File[]>([]);
    const handleDrop = (files: File[]) => {
        setFiles(files);
        args && args.onDrop && args.onDrop(files);
    };

    const fetchData = async () => {
        const res = await fetch('/images/sample/1.jpg');
        const blob = await res.blob();
        const file = new File([blob], '1.png', blob);

        setFiles([...files, file]);
    };

    const clearImages = () => {
        setFiles([]);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(files);
    return (
        <>
            <Box marginBottom="8px">
                <Dropzone {...args} value={files} onDrop={handleDrop} />
            </Box>
            <Box marginBottom="16px">
                <Button onClick={clearImages}>모든 이미지를 클리어</Button>
            </Box>
            <Box>
                {files.map((f, i) => (
                    <img
                        src={URL.createObjectURL(f)}
                        width="100px"
                        key={i}
                        alt="sample"
                    />
                ))}
            </Box>
        </>
    );
};

export const WithControl = Template.bind({});
WithControl.args = {
    height: 200,
    width: '100%',
    hasError: false,
};
