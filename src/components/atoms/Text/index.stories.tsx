import { StoryFn, Meta } from '@storybook/react';
import Text from './index';

export default {
    title: 'Atoms/Text',
    argTypes: {
        variant: {
            options: [
                'extraSmall',
                'small',
                'medium',
                'mediumLarge',
                'large',
                'extraLarge',
            ],
            control: { type: 'select' },
            defaultValue: 'medium',
            // docs에 표시할 내용을 설정
            description: '텍스트 변형',
            table: {
                type: {
                    summary:
                        'extraSmall , small, medium, mediumLarge, large, extraLarge',
                },
                defaultValue: { summary: 'medium' },
            },
        },
        children: {
            control: { type: 'text' },
            description: '텍스트',
            table: {
                type: { summary: 'string' },
            },
        },
        fontWeight: {
            control: { type: 'text' },
            description: '폰트 굵기',
            table: {
                type: { summary: 'string' },
            },
        },
        lineHeight: {
            control: { type: 'text' },
            description: '행 높이',
            table: {
                type: { summary: 'string' },
            },
        },
        color: {
            control: { type: 'color' },
            description: '텍스트 색상',
            table: {
                type: { summary: 'string' },
            },
        },
        backgroundColor: {
            control: { type: 'color' },
            description: '배경 색상',
            table: {
                type: { summary: 'string' },
            },
        },
    },
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = args => <Text {...args} />;

const longText = `Next.js는 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크입니다. React 구성 요소를 사용하여 사용자 인터페이스를 구축하고 Next.js를 사용하여 추가 기능과 최적화를 수행합니다. 내부적으로 Next.js는 번들링, 컴파일 등과 같이 React에 필요한 도구를 추상화하고 자동으로 구성합니다. 이를 통해 구성에 시간을 낭비하는 대신 애플리케이션 구축에 집중할 수 있습니다. 개인 개발자이든 대규모 팀의 일원이든 Next.js는 대화형의 동적이며 빠른 React 애플리케이션을 구축하는 데 도움을 줄 수 있습니다.`;

export const ExtraSmall = Template.bind({});
ExtraSmall.args = { variant: 'extraSmall', children: longText };

export const Small = Template.bind({});
Small.args = { variant: 'small', children: longText };

export const Medium = Template.bind({});
Medium.args = { variant: 'medium', children: longText };

export const MediumLarge = Template.bind({});
MediumLarge.args = { variant: 'mediumLarge', children: longText };

export const Large = Template.bind({});
Large.args = { variant: 'large', children: longText };

export const ExtraLarge = Template.bind({});
ExtraLarge.args = { variant: 'extraLarge', children: longText };
