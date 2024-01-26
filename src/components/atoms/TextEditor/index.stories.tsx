import { StoryFn, Meta } from '@storybook/react';
import TextEditor from './index';

export default {
    title: 'Atoms/TextEditor',
    argTypes: {
        hasError: {
            control: { type: 'boolean' },
            defaultValue: false,
            description: '변형 에러 플래그',
            table: {
                type: { summary: 'boolean' },
            },
        },
        onChange: {
            description: 'onChange 이벤트 핸들러',
            table: {
                type: { summary: 'function' },
            },
        },
    },
} as Meta<typeof TextEditor>;

const Template: StoryFn<typeof TextEditor> = args => <TextEditor {...args} />;

export const Normal = Template.bind({});

export const Error = Template.bind({});
Error.args = { hasError: true };
