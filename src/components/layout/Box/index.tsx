/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import type { Responsive } from 'types/styles';
import { toPropValue, Color } from 'utils/styles';

export type BoxProps = {
    color?: Responsive<Color>;
    backgroundColor?: Responsive<Color>;
    width?: Responsive<string>;
    height?: Responsive<string>;
    minWidth?: Responsive<string>;
    minHeight?: Responsive<string>;
    display?: Responsive<string>;
    border?: Responsive<string>;
    overflow?: Responsive<string>;
    margin?: Responsive<string>;
    marginTop?: Responsive<string>;
    marginRight?: Responsive<string>;
    marginBottom?: Responsive<string>;
    marginLeft?: Responsive<string>;
    padding?: Responsive<string>;
    paddingTop?: Responsive<string>;
    paddingRight?: Responsive<string>;
    paddingBottom?: Responsive<string>;
    paddingLeft?: Responsive<string>;
    textAllign?: Responsive<string>;
    top?: Responsive<string>;
    left?: Responsive<string>;
    right?: Responsive<string>;
    bottom?: Responsive<string>;
};

/**
 * Box 컴포넌트
 * 레이아웃 조정에 사용한다
 */
const Box = styled.div<BoxProps>`
    ${props => toPropValue('color', props.color, props.theme)}
    ${props => toPropValue('background-color', props.backgroundColor, props.theme)}
    ${props => toPropValue('width', props.width, props.theme)}
    ${props => toPropValue('height', props.height, props.theme)}
    ${props => toPropValue('min-width', props.minWidth, props.theme)}
    ${props => toPropValue('min-height', props.minHeight, props.theme)}
    ${props => toPropValue('display', props.display, props.theme)}
    ${props => toPropValue('border', props.border, props.theme)}
    ${props => toPropValue('overflow', props.overflow, props.theme)}
    ${props => toPropValue('margin', props.margin, props.theme)}
    ${props => toPropValue('margin-top', props.marginTop, props.theme)}
    ${props => toPropValue('margin-left', props.marginLeft, props.theme)}
    ${props => toPropValue('margin-bottom', props.marginBottom, props.theme)}
    ${props => toPropValue('margin-right', props.marginRight, props.theme)}
    ${props => toPropValue('padding', props.padding, props.theme)}
    ${props => toPropValue('padding-top', props.paddingTop, props.theme)}
    ${props => toPropValue('padding-left', props.paddingLeft, props.theme)}
    ${props => toPropValue('padding-bottom', props.paddingBottom, props.theme)}
    ${props => toPropValue('padding-right', props.paddingRight, props.theme)}
    ${props => toPropValue('text-align', props.textAllign, props.theme)}
    ${props => toPropValue('top', props.top, props.theme)}
    ${props => toPropValue('left', props.left, props.theme)}
    ${props => toPropValue('right', props.right, props.theme)}
    ${props => toPropValue('bottom', props.bottom, props.theme)}
`;

export default Box;
