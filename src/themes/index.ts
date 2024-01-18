import { DefaultTheme } from 'styled-components';
import colors from './colors';
import fontSizes from './fontSizes';
import space from './space';

export const theme: DefaultTheme = {
    space,
    fontSizes,
    colors,
} as const;
