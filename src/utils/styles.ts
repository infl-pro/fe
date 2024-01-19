/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import type { ResponsiveProp, Responsive } from 'types';
import { theme } from 'themes';

// Theme의 타입
export type AppTheme = typeof theme;

// 왜 keyof 안 쓰고 keyof typeof 사용하는지?
type SpaceThemeKeys = keyof typeof theme.space;
type ColorThemeKeys = keyof typeof theme.colors;
type FontSizeThemeKeys = keyof typeof theme.fontSizes;

export type Space = SpaceThemeKeys | (string & {});
export type Color = ColorThemeKeys | (string & {});
export type FontSize = FontSizeThemeKeys | (string & {});

// 브레이크 포인트
const BREAKPOINTS: { [key: string]: string } = {
    sm: '640px', // 640px 이하
    md: '768px', // 768px 이하
    lg: '1024px', // 1024px 이하
    xl: '1280px', // 1280px 이하
};

/**
 * Responsive 타입을 CSS 속성과 그 값으로 변환
 * @param propKey CSS 속성
 * @param prop Responsive 타입
 * @param theme AppTheme
 * @returns CSS 속성과 그 값(ex. background-color: white;)
 */
export function toPropValue<T>(
    propKey: string,
    prop?: Responsive<T>,
    theme?: AppTheme,
) {
    if (prop === undefined) return undefined;
    if (isResponsivePropType(prop)) {
        const result = [];
        for (const responsiveKey in prop) {
            if (responsiveKey === 'base') {
                // 기본 스타일
                result.push(
                    `${propKey}: ${toThemeValueIfNeeded(
                        propKey,
                        prop[responsiveKey],
                        theme,
                    )};`,
                );
            } else if (
                responsiveKey === 'sm' ||
                responsiveKey === 'md' ||
                responsiveKey === 'lg' ||
                responsiveKey === 'xl'
            ) {
                // 미디어 쿼리의 스타일
                const breakpoint = BREAKPOINTS[responsiveKey];
                const style = `${propKey}: ${toThemeValueIfNeeded(
                    propKey,
                    prop[responsiveKey],
                    theme,
                )};`;
                result.push(
                    `@media screen and (max-width: ${breakpoint}) {${style}}`,
                );
            }
        }

        return result.join('\n');
    }

    return `${propKey}: ${toThemeValueIfNeeded(propKey, prop, theme)};`;
}

const SPACE_KEYS = new Set([
    'margin',
    'margin-top',
    'margin-left',
    'margin-bottom',
    'margin-right',
    'padding',
    'padding-top',
    'padding-left',
    'padding-bottom',
    'padding-right',
]);
const COLOR_KEYS = new Set(['color', 'background-color']);
const FONT_SIZE_KEYS = new Set(['font-size']);
const LINE_HEIGHT_KEYS = new Set(['line-height']);

/**
 * Theme에 지정된 CSS 속성값으로 변환
 * @param propKey CSS 속성
 * @param value CSS 속성값
 * @param theme AppTheme
 * @returns CSS 속성값
 */
function toThemeValueIfNeeded<T>(propKey: string, value: T, theme?: AppTheme) {
    if (
        theme &&
        theme.space &&
        SPACE_KEYS.has(propKey) &&
        isSpaceThemeKeys(value, theme)
    ) {
        return theme.space[value];
    } else if (
        theme &&
        theme.colors &&
        COLOR_KEYS.has(propKey) &&
        isColorThemeKeys(value, theme)
    ) {
        return theme.colors[value];
    } else if (
        theme &&
        theme.fontSizes &&
        FONT_SIZE_KEYS.has(propKey) &&
        isFontSizeThemeKeys(value, theme)
    ) {
        return theme.fontSizes[value];
    }
    return value;
}

function isResponsivePropType<T>(prop: any): prop is ResponsiveProp<T> {
    return (
        prop &&
        (prop.base !== undefined ||
            prop.sm !== undefined ||
            prop.md !== undefined ||
            prop.lg !== undefined ||
            prop.xl !== undefined)
    );
}

function isSpaceThemeKeys(prop: any, theme: AppTheme): prop is SpaceThemeKeys {
    return Object.keys(theme.space).filter(key => key == prop).length > 0;
}

function isColorThemeKeys(prop: any, theme: AppTheme): prop is ColorThemeKeys {
    return Object.keys(theme.colors).filter(key => key == prop).length > 0;
}

function isFontSizeThemeKeys(
    prop: any,
    theme: AppTheme,
): prop is FontSizeThemeKeys {
    return Object.keys(theme.fontSizes).filter(key => key == prop).length > 0;
}
