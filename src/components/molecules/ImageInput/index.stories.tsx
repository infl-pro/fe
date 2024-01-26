import { Meta, StoryFn } from '@storybook/react';
import ImageInput from '.';

export default {
    title: 'Molecules/ImageInput',
    argTypes: {
        onChange: {
            description: '파일이 입력되었을 때의 이벤트 핸들러',
            table: {
                type: { summary: 'function' },
            },
        },
    },
} as Meta<typeof ImageInput>;

const Template: StoryFn<typeof ImageInput> = args => {
    return <ImageInput />;
};

export const WithControl = Template.bind({});
