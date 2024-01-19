import { StoryFn, Meta } from '@storybook/react';
import RectLoader from './index';

export default {
    title: 'Atoms/RectLoader',
    argTypes: {
        width: {
            control: { type: 'number' },
            description: '가로폭',
            table: {
                type: { summary: 'number' },
            },
        },
        height: {
            control: { type: 'number' },
            description: '세로폭',
            table: {
                type: { summary: 'number' },
            },
        },
    },
} as Meta<typeof RectLoader>;

const Template: StoryFn<typeof RectLoader> = args => <RectLoader {...args} />;

export const Normal = Template.bind({});
Normal.args = { width: '320', height: '320' };
