import { StoryFn, Meta } from '@storybook/react';
import Input from './index';

export default {
    title: 'Atoms/Input',
    argTypes: {
        placeholder: {
            control: { type: 'text' },
            description: '플레이스홀더',
            table: {
                type: { summary: 'string' },
            },
        },
        hasBorder: {
            control: { type: 'boolean' },
            description: '보더 플래그',
            table: {
                type: { summary: 'boolean' },
            },
        },
        hasError: {
            control: { type: 'boolean' },
            defaultValue: false,
            description: '배리에이션 에러 플래그',
            table: {
                type: { summary: 'boolean' },
            },
        },
    },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = args => <Input {...args} />;

export const Normal = Template.bind({});

export const Error = Template.bind({});
Error.args = { hasError: true };
